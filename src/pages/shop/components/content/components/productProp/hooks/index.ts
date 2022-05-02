import { useEffect } from "react";

/**
 * Hook de datos
 * @param  {string} type
 * @param  {SetState} setList
 */
const useLoadList = (
  type: string,
  setList: SetState<Record<string, ProductSauce | ProductDip | ProductExtra>>
) => {
  useEffect(() => {
    import(`../../../../../../../test/${type}.json`).then((data) =>
      setList(data.default)
    );
  }, [type, setList]);
};
export default useLoadList;
