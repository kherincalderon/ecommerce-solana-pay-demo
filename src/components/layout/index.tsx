import React, { useContext } from "react";

// COMPONENTES
import ShopContext from "pages/shop/context";
import Topbar from "./topbar";

// ESTILOS
import Styles from "./style.module.scss";

// TOOLS
import backColors, { dotColors } from "./utils";

const Layout: React.FC = ({ children }) => {
  // PROPS
  const { step } = useContext(ShopContext);

  return (
    <main className={Styles.main} style={{ background: backColors[step] }}>
      <Topbar />
      <div className={Styles.circle} style={{ background: dotColors[step] }} />
      <div className={Styles.content}>{children}</div>
    </main>
  );
};

export default Layout;
