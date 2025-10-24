import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ShoppingCart = () => {
  const {
    cartItems: cartItemList,
    removeFromCart: removeItemFromCart,
    grandTotal: totalAmount,
  } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-dark py-12 flex justify-center items-center">

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Make sure items and summary are spaced evenly */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* CART ITEMS SECTION */}
          <div className="flex-1 w-full">
            {cartItemList.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="text-8xl mb-8">🛒</div>
                <h2 className="text-4xl font-bold text-primary mb-6 text-center">
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
                className="card hover-lift mb-8 bg-black/40 border border-gray-700 rounded-2xl shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
                  <img
                    src={cartItem.img}
                    alt={cartItem.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl text-primary mb-2 truncate">
                      {cartItem.name}
                    </h3>
                    <p className="text-secondary mb-4">
                      Seller:{" "}
                      <span className="font-semibold text-accent">
                        {cartItem.seller}
                      </span>
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-secondary text-sm mb-1">Price</p>
                        <p className="font-bold text-accent">
                          ${cartItem.price.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-secondary text-sm mb-1">Quantity</p>
                        <p className="font-bold text-primary">
                          {cartItem.quantity}
                        </p>
                      </div>
                      <div>
                        <p className="text-secondary text-sm mb-1">Sub Total</p>
                        <p className="font-bold text-accent text-lg">
                          ${(cartItem.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItemFromCart(cartItem.id)}
                    className="text-red-400 hover:text-red-300 cursor-pointer font-bold text-2xl p-3 hover:bg-red-400/10 rounded-full transition-colors flex-shrink-0"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CART SUMMARY SECTION */}
          <div className="w-full lg:w-80">
            <div className="card p-6 bg-black/50 border border-gray-700 rounded-2xl shadow-lg mt-8 lg:mt-20">
              <h2 className="font-bold text-2xl text-primary mb-6">
                Basket Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-secondary">Total Items:</span>
                  <span className="font-semibold text-accent text-lg">
                    {cartItemList.length}
                  </span>
                </div>
                <div className="border-t border-accent pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-primary">
                      Grand Total:
                    </span>
                    <span className="text-2xl font-bold text-accent">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button className="btn-primary w-full py-4 text-lg font-semibold rounded-xl hover-lift">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
