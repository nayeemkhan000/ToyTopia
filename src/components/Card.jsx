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
    <div className="bg-white p-4 flex flex-col justify-between h-full gap-3 rounded-2xl shadow-lg hover:shadow-lg transition-shadow">
      <div
        className="bg-[#FEEEC1] rounded-2xl overflow-hidden flex justify-center items-center cursor-pointer"
        onClick={handleNavigateToDetails}
      >
        <img
          src={toyItem.pictureURL}
          alt={toyItem.toyName}
          className="w-full h-[300px] object-contain"
        />
      </div>

      <div className="flex justify-between text-[16px] text-black">
        <p>
          Rating: <span className="font-semibold">{toyItem.rating}</span>
        </p>
        <p>
          Available:{" "}
          <span className="font-semibold">{toyItem.availableQuantity}</span>
        </p>
      </div>

      <p
        onClick={handleNavigateToDetails} 
        className="font-semibold text-[20px] hover:text-[#559BD7] cursor-pointer text-black"
      >
        {toyItem.toyName}
      </p>

      <p className="text-[#54576B] text-[14px]">
        {truncatedDescription}{" "}
        <span
          onClick={handleNavigateToDetails}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          See More
        </span>
      </p>

      <button
        onClick={handleNavigateToDetails} 
        className="w-full bg-[#FBC270] p-2 rounded-2xl shadow-md text-[#00000088] cursor-pointer font-semibold text-[20px] hover:bg-[#4178a1] transition-colors hover:text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
