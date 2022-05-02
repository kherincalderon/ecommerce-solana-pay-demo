export const addProp = (
  setSelectedProp: SetState<Record<string, Record<string, number>>>,
  add: number,
  id: string,
  type: "sauces" | "extras" | "dips",
  currentProduct: Product,
  free?: boolean
) =>
  setSelectedProp((prevProps) => {
    const newValue = {
      ...prevProps,
      [type]: {
        ...prevProps[type],
        [id]: Math.max(0, (prevProps[type]?.[id] ?? 0) + add),
      },
    };

    if (!free) {
      const globalCounter = Object.values(prevProps[type] ?? {}).reduce(
        (a, b) => a + b,
        0
      );
      if (globalCounter + add < +(currentProduct[`max${type}`] ?? 0) + 1)
        return newValue;
      else return prevProps;
    } else return newValue;
  });
