import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Location from "./Location";

const LocationSearchPanel = ({ panelOpen, setPanelOpen }) => {
  return (
    <div
      className={`absolute bottom-0  w-full bg-white p-5 transition-all duration-500 ease-in-out ${
        panelOpen ? "h-full" : "h-[25%]"
      }`}
    >
      <div className="flex items-center mb-3 justify-between">
        <h3 className=" font-semibold text-2xl">Find a trip</h3>
        <button onClick={() => setPanelOpen(!panelOpen)}>
          {panelOpen ? (
            <IoIosArrowDown size={23} />
          ) : (
            <IoIosArrowUp size={23} />
          )}
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
      {panelOpen && (
        <div className="mt-10">
          <Location />
          <Location />
          <Location />
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
