import React, { useState } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import ChooseVehicle from "../components/ChooseVehicle";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [trip,setTrip] = useState(false)
  const [fares,setFares] = useState(null)
  return (
    <div className="relative w-full h-screen flex flex-col">
      <img src="./map.png" alt="map" className="w-full h-full object-cover" />

      {
        <LocationSearchPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen} setTrip={setTrip} setFares={setFares}/>
      }
      <ChooseVehicle trip={trip} setTrip={setTrip} fares={fares}/>
    </div>
  );
};

export default Home;
