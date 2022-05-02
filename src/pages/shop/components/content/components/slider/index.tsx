import React, { useContext, useState } from "react";

// CONTEXT
import ShopContext from "pages/shop/context";
import { addProp } from "./events";

// ESTILOS
import Styles from "./style.module.scss";

const ProductSlider: React.FC<ExtraSliderProps> = ({
  list,
  type,
  free,
  setSelectedProp,
  selectedProp,
}) => {
  // PROPS
  const { currentProduct } = useContext(ShopContext);

  // AGREGAR PROP
  const handleProp = (id: string, add: number) => () =>
    addProp(setSelectedProp, add, id, type, currentProduct, free);

  return (
    <div className={Styles.container}>
      <div className={Styles.list}>
        {currentProduct[type].map((productProp) => {
          const currentProp = list[productProp];
          return (
            <div key={productProp} className={Styles.item}>
              <img src={`/images/${productProp}.png`} alt={productProp} />
              <div className={Styles.itemInfo}>
                <h2>{currentProp?.name}</h2>
                {(currentProp as ProductSauce)?.description && (
                  <p>{(currentProp as ProductSauce)?.description}</p>
                )}
                {(currentProp as ProductSauce)?.info && (
                  <p>{(currentProp as ProductSauce).info}</p>
                )}
                {(currentProp as ProductExtra)?.price && (
                  <p>${(currentProp as ProductExtra)?.price}</p>
                )}
              </div>
              <div className={Styles.counter}>
                <button onClick={handleProp(productProp, -1)}>-</button>
                <span>{selectedProp[productProp] ?? 0}</span>
                <button onClick={handleProp(productProp, 1)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSlider;
