import React from "react";

const DeviceCard: React.FunctionComponent = (props) => {
  return <div className="device">
    <div className="device__name">
      <span>Насос</span>
    </div>
    <div className="device__card">
      {props.children}
    </div>
  </div>
}

export default DeviceCard