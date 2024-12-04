import React, { useState } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="relative w-full h-screen flex flex-col">
      <img src="./map.png" alt="map" className="w-full h-full object-cover" />

      <LocationSearchPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen} />
    </div>
  );
};

export default Home;
