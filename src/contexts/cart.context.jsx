import { createContext, useState, useEffect } from "react";

const addCardItem = (cartItems, productToAdd) => {
  const exsitingCartItem = cartItems.find(
    (cartItems) => cartItems.id === productToAdd.id
  );
  if (exsitingCartItem) {
    return cartItems.map((cartItems) =>
      cartItems.id === productToAdd.id
        ? { ...cartItems, quantity: cartItems.quantity + 1 }
        : cartItems
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItems) => cartItems.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItems) => cartItems.id !== cartItemToRemove.id
    );
  }
  return cartItems.map((cartItems) =>
    cartItems.id === cartItemToRemove.id
      ? { ...cartItems, quantity: cartItems.quantity - 1 }
      : cartItems
  );
};

const clearCartItem = (cartItems,cartItemToClear) =>{
  return cartItems.filter(
    (cartItems) => cartItems.id !== cartItemToClear.id
  );
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFomCart:()=>{},
  cartTotal:0,
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCardItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };
  const clearItemFomCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFomCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
