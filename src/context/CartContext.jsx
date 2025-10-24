import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemList, setCartItemList] = useState([]);

  const addItemToCart = (cartItem, itemQuantity) => {
    setCartItemList((previousItems) => {
      const existingCartItem = previousItems.find((cartItemElement) => cartItemElement.id === cartItem.toyId);
      if (existingCartItem) {
        return previousItems.map((cartItemElement) =>
          cartItemElement.id === cartItem.toyId ? { ...cartItemElement, quantity: cartItemElement.quantity + itemQuantity } : cartItemElement
        );
      } else {
        return [
          ...previousItems,
          {
            id: cartItem.toyId,
            name: cartItem.toyName,
            price: cartItem.price,
            img: cartItem.pictureURL,
            seller: cartItem.sellerName || "Unknown",
            quantity: itemQuantity,
          },
        ];
      }
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItemList((previousItems) => previousItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const totalAmount = cartItemList.reduce(
    (totalSum, cartItem) => totalSum + cartItem.price * cartItem.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems: cartItemList, addToCart: addItemToCart, removeFromCart: removeItemFromCart, grandTotal: totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
