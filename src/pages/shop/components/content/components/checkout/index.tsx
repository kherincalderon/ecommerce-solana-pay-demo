import React, { useContext } from "react";

import CheckOutBanner from "assets/checkout.png";

import Sauces from "test/sauces.json";
import Extras from "test/extras.json";
import Dips from "test/dips.json";

import SectionTitle from "../sectionTitle";
import ShopContext from "pages/shop/context";

import Styles from "./style.module.scss";
import useTotalPrice from "./hooks";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  createTransaction,
  findTransactionSignature,
  FindTransactionSignatureError,
  parseURL,
  validateTransactionSignature,
  ValidateTransactionSignatureError,
} from "@solana/pay";
import { shopAddress, usdcAddress } from "utils";
import getPayData from "../payment/tools";
import BigNumber from "bignumber.js";
import JSConfetti from "js-confetti";
import toast from "react-hot-toast";

export interface CheckoutProps {
  selectedProp: Record<string, Record<string, number>>;
  activeCombo: number;
}

const Checkout: React.FC<CheckoutProps> = ({ selectedProp, activeCombo }) => {
  // CONNECTION
  const { connection } = useConnection();

  // TRANS
  const { publicKey, signTransaction } = useWallet();

  // PROPS
  const { currentProduct, setFormData } = useContext(ShopContext);

  // TOTAL
  let totalPrice = useTotalPrice(activeCombo, selectedProp);

  // NEXT
  const nextPage = () => setFormData((prevData) => ({ ...prevData, step: 5 }));

  // TRANSFER
  const makeTransfer = async () => {
    const toastId = toast.loading("Processing transaction...");
    const payData = getPayData(currentProduct, totalPrice);
    const { recipient, memo, splToken, amount, reference } = parseURL(
      payData.encodeURL
    );

    if (publicKey && amount) {
      const tx = await createTransaction(
        connection,
        publicKey,
        recipient,
        amount as BigNumber,
        {
          splToken,
          reference,
          memo,
        }
      );

      if (signTransaction) {
        const { blockhash } = await connection.getLatestBlockhash("finalized");
        tx.recentBlockhash = blockhash;
        tx.feePayer = publicKey;
        const signTx = await signTransaction(tx);
        await connection.sendRawTransaction(signTx.serialize());

        const interval = setInterval(async () => {
          try {
            const signatureInfo = await findTransactionSignature(
              connection,
              payData.reference,
              {},
              "confirmed"
            );

            await validateTransactionSignature(
              connection,
              signatureInfo.signature,
              shopAddress,
              payData.amount,
              usdcAddress,
              payData.reference,
              "confirmed"
            );

            // VALIDAR
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti();
            toast.remove(toastId);
            toast.success("Succesfully payment");

            clearInterval(interval);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (e) {
            if (e instanceof FindTransactionSignatureError) {
              return;
            }
            if (e instanceof ValidateTransactionSignatureError) {
              console.error("Transaction is invalid", e);
              return;
            }
            console.error("Unknown error", e);
          }
        }, 500);
      }
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <SectionTitle title={`Is your order correct?`} />
      </div>
      <div className={Styles.info}>
        <img src={CheckOutBanner} alt="Banner" />
        <div className={Styles.checkContainer}>
          <div className={Styles.checkContent}>
            <p className={Styles.checkTitle}>
              {currentProduct.combos[activeCombo]?.name}
            </p>
            <ul>
              {Object.entries(selectedProp.sauces ?? {}).map(([key, count]) => {
                if (count > 0)
                  return (
                    <li key={key}>
                      {/* 
                    // @ts-ignore */}
                      {count} x {Sauces[key]?.name}
                    </li>
                  );
                else return <></>;
              })}
              {Object.entries(selectedProp.dips ?? {}).map(([key, count]) => {
                if (count > 0)
                  return (
                    <li key={key}>
                      {/* 
                    // @ts-ignore */}
                      {count} x {Dips[key]?.name}
                    </li>
                  );
                else return <></>;
              })}
              {Object.entries(selectedProp.extras ?? {}).map(([key, count]) => {
                if (count > 0)
                  return (
                    <li key={key}>
                      {/* 
                    // @ts-ignore */}
                      {count} x {Extras[key]?.name}
                    </li>
                  );
                else return <></>;
              })}
            </ul>
            <p className={Styles.total}>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </p>
          </div>

          <div className={Styles.checkActions}>
            <button
              onClick={makeTransfer}
              className={`${Styles.pay} ${Styles.transferBtn}`}
            >
              Open Wallet
            </button>
            <button onClick={nextPage} className={Styles.pay}>
              Solana Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
