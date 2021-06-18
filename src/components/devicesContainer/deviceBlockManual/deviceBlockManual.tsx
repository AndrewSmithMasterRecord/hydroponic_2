import React from "react";

export type blockManualPropType = {
  manualMode?: Number,
  checkCreator: (value: "block" | "manualMode" | "manualOn") => () => void,
  fetchingArray: Array<String>,
  deviceName: string
}

const DeviceBlockManual: React.FunctionComponent<blockManualPropType> = (props) => {
  return <>
    <div className="device__vertical-divider"></div>
    <div className="device__manual-control manual">
      <div className="manual__hello">
        <span>Ручное управление.</span>
      </div>
      <div>
        <div className="manual__switch check-box-slider">
          <input type="checkbox" checked={props.manualMode == 1 ? true : false}
                 onChange={props.checkCreator("manualMode")}
                 disabled={props.fetchingArray.some(item => item === "pump manualMode")}/>
        </div>
        <div
            className={`manual__button btn ${props.fetchingArray.some(item => item === `${props.deviceName} block`) ? "btn_block" : ""}`}>
          <button disabled={props.fetchingArray.some(item => item === `${props.deviceName} block`)}
                  onClick={props.checkCreator("block")}>Блокировать
          </button>
        </div>
      </div>
    </div>
  </>
}

export default DeviceBlockManual;