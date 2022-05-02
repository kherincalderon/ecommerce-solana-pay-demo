interface ExtraSliderProps {
  list: Record<string, ProductSauce | ProductDip | ProductExtra>;
  setSelectedProp: SetState<Record<string, Record<string, number>>>;
  selectedProp: Record<string, number>;
  type: "sauces" | "extras" | "dips";
  free?: boolean;
}
