import React from "react";

import Header from "./../components/Header";
import MainProducts from "./../components/homeComponents/MainProducts";

const ProductScreen = () => {
  return (
    <>
      <Header />
      <div className="main-wrap">
        
        <MainProducts />
      </div>
    </>
  );
};

export default ProductScreen;