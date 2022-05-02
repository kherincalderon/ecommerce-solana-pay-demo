import { createContext } from "react";
import Products from "test/products.json";

export const defFormData: ShopContext = {
  step: 0,
  setFormData: () => {},
  selectedProduct: {} as SelectedProduct,
  currentProduct: Products.boneless_wings,
};

const ShopContext = createContext<ShopContext>(defFormData);
export default ShopContext;
