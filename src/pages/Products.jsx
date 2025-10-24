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
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 uppercase tracking-wider">
            Our Products
          </h1>
          <div className="w-full max-w-2xl mx-auto">
            <input
              type="search"
              placeholder="Search for amazing toys..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="input-field w-full px-4 py-4 text-lg"
            />
          </div>
        </div>

        {filteredToyItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredToyItems.map((toyItem) => (
              <Card key={toyItem.toyId} toy={toyItem} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-8xl mb-8">🔍</div>
            <h2 className="text-4xl font-bold text-primary mb-6 text-center">
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
    </div>
  );
};

export default Products;