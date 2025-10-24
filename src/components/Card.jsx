import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ toy: toyItem }) => {
  const navigateToPage = useNavigate();

  const truncatedDescription =
    toyItem.description.split(" ").slice(0, 15).join(" ") + "...";

  const handleNavigateToDetails = () => {
    navigateToPage(`/toys/${toyItem.toyId}`); 
  };

  return (
    <div className="card hover-lift flex flex-col justify-between h-full gap-4 p-6">
      <div
        className="bg-accent rounded-2xl overflow-hidden flex justify-center items-center cursor-pointer group"
        onClick={handleNavigateToDetails}
      >
        <img
          src={toyItem.pictureURL}
          alt={toyItem.toyName}
          className="w-full h-[250px] md:h-[300px] object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex justify-between text-sm text-secondary">
        <p>
          Rating: <span className="font-semibold text-accent">{toyItem.rating}</span>
        </p>
        <p>
          In Stock:{" "}
          <span className="font-semibold text-accent">{toyItem.availableQuantity}</span>
        </p>
      </div>

      <h3
        onClick={handleNavigateToDetails} 
        className="font-bold text-lg text-primary hover:text-accent cursor-pointer transition-colors"
      >
        {toyItem.toyName}
      </h3>

      <p className="text-secondary text-sm leading-relaxed">
        {truncatedDescription}{" "}
        <span
          onClick={handleNavigateToDetails}
          className="text-accent cursor-pointer hover:underline font-medium"
        >
          Explore More
        </span>
      </p>

      <button
        onClick={handleNavigateToDetails} 
        className="btn-primary w-full py-3 text-base font-semibold rounded-xl"
      >
        Add to Basket
      </button>
    </div>
  );
};

export default Card;
