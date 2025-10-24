import React, { useContext } from "react";
import { MdShoppingCart } from "react-icons/md";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user: currentUser, logout: userLogout } = useContext(AuthContext);
  const { cartItems: cartItemList } = useContext(CartContext);
  const navigateToPage = useNavigate();

  const handleUserLogout = async () => {
    try {
      await userLogout();
    } catch (logoutError) {
      console.error("Logout error:", logoutError);
    }
  };

  const navigateToUserProfile = () => {
    if (currentUser) {
      navigateToPage("/myprofile");
    }
  };

  return (
    <div className="bg-card border-b border-accent flex items-center justify-between px-4 md:px-8 lg:px-20 py-4 w-full shadow-lg fixed top-0 left-0 z-50 backdrop-blur-md">
      <h1
        className="text-white text-2xl md:text-3xl lg:text-4xl font-bold hover-lift uppercase tracking-wider"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <Link to="/" className="hover:opacity-80 transition-opacity">TOYTOPIA</Link>
      </h1>

      <ul className="list-none text-secondary flex gap-4 md:gap-6 lg:gap-8 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-accent font-semibold" : "hover:text-primary transition-colors"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-accent font-semibold" : "hover:text-primary transition-colors"
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive ? "text-accent font-semibold" : "hover:text-primary transition-colors"
            }
          >
            About Us
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-3 md:gap-4">
        <Link to="/cart" className="relative group">
          <MdShoppingCart className="text-2xl md:text-3xl text-primary hover:text-accent cursor-pointer transition-colors" />
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {cartItemList.length}
          </span>
        </Link>

        {currentUser ? (
          <div className="flex items-center gap-3">
            <div
              className="relative group cursor-pointer"
              title={currentUser.displayName || "User"}
              onClick={navigateToUserProfile}
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "User"}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-accent hover:border-primary transition-colors"
                />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-accent transition-colors">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : "U"}
                </div>
              )}

              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-accent text-primary text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {currentUser.displayName || "User"}
              </span>
            </div>

            <button
              onClick={handleUserLogout}
              className="btn-secondary text-sm px-3 py-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/signin"
            className="btn-primary text-sm px-4 py-2"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
