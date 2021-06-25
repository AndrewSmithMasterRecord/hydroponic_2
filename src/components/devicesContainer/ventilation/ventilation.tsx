import React, {useEffect} from 'react';
import fanStart from "./../../../assets/img/fan_start.svg";
import fanStop from "./../../../assets/img/fan.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import DeviceButton, {checkType} from "../deviceButton/deviceButton";
import DeviceCard from "../deviceCard/deviceCard";
import DeviceBlockManual from "../deviceBlockManual/deviceBlockManual";
import DeviceFooter from "../deviceFooter/deviceFooter";
import ConfigInputGroup from "../deviceFooter/configInputGroup";
import MagicInput, {dataSendMagicInputType} from "../../../utils/magicInput";
import {setVentControlAJAX, ventGetControlAJAX, ventGetViewAJAX} from "../../../redux/ventilation/ventilationReducer";


const Ventilation: React.FunctionComponent = () => {
  const view = useSelector((state: RootState) => state.ventilation.view);
  const control = useSelector((state: RootState) => state.ventilation.control);
  const dispatch = useDispatch();
  const fetchingArray = useSelector((state: RootState) => state.buttons.buttons);


  const checkCreator: checkType = (value) => () => {
    if (control[value] === 0) {
      dispatch(setVentControlAJAX({[value]: 1}))
    } else {
      dispatch(setVentControlAJAX({[value]: 0}))
    }
  }

  const sendCallback: dataSendMagicInputType = (deviceParamName, value) => {
    dispatch(setVentControlAJAX({[deviceParamName]: value}));
  }


  useEffect(() => {
    dispatch(ventGetViewAJAX());
    dispatch(ventGetControlAJAX());
  }, [dispatch]);
  return (
      <DeviceCard name={"Вентиляция"}>
        <div className="device__control-container">

          <DeviceButton checkCreator={checkCreator} fetchingArray={fetchingArray} state={view.state}
                        startIcon={fanStart} stopIcon={fanStop} isBlocking={view.isBlocking} deviceName={"ventilation"}>

            <div className="device__representation-parametrs">
              <div className="device__rep-value">
                {`${view.timer} сек`}
              </div>
            </div>
          </DeviceButton>


          <DeviceBlockManual manualMode={control.manualMode}
                             checkCreator={checkCreator}
                             fetchingArray={fetchingArray}
                             deviceName={"ventilation"}/>
        </div>
        <div className="device__parametrs">
          <div className="device__parametrs-item">
            <span><b>{`${control.timerOn}`}</b>{` таймер вкл. сек.`}</span>
          </div>
          <div className="device__parametrs-item">
            <span><b>{`${control.timerOff}`}</b>{` таймер выкл. сек.`}</span>
          </div>
        </div>

        <DeviceFooter alarmMessage={""}>

          <ConfigInputGroup comment={"Таймер вкл., сек"}>
            <MagicInput currentValue={control.timerOn}
                        deviceName={"ventilation"} paramName={"timerOn"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 32000, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Таймер выкл., сек"}>
            <MagicInput currentValue={control.timerOff}
                        deviceName={"ventilation"} paramName={"timerOff"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 32000, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

        </DeviceFooter>

      </DeviceCard>
  )
}

export default Ventilation;