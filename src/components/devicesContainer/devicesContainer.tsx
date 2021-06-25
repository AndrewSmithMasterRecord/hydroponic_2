import React from "react";
import Pump from "./pump/pump";
import DrainPump from "./drainPump/drainPump";
import Light from "./light/light";
import Ventilation from "./ventilation/ventilation";
import Humidity from "./humidity/humidity";

const DevicesContainer: React.FunctionComponent = () => {
  return <div className="device-container">
    <Pump/>
    <DrainPump/>
    <Light/>
    <Ventilation/>
    <Humidity/>
  </div>
}

export default DevicesContainer;