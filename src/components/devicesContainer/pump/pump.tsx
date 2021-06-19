import React, {useEffect, useRef, useState} from 'react';
import pumpStart from "./../../../assets/img/pump_icon_green.svg";
import pumpStop from "./../../../assets/img/pump_icon.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {pumpGetControlAJAX, pumpGetViewAJAX, setPumpControlAJAX} from "../../../redux/pump/pumpReducer";
import DeviceButton, {checkType} from "../deviceButton/deviceButton";
import DeviceCard from "../deviceCard/deviceCard";
import DeviceBlockManual from "../deviceBlockManual/deviceBlockManual";
import DeviceFooter from "../deviceFooter/deviceFooter";
import ConfigInputGroup from "../deviceFooter/configInputGroup";
import MagicInput, {dataSendMagicInputType} from "../../../utils/magicInput";


const Pump: React.FunctionComponent = () => {
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

  const sendCallback: dataSendMagicInputType = (deviceParamName, value) => {
    dispatch(setPumpControlAJAX({[deviceParamName]: value}));
  }

  useEffect(() => {
    dispatch(pumpGetViewAJAX());
    dispatch(pumpGetControlAJAX());

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
                {`${view.performance / 100} л/мин`}
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

          <ConfigInputGroup comment={"Производительность"}>
            <MagicInput currentValue={control.power}
                        deviceName={"pump"} paramName={"power"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 100, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Таймер вкл., сек"}>
            <MagicInput currentValue={control.timerOn}
                        deviceName={"pump"} paramName={"timerOn"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 30000, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Таймер выкл., сек"}>
            <MagicInput currentValue={control.timerOff}
                        deviceName={"pump"} paramName={"timerOff"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 30000, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Контроль потока"}>
            <MagicInput currentValue={control.flowControl}
                        deviceName={"pump"} paramName={"flowControl"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0, max: 1, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Рабочая производительность л/мин"}>
            <MagicInput currentValue={control.jobPerformance}
                        deviceName={"pump"} paramName={"jobPerformance"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0.05, max: 320, digitsAfterZero: 2}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Дельта макс производительности л/мин"}>
            <MagicInput currentValue={control.dMaxPerformance}
                        deviceName={"pump"} paramName={"dMaxPerformance"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0.05, max: 100, digitsAfterZero: 2}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Дельта мин производительности л/мин"}>
            <MagicInput currentValue={control.dMinPerformance}
                        deviceName={"pump"} paramName={"dMinPerformance"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0.05, max: 100, digitsAfterZero: 2}}/>
          </ConfigInputGroup>

        </DeviceFooter>

      </DeviceCard>
  )
}

export default Pump;