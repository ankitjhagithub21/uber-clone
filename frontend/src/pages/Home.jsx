import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  

  return (
    <div className="relative w-full h-screen flex flex-col">
      <img src="./map.png" alt="map" className="w-full h-full object-cover" />
      <div
        className={`absolute bottom-0  w-full bg-white p-5 transition-all duration-500 ease-in-out ${panelOpen ? 'h-full' : 'h-[25%]'
          }`}
      >
        <div className="flex items-center mb-3 justify-between">
          <h3 className=" font-semibold text-2xl">Find a trip</h3>
          <button onClick={togglePanel}>
            {panelOpen ? <IoIosArrowDown size={23} /> : <IoIosArrowUp size={23} />}
          </button>
        </div>
        <form className="flex flex-col gap-3">
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
        {
          panelOpen && <div className='mt-20 flex flex-col gap-5'>
            <div className='flex gap-3 border active:border-gray-800 rounded-lg  p-2 items-center'>
              <div className='bg-gray-100 rounded-lg p-2'>
                <MdLocationPin size={25} className='text-gray-800' />
              </div>
              <div>
                <h3 className='text-sm font-semibold'>24B, Indrapuri</h3>
                <p className='text-sm'>Lorem ipsum, dolor sit amet </p>
              </div>
            </div>
            <div className='flex gap-3 border active:border-gray-800 rounded-lg  p-2 items-center'>
              <div className='bg-gray-100 rounded-lg p-2'>
                <MdLocationPin size={25} className='text-gray-800' />
              </div>
              <div>
                <h3 className='text-sm font-semibold'>24B, Indrapuri</h3>
                <p className='text-sm'>Lorem ipsum, dolor sit amet </p>
              </div>
            </div>
            <div className='flex gap-3 border active:border-gray-800 rounded-lg  p-2 items-center'>
              <div className='bg-gray-100 rounded-lg p-2'>
                <MdLocationPin size={25} className='text-gray-800' />
              </div>
              <div>
                <h3 className='text-sm font-semibold'>24B, Indrapuri</h3>
                <p className='text-sm'>Lorem ipsum, dolor sit amet </p>
              </div>
            </div>
            
            
          </div>
        }
      </div>

    </div>
  );
};

export default Home;
