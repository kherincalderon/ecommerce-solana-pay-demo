interface ShopContext {
  setFormData: SetState<ShopContext>;
  selectedProduct: SelectedProduct;
  readonly currentProduct: Product;
  step: number;
}

interface SelectedProduct {
  sauces: ProductSauce & { count: number };
  extras: ProductExtra & { count: number };
  dips: ProductDip & { count: number };
  readonly image: string;
  readonly name: string;
  readonly id: string;
}

interface Product {
  [index: string]: ProductCombo[] | number | string | string[];
  combos: ProductCombo[];
  maxsauces: number;
  maxdips: number;
  extras: string[]; // IDS DE EXTRAS
  sauces: string[]; // IDS DE SAUCES
  dips: string[]; // IDS DE DIPS
  image: string;
  name: string;
  id: string;
}

interface ProductCombo {
  price: number;
  name: string;
  id: string;
}

interface ProductSauce {
  description: string;
  info: string;
  name: string;
  id: string;
}

interface ProductDip {
  description: string;
  name: string;
  id: string;
}

interface ProductExtra {
  description: string;
  price: number;
  name: string;
  id: string;
}
