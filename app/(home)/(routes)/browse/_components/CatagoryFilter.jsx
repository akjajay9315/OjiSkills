import React, { useState } from "react";

function CatagoryFilter({ selectedCatagory }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const filterOptions = [
    { id: 1, name: "All", value: "all" },
    { id: 2, name: "Web Dev", value: "webdev" },
    { id: 3, name: "UPSC", value: "upsc" },
    { id: 4, name: "Chess", value: "chess" },
    { id: 5, name: "SSC CGL", value: "ssc" },
    { id: 6, name: "Music", value: "music" },
    { id: 7, name: "JEE/NEET", value: "jeeneet" },
  ];

  const handleClick = (index, value) => {
    setActiveIndex(index);
    selectedCatagory(value);
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-5">
      {filterOptions.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(index, item.value)}
          className={`relative z-10 border-2 p-2 px-4 text-md rounded-md hover:border-green-600 font-medium hover:bg-gray-50
                      ${
                        activeIndex === index
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-gray-300"
                      }
                      ${index === 0 ? "mt-2 md:mt-0" : "mt-2"}`} // Adjust margin for spacing
          style={{ zIndex: 60 }} // Ensure the button is above other elements
        >
          <h2>{item.name}</h2>
        </button>
      ))}
    </div>
  );
}

export default CatagoryFilter;
