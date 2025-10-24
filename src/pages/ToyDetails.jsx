import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const ToyDetails = () => {
  const { id: toyIdentifier } = useParams();
  const { addToCart: addItemToCart } = useContext(CartContext);

  const [toyData, setToyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemQuantity, setItemQuantity] = useState(0);
  const detailsElementRef = useRef(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((toyDataArray) => {
        const selectedToy = toyDataArray.find(
          (toyItem) => toyItem.toyId === parseInt(toyIdentifier)
        );
        setToyData(selectedToy);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [toyIdentifier]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-500">
        Loading Toys...
      </div>
    );

  if (!toyData)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-500">
        Toy not found
      </div>
    );

  const handleQuantityIncrease = () => {
    if (itemQuantity < toyData.availableQuantity)
      setItemQuantity(itemQuantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (itemQuantity > 0) setItemQuantity(itemQuantity - 1);
  };

  const scrollToDetailsSection = () => {
    if (detailsElementRef.current) {
      detailsElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddItemToCart = () => {
    if (itemQuantity > 0) {
      addItemToCart(toyData, itemQuantity);
      toast.success(`${itemQuantity} x ${toyData.toyName} added to cart!`, {
        autoClose: 2000,
      });
      setItemQuantity(0);
    }
  };

  return (
    <div className="flex flex-col items-center text-primary px-4 md:px-8 lg:px-20 w-full max-w-7xl mx-auto gap-16 pt-40 md:pt-44 pb-12">
      {/* Product Card Section */}
      <div className="card hover-lift flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-8 mx-auto justify-center mt-32 md:mt-36 lg:mt-40">

        <img
          src={toyData.pictureURL}
          alt={toyData.toyName}
          className="w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-accent rounded-2xl object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {toyData.toyName}
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            {toyData.description.split(" ").slice(0, 15).join(" ")}...{" "}
            <span
              className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:underline font-medium"
              onClick={scrollToDetailsSection}
            >
              Explore More
            </span>
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xl text-secondary">Price:</span>
            <p className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              ${toyData.price}
            </p>
          </div>

          <div className="flex gap-3 text-xl items-center">
            <button
              onClick={handleQuantityDecrease}
              className="flex justify-center items-center w-12 h-12 rounded-xl bg-accent text-primary cursor-pointer shadow-md hover:bg-primary hover:text-accent transition-colors"
            >
              -
            </button>

            <span className="flex justify-center items-center w-12 h-12 rounded-xl bg-primary text-accent font-bold text-xl">
              {itemQuantity}
            </span>

            <button
              onClick={handleQuantityIncrease}
              className={`flex justify-center items-center w-12 h-12 rounded-xl cursor-pointer shadow-md transition-colors ${
                itemQuantity < toyData.availableQuantity
                  ? "bg-accent text-primary hover:bg-primary hover:text-accent"
                  : "bg-secondary text-primary cursor-not-allowed"
              }`}
              disabled={itemQuantity >= toyData.availableQuantity}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddItemToCart}
            disabled={itemQuantity === 0}
            className={`px-6 py-3 cursor-pointer rounded-xl font-semibold text-lg transition-colors ${
              itemQuantity === 0
                ? "bg-secondary text-primary cursor-not-allowed"
                : "btn-primary"
            }`}
          >
            Add to Basket
          </button>

          <div className="flex gap-6 mt-4">
            <p className="text-lg text-secondary">Share this product</p>
            <div className="flex gap-4">
              <FiFacebook className="text-2xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
              <FaInstagram className="text-2xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
              <RiTwitterXFill className="text-2xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div
        ref={detailsElementRef}
        className="flex flex-col gap-12 items-center w-full"
      >
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-primary font-bold text-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Product Overview
        </h1>
        <div className="card p-8 max-w-4xl">
          <p className="text-lg text-secondary leading-relaxed">
            {toyData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToyDetails;
