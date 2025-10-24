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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-12">
        <label className="relative block">
          <svg
            className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary"
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
            placeholder="Search for amazing toys..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="input-field w-full pl-12 pr-4 py-4 text-lg"
          />
        </label>
      </div>

      {filteredToyItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredToyItems.map((toyItem) => (
            <Card key={toyItem.toyId} toy={toyItem} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-24">
          <div className="text-8xl mb-8">🔍</div>
          <h2 className="text-4xl font-bold text-primary mb-6">
            No Toys Found
          </h2>
          <p className="text-lg text-secondary mb-8 text-center max-w-md">
            We couldn't find any toys matching your search. Try different keywords!
          </p>
          <button
            onClick={() => navigateToPage("/")}
            className="btn-primary px-8 py-4 text-lg font-semibold rounded-full hover-lift"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
