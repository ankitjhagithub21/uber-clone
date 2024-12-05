import { MdLocationPin } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { RiUserLocationFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
const ConfirmRide = ({
  setTrip,
  isOpen,
  setIsOpen,
  vehicleType,
  pickup,
  destination,
  fare,
}) => {
  const imgSrc =
    vehicleType === "car"
      ? "./car.jpg"
      : vehicleType === "auto"
      ? "./auto.webp"
      : "./moto.webp";
  return (
    <div
      className={`absolute bottom-0 w-full bg-white p-5 h-fit transition-all duration-500 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
     <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Confirm your ride</h1>
        <IoIosArrowDown
          size={23}
          onClick={() => {
            setTrip(true);
            setIsOpen(false);
          }}
        />
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img className="h-20" src={imgSrc} alt="vehicle" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
           <div>
           <RiUserLocationFill className="text-xl" />
           </div>

            <p className="text-sm -mt-1 text-gray-600">{pickup}</p>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
          <div>
          <MdLocationPin className="text-xl"/>
          </div>

            <p className="text-sm -mt-1 text-gray-600">{destination}</p>
          </div>
          <div className="flex items-center gap-5 p-3">
          <div>
          <IoMdCash className="text-xl" />
          </div>
            <p className="text-lg font-semibold  text-gray-800">₹{fare}</p>
           
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;