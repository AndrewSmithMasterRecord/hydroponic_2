import React, {useState} from "react";
import style from "./magicInput.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";


type stateType = {
  open: boolean,
  error: string
}

export type dataSendMagicInputType = (deviceParamName: string, value: number) => void

export type magicInputPropsType = {
  deviceName: string,
  paramName: string,
  currentValue: number,
  dataSendCallback: dataSendMagicInputType,
  valueRange: {
    min: number,
    max: number
    digitsAfterZero: number
  }
}


const MagicInput: React.FunctionComponent<magicInputPropsType> = (props) => {

  const fetchingArray = useSelector((state: RootState) => state.buttons);
  const [state, setState] = useState<stateType>({open: false, error: ""});

  let presentationValue: number;

  if (props.valueRange.digitsAfterZero > 0) {
    presentationValue = props.currentValue / Math.pow(10, props.valueRange.digitsAfterZero);
  } else {
    presentationValue = props.currentValue
  }

  const onOpen = () => {
    if (fetchingArray.buttons.some(item => item === `${props.deviceName} ${props.paramName}`))
      return;

    setState({open: true, error: ""});
  }
  const onClose = (e: React.FocusEvent<HTMLInputElement>) => {
    setState({...state, open: false})
    let value;
    if (e.currentTarget.value === "") {
      value = 0;
    } else {
      value = Math.floor(Number(e.currentTarget.value) * Math.pow(10, props.valueRange.digitsAfterZero));
      if (isNaN(value)) {
        value = 0;
      }
    }
    if (value > (props.valueRange.max * Math.pow(10, props.valueRange.digitsAfterZero)) ||
        value < (props.valueRange.min * Math.pow(10, props.valueRange.digitsAfterZero))) {
      setState({
        open: false,
        error: `Значение за пределами диапазона ${props.valueRange.min} ... ${props.valueRange.max}!`
      });
      return;
    }
    props.dataSendCallback(props.paramName, value);
  }
  let errorClass = state.error !== "" ? `${style.input_wrapper} ${style.input_error}` : `${style.input_wrapper}`;
  if (fetchingArray.buttons.some(item => item === `${props.deviceName} ${props.paramName}`)) {
    errorClass += ` ${style.input_wrapper_fetching}`
  } else {
    errorClass.replace(` ${style.input_wrapper_fetching}`, "");
  }
  const errorContainer = state.error !== "" ? style.container_error : "";

  return <div className={errorContainer}>
    <div className={errorClass}>
      {!state.open ? <span onClick={onOpen}>{presentationValue}</span> :
          <input type={"number"} autoFocus={true} onBlur={onClose}/>}
    </div>
    <div className={style.error_message} style={{display: state.error !== "" ? "block" : "none"}}>
      <span>{state.error}</span>
    </div>
  </div>
}

export default MagicInput;