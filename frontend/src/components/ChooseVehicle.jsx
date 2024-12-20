import React from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const ChooseVehicle = ({ trip, setTrip, fares, setPanel,setVehicleType,setIsOpen,setFare }) => {
  return (
    <div
      className={`absolute bottom-0 w-full bg-white p-5 h-[60vh] transition-all duration-500 ease-in-out ${
        trip ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Choose a vehicle</h1>
        <IoIosArrowDown
          size={23}
          onClick={() => {
            setTrip(false);
            setPanel(true);
          }}
        />
      </div>

      <div>
        <div className="flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between" onClick={()=>{
          setVehicleType('car')
          setFare(fares.car)
         setTrip(false) 
         setIsOpen(true)
         
         
        }}>
          <img className="h-10" src="./car.jpg" alt="car" />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base flex items-center gap-1">
              UberGo <FaUser size={14} /> 4
            </h4>
            <h5 className="font-medium text-sm">2 mins away </h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{fares?.car}</h2>
        </div>
        <div className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between" onClick={()=>{
          setVehicleType('motorcycle')
          setFare(fares.motorcycle)
         setTrip(false) 
         setIsOpen(true)
        }}>
          <img className="h-10" src="./moto.webp" alt="motorcycle" />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-base flex items-center gap-1">
              Moto <FaUser size={14} /> 1
            </h4>
            <h5 className="font-medium text-sm">3 mins away </h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable motorcycle rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{fares?.motorcycle}</h2>
        </div>
        <div className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between" onClick={()=>{
          setVehicleType('auto')
          setFare(fares.auto)
         setTrip(false) 
         setIsOpen(true)
         
        }}>
          <img className="h-10" src="./auto.webp" alt="auto" />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base flex items-center gap-1">
              UberAuto <FaUser size={14} /> 3
            </h4>
            <h5 className="font-medium text-sm">3 mins away </h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable Auto rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{fares?.auto}</h2>
        </div>
      </div>
    </div>
  );
};

export default ChooseVehicle;
