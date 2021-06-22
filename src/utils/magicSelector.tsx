import React, {useState} from "react";
import style from "./magicSelector.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";


type dataSendMagicSelectorType = (deviceParamName: string, value: number) => void

export type magicSelectorPropsType = {
  deviceName: string,
  paramName: string,
  currentValue: number,
  dataSendCallback: dataSendMagicSelectorType,
  valueStrings: Array<string>
}


const MagicSelector: React.FunctionComponent<magicSelectorPropsType> = (props) => {

  const fetchingArray = useSelector((state: RootState) => state.buttons);

  const optionsMap = props.valueStrings.map((item, index) => <option value={String(index)}>{item}</option>);

  const onClose = (e: React.FocusEvent<HTMLSelectElement>) => {
    let value = Number(e.currentTarget.value);
    if (value !== props.currentValue)
      props.dataSendCallback(props.paramName, value);
  }

  let selectorClass = style.selector_wrapper;
  if (fetchingArray.buttons.some(item => item === `${props.deviceName} ${props.paramName}`)) {
    selectorClass += ` ${style.selector_wrapper_fetching}`
  } else {
    selectorClass.replace(` ${style.selector_wrapper_fetching}`, "");
  }

  return <div className={selectorClass}>
    <select defaultValue={props.currentValue}
            disabled={fetchingArray.buttons.some(item => item == `${props.deviceName} ${props.paramName}`)}
            onBlur={onClose}>
      {optionsMap}
    </select>
  </div>
}

export default MagicSelector;