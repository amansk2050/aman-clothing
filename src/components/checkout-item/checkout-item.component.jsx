import "./checkout-item.styles.scss";

import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { clearItemFomCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const clearItemHandler = () => clearItemFomCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
      <span className="value">{quantity}</span>
      <div className="arrow" onClick={addItemHandler}>&#10095;</div>
      <span className="price"> {price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
