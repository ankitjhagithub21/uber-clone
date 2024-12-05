import React from "react";

const LookingForRider = ({ ride,vehicleType }) => {
  
  const imgSrc =
  vehicleType === "car"
    ? "./car.jpg"
    : vehicleType === "auto"
    ? "./auto.webp"
    : "./moto.webp";

  return (
    <div
      className={`absolute bottom-0 w-full bg-white p-5 h-fit transition-all duration-500 ease-in-out ${
        ride ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between mb-5">
      <h3 className="text-2xl font-semibold">Looking for a Driver</h3>
      
      <span class="loader"></span>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src={imgSrc}
          alt="vehicle"
        />
        <div className="w-full mt-5">
          <div className="p-3 border-b-2">
            <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
          </div>
        </div>
        <div className="p-3 border-b-2">
          <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
        </div>
        <div className="flex items-center gap-5 p-3">
          <p className="text-xl -mt-1 text-gray-800 font-semibold">₹ {ride?.fare}</p>
        </div>
      </div>
    </div>
  );
};

export default LookingForRider;
