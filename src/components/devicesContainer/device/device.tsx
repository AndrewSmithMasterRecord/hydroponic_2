import React, {useEffect, useState} from 'react';
import pumpStart from "./../../../assets/img/pump_icon_green.svg";
import pumpStop from "./../../../assets/img/pump_icon.svg";
import deleteIcon from "./../../../assets/img/delete.svg";
import settingsIcon from "./../../../assets/img/settings.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {pumpGetViewAJAX, setPumpControlAJAX} from "../../../redux/pump/pumpReducer";

const Device: React.FunctionComponent = () => {
  const view = useSelector((state: RootState) => state.pump.view);
  const control = useSelector((state: RootState) => state.pump.control);
  const dispatch = useDispatch();
  const fetchingArray = useSelector((state: RootState) => state.buttons.buttons);


  const checkCreator = (value: "block" | "manualMode" | "manualOn") => () => {
    if (control[value] === 0) {
      dispatch(setPumpControlAJAX({[value]: 1}))
    } else {
      dispatch(setPumpControlAJAX({[value]: 0}))
    }
  }

  useEffect(() => {
    dispatch(pumpGetViewAJAX());

  }, [dispatch]);
  return (
      <div className="device">
        <div className="device__name">
          <span>Насос</span>
        </div>
        <div className="device__card">
          <div className="device__control-container">
            <div className="device__representation">
              <div className="device__img-container" onMouseDown={() => {
                console.log("mouse down")
              }}
                   onMouseUp={() => {
                     console.log("mouse up")
                   }}>
                <div className="device__img">
                  <img src={view.state === 0 ? pumpStop : pumpStart} alt=""/>
                </div>
                <div className="device__img-block" style={{display: view.isBlocking === 1 ? "block" : "none"}}>
                  <img src={deleteIcon} alt=""/>
                </div>
              </div>
              <div className="device__representation-parametrs">
                <div className="device__rep-value">
                  <span>{`${view.timer} сек`}</span>
                </div>
                <div className="device__rep-value">
                  {`${view.performance} л/мин`}
                </div>
              </div>
            </div>
            <div className="device__vertical-divider"></div>
            <div className="device__manual-control manual">
              <div className="manual__hello">
                <span>Ручное управление.</span>
              </div>
              <div>
                <div className="manual__switch check-box-slider">
                  <input type="checkbox" checked={control.manualMode == 1 ? true : false}
                         onChange={checkCreator("manualMode")}
                         disabled={fetchingArray.some(item => item === "pump manualMode")}/>
                </div>
                <div
                    className={`manual__button btn ${fetchingArray.some(item => item === "pump block") ? "btn_block" : ""}`}>
                  <button disabled={fetchingArray.some(item => item === "pump block")}
                          onClick={checkCreator("block")}>Блокировать
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="device__parametrs">
            <div className="device__parametrs-item">
              <span>1111 gg</span>
            </div>
            <div className="device__parametrs-item">
              <span>1111 gg</span>
            </div>
            <div className="device__parametrs-item">
              <span>1111 gg</span>
            </div>
          </div>
          <div className="device__footer">
            <div className="device__signals">
              <div className="device__footer-divider"></div>
              <div className="device__signal-message">
                <span>Авария насоса</span>
              </div>
            </div>
            <div className="device__settings">
              <img src={settingsIcon} alt=""/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Device;