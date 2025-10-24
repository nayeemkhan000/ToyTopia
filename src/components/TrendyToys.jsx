import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const TrendyToys = () => {
  const [toyItems, setToyItems] = useState([]);
  const navigateToPage = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((toyDataArray) => setToyItems(toyDataArray.slice(0, 6)))
      .catch((fetchError) => console.error("Error fetching data:", fetchError));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <h1
        className="text-4xl md:text-5xl lg:text-6xl mb-12 text-center text-primary font-bold animate-fadeInUp"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Featured Toys
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {toyItems.map((toyItem) => (
          <Card key={toyItem.toyId} toy={toyItem} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigateToPage("/products", { state: { toys: toyItems } })}
          className="btn-primary px-8 py-4 text-lg font-semibold rounded-full hover-lift"
        >
          Discover More
        </button>
      </div>
    </div>
  );
};

export default TrendyToys;
