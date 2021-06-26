import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getTrendsAJAX} from "../../redux/trends/trendsReducer";
import style from "./trendsContainer.module.css";
import Trend from "./trend/trend";

const TrendsContainer: React.FunctionComponent = () => {
  const [date, dateSet] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const trends = useSelector((state: RootState) => state.trends);
  const dispatch = useDispatch();

  const onOpen = () => {
    setOpenCalendar(true);
  }
  const onClose = () => {
    setOpenCalendar(false)
  }
  const changeDate = (date: Date) => {
    dateSet(date);
    setOpenCalendar(false);
    dispatch(getTrendsAJAX(date));
  }

  useEffect(() => {
    dispatch(getTrendsAJAX(date))
  }, [dispatch])
  return <div style={{width: "100%"}}>
    <div className={style.openCalendar}>
      {openCalendar ? <div className={style.openIcon} onClick={onClose}>
        {"<"}
      </div> : <div className={style.openIcon} onClick={onOpen}>
        {">"}
      </div>}
    </div>

    {openCalendar && <Calendar onChange={changeDate} value={date}/>}


    {trends.data.length!==0 && <Trend trend={trends} minValue={0} maxValue={60}
           trendDate={date.toLocaleDateString()} name={"Температура"}
           paramName={"temperature"}/>}
    {trends.data.length!==0 &&<Trend trend={trends} minValue={0} maxValue={100}
           trendDate={date.toLocaleDateString()} name={"Влажность"}
           paramName={"humidity"}/>}
    {trends.data.length!==0 &&<Trend trend={trends} minValue={0} maxValue={14}
           trendDate={date.toLocaleDateString()} name={"pH"}
           paramName={"pH"}/>}


  </div>
}

export default TrendsContainer;