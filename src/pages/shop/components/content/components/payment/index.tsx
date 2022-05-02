import React, { useContext, useRef, useEffect } from "react";

import JSConfetti from "js-confetti";

// COMPONENTES
import ShopContext from "pages/shop/context";
import { CheckoutProps } from "../checkout";
import SectionTitle from "../sectionTitle";

// ESTILOS
import Styles from "./style.module.scss";
import useTotalPrice from "../checkout/hooks";
import BigNumber from "bignumber.js";
import {
  createQR,
  encodeURL,
  findTransactionSignature,
  FindTransactionSignatureError,
  validateTransactionSignature,
  ValidateTransactionSignatureError,
} from "@solana/pay";
import { shopAddress, usdcAddress } from "utils";
import { useConnection } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import getPayData from "./tools";

const Payment: React.FC<CheckoutProps> = ({ activeCombo, selectedProp }) => {
  // PROPS
  const { currentProduct } = useContext(ShopContext);

  // CONNECTION
  const { connection } = useConnection();

  // REF
  const qrRef = useRef<HTMLDivElement>(null);

  // TOTAL
  const totalPrice = Math.round(useTotalPrice(activeCombo, selectedProp));

  // LISTENER
  useEffect(() => {
    const payData = getPayData(currentProduct, totalPrice);
    const qrCode = createQR(payData.encodeURL, 420, "transparent");
    if (qrRef.current && payData.amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }

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
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <SectionTitle title={`Total to pay $${totalPrice}`} />
        <p>Scan the QR Code with your mobile wallet</p>
      </div>
      <div ref={qrRef} className={Styles.qr} />
    </div>
  );
};

export default Payment;
