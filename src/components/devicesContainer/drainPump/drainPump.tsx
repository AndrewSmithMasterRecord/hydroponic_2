import React, {useEffect} from 'react';
import pumpStart from "./../../../assets/img/pump_icon_green.svg";
import pumpStop from "./../../../assets/img/pump_icon.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import DeviceButton, {checkType} from "../deviceButton/deviceButton";
import DeviceCard from "../deviceCard/deviceCard";
import DeviceBlockManual from "../deviceBlockManual/deviceBlockManual";
import DeviceFooter from "../deviceFooter/deviceFooter";
import ConfigInputGroup from "../deviceFooter/configInputGroup";
import MagicInput, {dataSendMagicInputType} from "../../../utils/magicInput";
import {drainGetControlAJAX, drainGetViewAJAX, setDrainControlAJAX} from "../../../redux/drainPump/drainPumpReducer";


const DrainPump: React.FunctionComponent = () => {
  const view = useSelector((state: RootState) => state.darin.view);
  const control = useSelector((state: RootState) => state.darin.control);
  const dispatch = useDispatch();
  const fetchingArray = useSelector((state: RootState) => state.buttons.buttons);


  const checkCreator: checkType = (value) => () => {
    if (control[value] === 0) {
      dispatch(setDrainControlAJAX({[value]: 1}))
    } else {
      dispatch(setDrainControlAJAX({[value]: 0}))
    }
  }

  const sendCallback: dataSendMagicInputType = (deviceParamName, value) => {
    dispatch(setDrainControlAJAX({[deviceParamName]: value}));
  }

  const resetError = () => {
    dispatch(setDrainControlAJAX({resetError: 1}));
  }

  useEffect(() => {
    dispatch(drainGetViewAJAX());
    dispatch(drainGetControlAJAX());
  }, [dispatch]);
  return (
      <DeviceCard name={"Дренаж"}>
        <div className="device__control-container">

          <DeviceButton checkCreator={checkCreator} fetchingArray={fetchingArray} state={view.state}
                        startIcon={pumpStart} stopIcon={pumpStop} isBlocking={view.isBlocking} deviceName={"drain"}>

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
                             deviceName={"drain"}/>
        </div>
        <div className="device__parametrs">
          <div className="device__parametrs-item">
            <span><b>{`${control.timerOn}`}</b>{` таймер откачки сек.`}</span>
          </div>
          <div className="device__parametrs-item">
            <span><b>{`${control.levelOn}`}</b>{` таймер уровня сек.`}</span>
          </div>
          <div className="device__parametrs-item">
            <span><b>{`${control.jobPerformance/100}`}</b>{` производительность л/мин`}</span>
          </div>
        </div>

        <DeviceFooter alarmMessage={view.error === 2 ? "Авария насоса!" : ""}>

          <ConfigInputGroup comment={"Производительность"}>
            <MagicInput currentValue={control.power}
                        deviceName={"drain"} paramName={"power"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 100, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Таймер уровня, сек"}>
            <MagicInput currentValue={control.levelOn}
                        deviceName={"drain"} paramName={"levelOn"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 30000, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Таймер откачки, сек"}>
            <MagicInput currentValue={control.timerOn}
                        deviceName={"drain"} paramName={"timerOn"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 1, max: 30000, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Контроль потока"}>
            <MagicInput currentValue={control.flowControl}
                        deviceName={"drain"} paramName={"flowControl"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0, max: 1, digitsAfterZero: 0}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Рабочая производительность л/мин"}>
            <MagicInput currentValue={control.jobPerformance}
                        deviceName={"drain"} paramName={"jobPerformance"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0.05, max: 320, digitsAfterZero: 2}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Дельта макс производительности л/мин"}>
            <MagicInput currentValue={control.dMaxPerformance}
                        deviceName={"drain"} paramName={"dMaxPerformance"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0.05, max: 100, digitsAfterZero: 2}}/>
          </ConfigInputGroup>

          <ConfigInputGroup comment={"Дельта мин производительности л/мин"}>
            <MagicInput currentValue={control.dMinPerformance}
                        deviceName={"drain"} paramName={"dMinPerformance"}
                        dataSendCallback={sendCallback}
                        valueRange={{min: 0.05, max: 100, digitsAfterZero: 2}}/>
          </ConfigInputGroup>
          <div className="btn btn_red">
            <button style={{fontSize: "14px", width: "120px", height: "30px"}}
                    onClick={resetError}
                    disabled={fetchingArray.some(item => item === "drain resetError")}>Сброс ошибки
            </button>
          </div>

        </DeviceFooter>

      </DeviceCard>
  )
}

export default DrainPump;