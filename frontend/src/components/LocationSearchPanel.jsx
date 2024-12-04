import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Location from "./Location";
import { useEffect, useState } from "react";

const LocationSearchPanel = ({ panelOpen, setPanelOpen }) => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(""); // Track which input is active

  useEffect(() => {
    const getSuggestions = async (address) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${address}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        // Extract suggestions and update state
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    // Trigger suggestion fetch based on the active field (pickup or destination)
    if (activeField === "pickup" && pickup.trim() !== "") {
      getSuggestions(pickup);
    } else if (activeField === "destination" && destination.trim() !== "") {
      getSuggestions(destination);
    }
  }, [pickup, destination, activeField]);

  return (
    <div
      className={`absolute bottom-0 w-full bg-white p-5 transition-all duration-500 ease-in-out ${
        panelOpen ? "h-full" : "h-[25%]"
      }`}
    >
      <div className="flex items-center mb-3 justify-between">
        <h3 className="font-semibold text-2xl">Find a trip</h3>
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
          value={pickup}
          onChange={(e) => {
            setPickup(e.target.value);
            setActiveField("pickup"); // Set active field
          }}
          onClick={() => {
            setPanelOpen(true);
            setActiveField("pickup");
          }}
          className="py-2 px-6 rounded-lg outline-none bg-gray-100"
        />
        <input
          type="text"
          placeholder="Enter your destination"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setActiveField("destination"); // Set active field
          }}
          onClick={() => {
            setPanelOpen(true);
            setActiveField("destination");
          }}
          className="py-2 px-6 rounded-lg outline-none bg-gray-100"
        />
      </form>
      {/* Display fetched suggestions */}
      {panelOpen && suggestions.length > 0 && (
        <div className="mt-10">
          {suggestions.map((suggestion, index) => (
            <Location key={index} description={suggestion.description} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
