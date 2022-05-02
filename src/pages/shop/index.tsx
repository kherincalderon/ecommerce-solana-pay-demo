import React, { useState } from "react";

// COMPONENTES
import ShopContent from "./components/content";
import Layout from "components/layout";

// ENV
import ShopContext, { defFormData } from "./context";

const ShopPage: React.FC = () => {
  // FORMULARIO
  const [formData, setFormData] = useState<ShopContext>({ ...defFormData });

  return (
    <ShopContext.Provider value={{ ...formData, setFormData }}>
      <Layout>
        <ShopContent />
      </Layout>
    </ShopContext.Provider>
  );
};

export default ShopPage;
