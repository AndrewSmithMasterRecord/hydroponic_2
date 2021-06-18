import deleteIcon from "../../../assets/img/delete.svg";
import React from "react";
import style from "./deviceButton.module.css"


export type deviceButtonPropType = {
  checkCreator: (value: "block" | "manualMode" | "manualOn")=> () => void,
  fetchingArray: Array<String>,
  state: Number,
  startIcon: string,
  stopIcon: string,
  isBlocking: Number,
  deviceName: string
}
export type checkType = (value: "block" | "manualMode" | "manualOn") => () => void;

const DeviceButton:React.FunctionComponent<deviceButtonPropType> = (props) => {

  const device_mouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.className += ` ${style.device_mouseDown}`;
  }
  const device_mouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.className = "device__representation";
  }

  return (<button className="device__representation" onMouseDown={device_mouseDown}
                  onMouseUp={device_mouseUp}
                  onClick={props.checkCreator("manualOn")}
                   disabled={props.fetchingArray.some(item => item === `${props.deviceName} manualOn`)}>
    <div className="device__img-container">
      <div className="device__img">
        <img src={props.state === 0 ? props.stopIcon : props.startIcon} alt=""/>
      </div>
      <div className="device__img-block" style={{display: props.isBlocking === 1 ? "block" : "none"}}>
        <img src={deleteIcon} alt=""/>
      </div>
    </div>
    {props.children}
  </button>)
}
export default DeviceButton;