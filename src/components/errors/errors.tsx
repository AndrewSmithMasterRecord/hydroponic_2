import React, {useState} from "react";
import warnings from "../../assets/img/warnings.svg"
import warnings_red from "../../assets/img/warnings_red.svg"
import UserDialogsModal from "../usersContainer/user/userDialogsModal/userDialogsModal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {deleteErrors} from "../../redux/errors/errorsReducer";

const Errors: React.FunctionComponent = () => {

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    setOpenModal(true);
  }
  const onClearAlarms = () => {
    setOpenModal(false);
    dispatch(deleteErrors());
  }
  const alarmsList = useSelector((state: RootState) => state.errors.errors);
  const alarmsMap = alarmsList.map(item => (<div className="alarms__list__item">
    <span>{item.message}</span>
  </div>))

  const [oldAlarm, oldAlarmSet] = useState<string>("");
  const [showMessage, showMessageSet] = useState<boolean>(false);
  const [isTimerSet, timerSet] = useState<boolean>(false);

  if (alarmsList.length !== 0) {
    if (alarmsList[alarmsList.length - 1].message !== oldAlarm) {
      oldAlarmSet(alarmsList[alarmsList.length - 1].message);
      showMessageSet(true);
      if (!isTimerSet) {
        timerSet(true);
        setTimeout(() => {
          timerSet(false);
          showMessageSet(false)
        }, 5000);
      }
    }
  }

  return <div className="alarms" >

    {openModal && <UserDialogsModal elementId={"main"}>
      <div className="popup-wrapper__container popup-wrapper__container_alarms" >
        <div className="popup-wrapper__hello popup-wrapper__hello_alarms">
          <span>Ошибки.</span>
        </div>

        <div className="alarms__list">
          {alarmsMap}
        </div>

        <div className="alarms__buttonContainer">
          <div className="alarms__clearButton btn btn_red">
            <button onClick={onClearAlarms}>Очистить</button>
          </div>
        </div>
      </div>

    </UserDialogsModal>}


    <div className="alarms__icon" onClick={onOpenModal}>
      <img src={alarmsList.length === 0 ? warnings : warnings_red}/>
    </div>
    <div className="alarms__counter" style={{color: alarmsList.length !== 0 ? "#fd1e00" : "#082836"}}>
      <span>{alarmsList.length}</span>
    </div>
    <div className="alarms__message" onClick={onOpenModal}>
      <span>{showMessage && alarmsList.length !== 0 && `${alarmsList[alarmsList.length - 1].message}`}</span>
    </div>
  </div>
}

export default Errors;