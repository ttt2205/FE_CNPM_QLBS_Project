import React, { useState } from "react";
import "../assets/scss/shoppingCart.scss";
import { CartTitle, CartInfo } from "../modules/shopping_cart_module";

function ShoppingCart() {
  const [quantityProductChosen, setQuantityProductChosen] = useState(1);
  return (
    <div id="shopping_cart" className="shopping-cart-container">
      <div className="shopping-cart-content">
        <div className="cart-title-container">
          <CartTitle quantityProductChosen={quantityProductChosen}></CartTitle>
        </div>
        <div className="cart-info-container">
          <CartInfo quantityProductChosen={quantityProductChosen} />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
