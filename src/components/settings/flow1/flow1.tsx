import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import MagicInput, {dataSendMagicInputType} from "../../../utils/magicInput";
import {
  flow1GetConfigAJAX, flowGetControlAJAX,
  flowGetViewAJAX,
  setFlowConfigAJAX,
  setFlowControlAJAX
} from "../../../redux/flow/flowReducer";

const Flow1Settings: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const flow1 = useSelector((state: RootState) => state.flow.sensors[0]);
  const flow2 = useSelector((state: RootState) => state.flow.sensors[1]);
  const fetchingButtons = useSelector((state: RootState) => state.buttons)

  const sendConfigCallback: dataSendMagicInputType = (deviceParamName, value) => {
    dispatch(setFlowConfigAJAX({[deviceParamName]: value}, 0));
  }
  const sendConfigCallback2: dataSendMagicInputType = (deviceParamName, value) => {
    dispatch(setFlowConfigAJAX({[deviceParamName]: value}, 1));
  }
  const resetVolume1 = () => {
    dispatch(setFlowControlAJAX({resetVolume: 1}, 0));
  }
  const resetVolume2 = () => {
    dispatch(setFlowControlAJAX({resetVolume: 1}, 1));
  }

  useEffect(() => {
    dispatch(flow1GetConfigAJAX(0));
    dispatch(flow1GetConfigAJAX(1));
    dispatch(flowGetControlAJAX(0));
    dispatch(flowGetControlAJAX(1));
  }, [dispatch])

  return <div className="globalSettings">
    <div className="globalSettings__group">
      <div className="globalSettings__hello">Датчик 1</div>
      <div className="globalSettings__content">
        <div className="globalSettings__view">
          <div className="globalSettings__viewItem">
            {`${flow1.view.performance/100} л/мин`}
          </div>
          <div className="globalSettings__viewItem">
            {`${flow1.view.volume/10} л.`}
          </div>
          <div className="globalSettings__viewItem">
            <MagicInput deviceName={"flow0"}
                        paramName={"impPerLiter"}
                        currentValue={flow1.config.impPerLiter}
                        dataSendCallback={sendConfigCallback}
                        valueRange={{min: 1, max: 32000, digitsAfterZero: 0}}/>
            <div className="globalSettings__itemComment"> Количество импульсов на литр</div>
          </div>
          <div className="globalSettings__viewItem">
            <MagicInput deviceName={"flow0"}
                        paramName={"callImpCounter"}
                        currentValue={flow1.view.callImpCounter}
                        dataSendCallback={sendConfigCallback}
                        valueRange={{min: 1, max: 32000, digitsAfterZero: 0}}/>
            <div className="globalSettings__itemComment"> Общее количество импульсов</div>
          </div>
          <div className="globalSettings__viewItem">
            <div className="btn">
              <button style={{fontSize: "14px", width: "150px", height: "40px"}}
                      onClick={resetVolume1}
                      disabled={fetchingButtons.buttons.some(item => item === "flow0 resetVolume")}>Сбросить объем
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div className="globalSettings__group">
      <div className="globalSettings__hello">Датчик 2</div>
      <div className="globalSettings__content">
        <div className="globalSettings__view">
          <div className="globalSettings__viewItem">
            {`${flow2.view.performance/100} л/мин`}
          </div>
          <div className="globalSettings__viewItem">
            {`${flow2.view.volume/10} л.`}
          </div>
          <div className="globalSettings__viewItem">
            <MagicInput deviceName={"flow1"}
                        paramName={"impPerLiter"}
                        currentValue={flow2.config.impPerLiter}
                        dataSendCallback={sendConfigCallback2}
                        valueRange={{min: 1, max: 32000, digitsAfterZero: 0}}/>
            <div className="globalSettings__itemComment"> Количество импульсов на литр</div>
          </div>
          <div className="globalSettings__viewItem">
            <MagicInput deviceName={"flow1"}
                        paramName={"callImpCounter"}
                        currentValue={flow2.view.callImpCounter}
                        dataSendCallback={sendConfigCallback2}
                        valueRange={{min: 1, max: 32000, digitsAfterZero: 0}}/>
            <div className="globalSettings__itemComment"> Общее количество импульсов</div>
          </div>
          <div className="globalSettings__viewItem">
            <div className="btn">
              <button style={{fontSize: "14px", width: "150px", height: "40px"}}
                      onClick={resetVolume2}
                      disabled={fetchingButtons.buttons.some(item => item === "flow1 resetVolume")}>Сбросить объем
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
}

export default Flow1Settings;