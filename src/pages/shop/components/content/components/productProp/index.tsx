import React, { useContext, useState } from "react";

// ESTILOS
import Styles from "./style.module.scss";

// CONTEXT
import { fontColors } from "components/layout/utils";
import ShopContext from "pages/shop/context";
import SectionTitle from "../sectionTitle";
import ProductSlider from "../slider";
import useLoadList from "./hooks";

interface ProductPropProps {
  type: "sauces" | "extras" | "dips";
  setSelectedProp: SetState<Record<string, Record<string, number>>>;
  selectedProp: Record<string, Record<string, number>>;
  free?: boolean;
  info: string;
}
const ProductProp: React.FC<ProductPropProps> = ({
  type,
  selectedProp,
  setSelectedProp,
  info,
  free,
}) => {
  // PROPS
  const { currentProduct, step } = useContext(ShopContext);

  // PROPS SELECCIONADOS
  const selectedCount = Object.values(selectedProp[type] ?? {}).reduce(
    (a, b) => a + b,
    0
  );

  // ESTADO
  const [list, setList] = useState<
    Record<string, ProductSauce | ProductDip | ProductExtra>
  >({});

  // HOOKS
  useLoadList(type, setList);

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <SectionTitle title={`Choose your ${currentProduct?.name} ${type}`} />
        <p style={{ color: fontColors[step] }}>
          {`${info} ${!free ? currentProduct.maxsauces : ""}`}
          <span className={Styles.dotList}>
            {!free &&
              Array(currentProduct[`max${type}`])
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    className={Styles.dot}
                    style={{
                      background:
                        i < selectedCount ? "var(--yellow1)" : "#E5E5E5",
                    }}
                  />
                ))}
          </span>
        </p>
        <ul className={Styles.descriptions}>
          {Object.keys(selectedProp[type] ?? {}).map((key, index) =>
            (selectedProp[type]?.[key] ?? 0) > 0 ? (
              <li
                style={{ color: fontColors[step] }}
                key={`list_${index}`}
                // @ts-ignore
              >{`${selectedProp[type]?.[key]} | ${list[key]?.name}`}</li>
            ) : null
          )}
        </ul>
      </div>
      <ProductSlider
        selectedProp={selectedProp[type] ?? {}}
        setSelectedProp={setSelectedProp}
        free={free}
        list={list}
        type={type}
      />
    </div>
  );
};

export default ProductProp;
