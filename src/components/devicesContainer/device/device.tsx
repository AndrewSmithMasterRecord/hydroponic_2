import React, {useEffect, useRef, useState} from 'react';
import pumpStart from "./../../../assets/img/pump_icon_green.svg";
import pumpStop from "./../../../assets/img/pump_icon.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {pumpGetViewAJAX, setPumpControlAJAX} from "../../../redux/pump/pumpReducer";
import DeviceButton, {checkType} from "../deviceButton/deviceButton";
import DeviceCard from "../deviceCard/deviceCard";
import DeviceBlockManual from "../deviceBlockManual/deviceBlockManual";
import DeviceFooter from "../deviceFooter/deviceFooter";
import ConfigInputGroup from "../deviceFooter/configInputGroup";



const Device: React.FunctionComponent = () => {
  const view = useSelector((state: RootState) => state.pump.view);
  const control = useSelector((state: RootState) => state.pump.control);
  const dispatch = useDispatch();
  const fetchingArray = useSelector((state: RootState) => state.buttons.buttons);


  const checkCreator: checkType = (value) => () => {
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
      <DeviceCard>
        <div className="device__control-container">

          <DeviceButton checkCreator={checkCreator} fetchingArray={fetchingArray} state={view.state}
                        startIcon={pumpStart} stopIcon={pumpStop} isBlocking={view.isBlocking} deviceName={"pump"}>

            <div className="device__representation-parametrs">
              <div className="device__rep-value">
                {`${view.timer} сек`}
              </div>
              <div className="device__rep-value">
                {`${view.performance} л/мин`}
              </div>
            </div>
          </DeviceButton>


          <DeviceBlockManual manualMode={control.manualMode}
                             checkCreator={checkCreator}
                             fetchingArray={fetchingArray}
                             deviceName={"pump"}/>
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

        <DeviceFooter>
          <ConfigInputGroup comment={"Вот оно как"}>
            <div className="configMenu__input">
              <input type="text"/>
            </div>
          </ConfigInputGroup>
          <ConfigInputGroup comment={"Еще один"}>
            <div className="configMenu__input">
              <input type="text"/>
            </div>
          </ConfigInputGroup>
        </DeviceFooter>

      </DeviceCard>
  )
}

export default Device;