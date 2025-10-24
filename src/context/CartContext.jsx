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

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
      return;
    }
    setCartItemList((previousItems) =>
      previousItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );
  };

  const totalAmount = cartItemList.reduce(
    (totalSum, cartItem) => totalSum + cartItem.price * cartItem.quantity,
    0
  );

  const totalItems = cartItemList.reduce(
    (totalSum, cartItem) => totalSum + cartItem.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ 
        cartItems: cartItemList, 
        addToCart: addItemToCart, 
        removeFromCart: removeItemFromCart, 
        updateItemQuantity: updateItemQuantity,
        grandTotal: totalAmount,
        totalItems: totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
