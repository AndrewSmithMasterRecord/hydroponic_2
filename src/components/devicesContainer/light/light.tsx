import React, {useEffect} from 'react';
import sunOn from "./../../../assets/img/sun_yellow.svg";
import sunOff from "./../../../assets/img/sun.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import DeviceButton, {checkType} from "../deviceButton/deviceButton";
import DeviceCard from "../deviceCard/deviceCard";
import DeviceBlockManual from "../deviceBlockManual/deviceBlockManual";
import DeviceFooter from "../deviceFooter/deviceFooter";
import ConfigInputGroup from "../deviceFooter/configInputGroup";
import MagicInput, {dataSendMagicInputType} from "../../../utils/magicInput";
import {lightGetControlAJAX, lightGetViewAJAX, setLightControlAJAX} from "../../../redux/light/lightReducer";


const Light: React.FunctionComponent = () => {
  const view = useSelector((state: RootState) => state.light.view);
  const control = useSelector((state: RootState) => state.light.control);
  const dispatch = useDispatch();
  const fetchingArray = useSelector((state: RootState) => state.buttons.buttons);


  const checkCreator: checkType = (value) => () => {
    if (control[value] === 0) {
      dispatch(setLightControlAJAX({[value]: 1}))
    } else {
      dispatch(setLightControlAJAX({[value]: 0}))
    }
  }

  const sendCallback: dataSendMagicInputType = (deviceParamName, value) => {
    dispatch(setLightControlAJAX({[deviceParamName]: value}));
  }


  useEffect(() => {
    dispatch(lightGetViewAJAX());
    dispatch(lightGetControlAJAX());
  }, [dispatch]);
  return (
      <DeviceCard name={"Освещение"}>
        <div className="device__control-container">

          <DeviceButton checkCreator={checkCreator} fetchingArray={fetchingArray} state={view.state}
                        startIcon={sunOn} stopIcon={sunOff} isBlocking={view.isBlocking} deviceName={"light"}>

            <div className="device__representation-parametrs">
              <div className="device__rep-value">
                {`${view.durationOn} ч.`}
              </div>
              <div className="device__rep-value">
                {`${view.hoursOn}:${view.minutesOn} вкл.`}
              </div>
            </div>
          </DeviceButton>


          <DeviceBlockManual manualMode={control.manualMode}
                             checkCreator={checkCreator}
                             fetchingArray={fetchingArray}
                             deviceName={"light"}/>
        </div>
        <div className="device__parametrs">
          <div className="device__parametrs-item">
            <span><b>{`${view.power}`}</b>{` мощность`}</span>
          </div>
        </div>

        <DeviceFooter alarmMessage={""}>

          <ConfigInputGroup comment={"Длительность вкл. часов"}>
            <MagicInput currentValue={control.durationOnSet}
                        deviceName={"light"} paramName={"durationOnSet"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 24, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Часы включения"}>
            <MagicInput currentValue={control.hoursOnSet}
                        deviceName={"light"} paramName={"hoursOnSet"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0, max: 23, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Минуты включения"}>
            <MagicInput currentValue={control.minutesOnSet}
                        deviceName={"light"} paramName={"minutesOnSet"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0, max: 59, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Мощность"}>
            <MagicInput currentValue={control.powerSet}
                        deviceName={"light"} paramName={"powerSet"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0, max: 100, digitsAfterZero: 0}}/>
          </ConfigInputGroup>
        </DeviceFooter>

      </DeviceCard>
  )
}

export default Light;