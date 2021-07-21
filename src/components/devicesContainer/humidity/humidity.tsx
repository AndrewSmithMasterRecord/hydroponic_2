import React, {useEffect} from 'react';
import humidityStart from "./../../../assets/img/humidity_start.svg";
import humidityStop from "./../../../assets/img/humid.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import DeviceButton, {checkType} from "../deviceButton/deviceButton";
import DeviceCard from "../deviceCard/deviceCard";
import DeviceBlockManual from "../deviceBlockManual/deviceBlockManual";
import DeviceFooter from "../deviceFooter/deviceFooter";
import ConfigInputGroup from "../deviceFooter/configInputGroup";
import MagicInput, {dataSendMagicInputType} from "../../../utils/magicInput";
import {
  humidityGetControlAJAX,
  humidityGetViewAJAX,
  setHumidityControlAJAX
} from '../../../redux/humidity/humidityReducer';


const Humidity: React.FunctionComponent = () => {
  const view = useSelector((state: RootState) => state.humidity.view);
  const control = useSelector((state: RootState) => state.humidity.control);
  const dispatch = useDispatch();
  const fetchingArray = useSelector((state: RootState) => state.buttons.buttons);


  const checkCreator: checkType = (value) => () => {
    if (control[value] === 0) {
      dispatch(setHumidityControlAJAX({[value]: 1}))
    } else {
      dispatch(setHumidityControlAJAX({[value]: 0}))
    }
  }

  const sendCallback: dataSendMagicInputType = (deviceParamName, value) => {
    dispatch(setHumidityControlAJAX({[deviceParamName]: value}));
  }


  useEffect(() => {
    dispatch(humidityGetViewAJAX());
    dispatch(humidityGetControlAJAX());
  }, [dispatch]);
  return (
      <DeviceCard name={"Температура и влажность"}>
        <div className="device__control-container">

          <DeviceButton checkCreator={checkCreator} fetchingArray={fetchingArray} state={view.state}
                        startIcon={humidityStart} stopIcon={humidityStop} isBlocking={view.isBlocking} deviceName={"humidity"}>

            <div className="device__representation-parametrs">
              <div className="device__rep-value">
                {`${view.humidity/10} %`}
              </div>
              <div className="device__rep-value">
                {`${view.temperature / 10} гр.C`}
              </div>
            </div>
          </DeviceButton>


          <DeviceBlockManual manualMode={control.manualMode}
                             checkCreator={checkCreator}
                             fetchingArray={fetchingArray}
                             deviceName={"humidity"}/>
        </div>
        <div className="device__parametrs">
          <div className="device__parametrs-item">
            <span><b>{`${control.humiditySet}`}</b>{` установленная влажность, %`}</span>
          </div>
          <div className="device__parametrs-item">
            <span><b>{`${control.deadZone}`}</b>{` зона нечувствительности, %`}</span>
          </div>
        </div>

        <DeviceFooter alarmMessage={""}>

          <ConfigInputGroup comment={"Влажность, %"}>
            <MagicInput currentValue={control.humiditySet}
                        deviceName={"humidity"} paramName={"humiditySet"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 20, max: 100, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Зона нечувствительности, %"}>
            <MagicInput currentValue={control.deadZone}
                        deviceName={"humidity"} paramName={"deadZone"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 30, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

        </DeviceFooter>

      </DeviceCard>
  )
}

export default Humidity;