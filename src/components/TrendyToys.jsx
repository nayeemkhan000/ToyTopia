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
    <div className="max-w-[1500px] mx-auto px-5 my-[100px]">
      <h1
        className="text-[70px] mb-10 text-center text-[#000000] "
        style={{ fontFamily: "Fredoka One" }}
      >
        Trendy Toys
      </h1>

      <div className="grid grid-cols-3 mt-[100px] gap-10">
        {toyItems.map((toyItem) => (
          <Card key={toyItem.toyId} toy={toyItem} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigateToPage("/products", { state: { toys: toyItems } })}
          className="bg-[#FBC270] text-[#00000088] shadow-md font-semibold px-10 py-5 mt-5 rounded-full hover:bg-[#4178a1] transition-colors text-[20px] cursor-pointer"
        >
          Discover More
        </button>
      </div>
    </div>
  );
};

export default TrendyToys;
