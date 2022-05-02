import backColors from "components/layout/utils";
import React, { useContext, useState } from "react";

// COMPONENTES
import ShopContext from "../../context";
import ProductProp from "./components/productProp";
import Checkout from "./components/checkout";
import Combos from "./components/combos";
import Payment from "./components/payment";

// TOAST
import toast from "react-hot-toast";

// ESTILOS
import Styles from "./style.module.scss";
import { useWallet } from "@solana/wallet-adapter-react";

const ShopContent: React.FC = () => {
  // SELECCIONADOS
  const [selectedProp, setSelectedProp] = useState<
    Record<string, Record<string, number>>
  >({});

  // ESTADO
  const [activeCombo, setActiveCombo] = useState<number>(1);

  // WALLET
  const { connected } = useWallet();

  // PROPS
  const { setFormData, step } = useContext(ShopContext);

  // ERROR
  const nextError = () =>
    toast.error("Connect your wallet first", {
      position: "bottom-center",
    });

  // CHANGE STEP
  const changeStep = (add: number) => () =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      step: Math.max(0, Math.min(prevFormData.step + add, 5)),
    }));

  return (
    <div className={Styles.container}>
      {step < 5 && (
        <ul className={Styles.steps}>
          <li>
            <span
              style={{
                color:
                  step >= 0
                    ? step === 4
                      ? "var(--yellow1)"
                      : backColors[step]
                    : "var(--gray1)",
              }}
            >
              1
            </span>
          </li>
          <li>
            <span
              style={{
                color:
                  step >= 1
                    ? step === 4
                      ? "var(--yellow1)"
                      : backColors[step]
                    : "var(--gray1)",
              }}
            >
              2
            </span>
          </li>
          <li>
            <span
              style={{
                color:
                  step >= 2
                    ? step === 4
                      ? "var(--yellow1)"
                      : backColors[step]
                    : "var(--gray1)",
              }}
            >
              3
            </span>
          </li>
          <li>
            <span
              style={{
                color:
                  step >= 3
                    ? step === 4
                      ? "var(--yellow1)"
                      : backColors[step]
                    : "var(--gray1)",
              }}
            >
              4
            </span>
          </li>
          <li>
            <span
              style={{
                color:
                  step >= 4
                    ? step === 4
                      ? "var(--yellow1)"
                      : backColors[step]
                    : "var(--gray1)",
              }}
            >
              5
            </span>
          </li>
        </ul>
      )}

      {step === 5 && <p className={Styles.checktitle}>Checkout</p>}

      {step === 0 && (
        <Combos activeCombo={activeCombo} setActiveCombo={setActiveCombo} />
      )}
      {step === 1 && (
        <ProductProp
          selectedProp={selectedProp}
          setSelectedProp={setSelectedProp}
          type="sauces"
          info="Max flavors:"
        />
      )}
      {step === 2 && (
        <ProductProp
          selectedProp={selectedProp}
          setSelectedProp={setSelectedProp}
          type="dips"
          info="Up to"
        />
      )}
      {step === 3 && (
        <ProductProp
          free
          type="extras"
          selectedProp={selectedProp}
          setSelectedProp={setSelectedProp}
          info="Optional (you can skip this)"
        />
      )}

      {step === 4 && (
        <Checkout activeCombo={activeCombo} selectedProp={selectedProp} />
      )}

      {step === 5 && (
        <Payment activeCombo={activeCombo} selectedProp={selectedProp} />
      )}

      <div className={Styles.actions}>
        {step > 0 && (
          <button onClick={changeStep(-1)} className={Styles.backBtn}>
            Back
          </button>
        )}

        {step < 4 && (
          <button
            style={{
              background: step === 3 ? "var(--white1)" : "var(--orange1)",
              color: step === 3 ? " var(--black1)" : "var(--white1)",
            }}
            onClick={connected ? changeStep(1) : nextError}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopContent;
