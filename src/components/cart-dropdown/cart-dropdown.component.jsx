import "./cart-dropdown.styles.scss";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate(); 
  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Buttons onClick={goToCheckout}>CHECKOUT</Buttons>
    </div>
  );
};

export default CartDropdown;
