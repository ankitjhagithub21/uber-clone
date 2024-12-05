import React, { useState } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import ChooseVehicle from "../components/ChooseVehicle";
import ConfirmRide from "../components/ConfirmRide";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [trip, setTrip] = useState(false);
  const [fares, setFares] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isOpen,setIsOpen] = useState(false)
  const [fare,setFare] = useState(null)

  return (
    <div className="relative w-full h-screen flex flex-col">
      <img src="./map.png" alt="map" className="w-full h-full object-cover" />

      {
        <LocationSearchPanel
          pickup={pickup}
          setPickup={setPickup}
          destination={destination}
          setDestination={setDestination}
          panelOpen={panelOpen}
          setPanelOpen={setPanelOpen}
          setTrip={setTrip}
          setFares={setFares}
        />
      }
      <ChooseVehicle
        trip={trip}
        setTrip={setTrip}
        setPanel={setPanelOpen}
        fares={fares}
        setIsOpen={setIsOpen}
        setVehicleType={setVehicleType}
        setFare={setFare}
      />

      <ConfirmRide setTrip={setTrip} isOpen={isOpen} setIsOpen={setIsOpen} vehicleType={vehicleType} pickup={pickup} destination={destination} fare={fare}/>
    </div>
  );
};

export default Home;
