import React from "react";

type propsType = {
  comment: string
}

const ConfigInputGroup:React.FunctionComponent<propsType> = (props) => {
  return <div className="configMenu__inputGroup">
    {props.children}
    <div className="configMenu__inputComment">
      <span>{props.comment}</span>
    </div>
  </div>
}

export default  ConfigInputGroup