import React, {useRef, useState} from "react";
import settingsIcon from "../../../assets/img/settings.svg";
import closeIcon from "../../../assets/img/close.svg";

type dragNDropType = {
  startX: number,
  startY: number,
  oldLeft: number,
  oldTop: number
}

const DeviceFooter: React.FunctionComponent = (props) => {
  const configDialogRef = useRef<HTMLDivElement>(null);
  const openConfig = () => {
    if (configDialogRef.current) {
      configDialogRef.current.className += " configMenu_open";
      console.log(configDialogRef.current.clientLeft)
    }

  }
  const closeConfig = () => {
    if (configDialogRef.current) {
      configDialogRef.current.className = "configMenu";
      configDialogRef.current.style.left = "0px";
      configDialogRef.current.style.top = "0px";
    }

  }
  const [dragNDrop, setDragNDrop] = useState<dragNDropType>({startX: 0, startY: 0, oldLeft: 0, oldTop: 0});


  const onDragStartConfig = (e: React.DragEvent<HTMLDivElement>) => {
    setDragNDrop({
      startX: e.pageX, startY: e.pageY,
      oldLeft: Number(e.currentTarget.style.left.replace("px", "")),
      oldTop: Number(e.currentTarget.style.top.replace("px", ""))
    });
  }
  const onDragStopConfig = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.position = "absolute";
    e.currentTarget.style.left = `${e.pageX - dragNDrop.startX + dragNDrop.oldLeft}px`;
    e.currentTarget.style.top = `${e.pageY - dragNDrop.startY + dragNDrop.oldTop}px`;
  }


  return <>
    <div className="device__footer">
      <div className="device__signals">
        <div className="device__footer-divider"></div>
        <div className="device__signal-message">
          <span>Авария насоса</span>
        </div>
      </div>
      <div className="device__settings" onClick={openConfig}>
        <img src={settingsIcon} alt=""/>
      </div>
    </div>

    <div className="configMenu" ref={configDialogRef} draggable={true}
         onDragStart={onDragStartConfig}
         onDragEnd={onDragStopConfig}
         onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
           e.preventDefault()
         }}>
      <div className="configMenu__header">
        <div className="configMenu__closeIcon" >
          <img src={closeIcon} onClick={closeConfig}/>
        </div>
      </div>

      <div className="configMenu__inputsContainer">
        {props.children}
      </div>
    </div>
  </>
}

export default DeviceFooter;