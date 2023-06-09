import "./cart-dropdown.styles.scss";
import Buttons from "../button/button.component";
import React, { useContext } from "react";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Buttons>GO TO CHECKOUT</Buttons>
    </div>
  );
};

export default CartDropdown;
