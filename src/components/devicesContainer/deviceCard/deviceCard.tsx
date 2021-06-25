import React from "react";

type propsType = {
  name: string
}

const DeviceCard: React.FunctionComponent<propsType> = (props) => {
  return <div className="device">
    <div className="device__name">
      <span>{props.name}</span>
    </div>
    <div className="device__card">
      {props.children}
    </div>
  </div>
}

export default DeviceCard