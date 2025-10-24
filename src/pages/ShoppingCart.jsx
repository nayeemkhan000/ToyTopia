import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ShoppingCart = () => {
  const { cartItems: cartItemList, removeFromCart: removeItemFromCart, grandTotal: totalAmount } = useContext(CartContext);

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto text-primary">
      <div className="flex-1 flex flex-col gap-6">
        {cartItemList.length === 0 && (
          <div className="flex flex-col items-center py-24">
            <div className="text-8xl mb-8">🛒</div>
            <h2 className="text-4xl font-bold text-primary mb-6">
              Your basket is empty
            </h2>
            <p className="text-lg text-secondary mb-8 text-center max-w-md">
              Start adding some amazing toys to your basket!
            </p>
          </div>
        )}

        {cartItemList.map((cartItem) => (
          <div
            key={cartItem.id}
            className="card hover-lift flex flex-col md:flex-row items-center justify-between gap-4 p-6"
          >
            <img
              src={cartItem.img}
              alt={cartItem.name}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
            />
            <div className="flex-1 px-4 flex flex-col justify-center gap-2">
              <h3 className="font-bold text-lg text-primary">{cartItem.name}</h3>
              <p className="text-secondary">
                Seller: <span className="font-semibold text-accent">{cartItem.seller}</span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-secondary text-sm">Price</p>
              <p className="font-bold text-accent">${cartItem.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-secondary text-sm">Quantity</p>
              <p className="font-bold text-primary">{cartItem.quantity}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-secondary text-sm">Sub Total</p>
              <p className="font-bold text-accent text-lg">
                ${(cartItem.price * cartItem.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeItemFromCart(cartItem.id)}
              className="text-red-400 hover:text-red-300 cursor-pointer font-bold text-2xl p-2 hover:bg-red-400/10 rounded-full transition-colors"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-80">
        <div className="card p-6 flex flex-col gap-6">
          <h2 className="font-bold text-2xl text-primary">Basket Summary</h2>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-secondary">
              Total Items:{" "}
              <span className="font-semibold text-accent">{cartItemList.length}</span>
            </p>
            <p className="text-2xl font-bold text-accent">
              Grand Total: ${totalAmount.toFixed(2)}
            </p>
          </div>
          <button className="btn-primary w-full py-4 text-lg font-semibold rounded-xl hover-lift">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
