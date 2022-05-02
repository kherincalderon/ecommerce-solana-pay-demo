import ShopContext from "pages/shop/context";
import { useContext } from "react";
import Extras from "test/extras.json";

const useTotalPrice = (
  activeCombo: number,
  selectedProp: Record<string, Record<string, number>>
) => {
  // PROPS
  const { currentProduct } = useContext(ShopContext);

  // TOTAL
  let totalPrice = currentProduct?.combos[activeCombo]?.price ?? 0;
  Object.entries(selectedProp?.extras ?? {}).forEach(([key, count]) => {
    // @ts-ignore
    if (count > 0) totalPrice += count * Extras[key]?.price;
  });

  return totalPrice;
};

export default useTotalPrice;
