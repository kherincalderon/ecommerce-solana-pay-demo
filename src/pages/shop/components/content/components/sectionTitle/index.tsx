import { fontColors } from "components/layout/utils";
import ShopContext from "pages/shop/context";
import React, { useContext } from "react";

// ESTILOS
import Styles from "./style.module.scss";

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  // PROPS
  const { step } = useContext(ShopContext);

  return (
    <h1
      style={{ color: fontColors[step], width: step === 4 ? "250px" : "385px" }}
      className={Styles.title}
    >
      {title}
    </h1>
  );
};

export default SectionTitle;
