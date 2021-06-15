import React, {useEffect} from 'react';
import pumpGreen from "./../../../assets/img/pump_icon_green.svg";
import deleteIcon from "./../../../assets/img/delete.svg";
import settingsIcon from "./../../../assets/img/settings.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {pumpGetViewAJAX} from "../../../redux/pump/pumpReducer";

const Device: React.FunctionComponent = () => {
  const view = useSelector((state: RootState)=> state.pump.view);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pumpGetViewAJAX())
  }, [dispatch]);
  return (
      <div className="device">
        <div className="device__name">
          <span>Насос</span>
        </div>
        <div className="device__card">
          <div className="device__control-container">
            <div className="device__representation">
              <div className="device__img-container">
                <div className="device__img">
                  <img src={pumpGreen} alt=""/>
                </div>
                <div className="device__img-block">
                  <img src={deleteIcon} alt=""/>
                </div>
              </div>
              <div className="device__representation-parametrs">
                <div className="device__rep-value">
                  <span>900 сек</span>
                </div>
                <div className="device__rep-value">
                  80 л/мин
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
                  <input type="checkbox"/>
                </div>
                <div className="manual__button btn">
                  <button>Блокировать</button>
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