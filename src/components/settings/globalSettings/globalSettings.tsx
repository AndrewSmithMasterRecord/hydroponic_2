import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {clockGetViewAJAX, setClockControlAJAX} from "../../../redux/clock/clockReducer";

const GlobalSettings: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const clock = useSelector((state: RootState) => state.clock.view);
  const fetchingButtons = useSelector((state: RootState) => state.buttons)
  const setClock = () => {
    const date = new Date();
    dispatch(setClockControlAJAX({minutesSet: Number(date.getMinutes())}));
    setTimeout(() => {
      dispatch(setClockControlAJAX({hoursSet: Number(date.getHours())}));
    }, 200);
  }

  return <div className="globalSettings">
    <div className="globalSettings__group">
      <div className="globalSettings__hello">Часы</div>
      <div className="globalSettings__content">
        <div className="globalSettings__view">{`${clock.hours}:${clock.minutes}`}</div>
        <div className="globalSettings__view">
          <div className="btn">
            <button style={{width: "200px", fontSize: "14px"}}
                    disabled={fetchingButtons.buttons.some(item=> item === "clock hoursSet" || "clock minutesSet")}
                    onClick={setClock}>Установить системное время</button>
          </div>
        </div>

      </div>
    </div>
  </div>
}

export default GlobalSettings;