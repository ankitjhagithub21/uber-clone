import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <img src="./map.png" alt="map" className="w-full h-full object-cover" />
      <div
        className={`absolute bottom-0 z-50 w-full bg-white p-5 transition-all duration-500 ease-in-out ${
          panelOpen ? 'h-full' : 'h-[30%]'
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="px-2 font-semibold text-2xl">Find a trip</h3>
          <button onClick={togglePanel}>
            {panelOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>
        </div>
        <form className="flex flex-col gap-3 p-2">
          <input
            type="text"
            placeholder="Add a pick-up location"
            onClick={() => setPanelOpen(true)}
            className="py-2 px-6 rounded-lg outline-none bg-gray-100"
          />
          <input
            type="text"
            placeholder="Enter your destination"
            onClick={() => setPanelOpen(true)}
            className="py-2 px-6 rounded-lg outline-none bg-gray-100"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
