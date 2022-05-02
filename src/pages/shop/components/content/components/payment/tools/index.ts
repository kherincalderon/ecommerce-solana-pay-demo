import { encodeURL } from "@solana/pay";
import { Keypair } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { shopAddress, usdcAddress } from "utils";

/**
 * Encode URL
 * @param  {Product} currentProduct
 * @param  {number} totalPrice
 */
const getPayData = (currentProduct: Product, totalPrice: number) => {
  const amount = new BigNumber(totalPrice);
  const label = currentProduct.name;
  const message = `Your ${currentProduct.name} for $${amount.toString()}`;
  const memo = currentProduct.id;

  // PAY REF
  const reference = new Keypair().publicKey;

  const url = encodeURL({
    recipient: shopAddress,
    amount,
    reference,
    splToken: usdcAddress,
    label,
    message,
    memo,
  });

  return { encodeURL: url, reference, amount, memo, label, message };
};

export default getPayData;
