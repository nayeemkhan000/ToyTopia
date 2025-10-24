import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Navigate, useNavigate } from "react-router";

const Products = () => {
  const [toyItems, setToyItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigateToPage = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((toyDataArray) => setToyItems(toyDataArray))
      .catch((error) => console.error(error));
  }, []);

  const filteredToyItems = toyItems.filter((toyItem) =>
    toyItem.toyName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1500px] mx-auto px-4 flex flex-col items-center">
      <label className="relative block w-1/2 mb-4">
        <svg
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>

        <input
          type="search"
          placeholder="Search for a toy"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </label>

      {filteredToyItems.length > 0 ? (
        <div className="grid grid-cols-3 gap-15 mt-10">
          {filteredToyItems.map((toyItem) => (
            <Card key={toyItem.toyId} toy={toyItem} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center my-[150px]">
          <p className="text-[100px] font-semibold text-gray-500 mb-10">
            No Toy Found
          </p>
          <button
            onClick={() => navigateToPage("/")}
            className="bg-[#FBC270] py-3 px-6 shadow-md rounded-full text-white font-semibold text-[20px] cursor-pointer hover:bg-[#4178a1] transition-colors text-lg"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
