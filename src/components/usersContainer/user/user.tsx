import React from "react";
import avatar from "./../../../assets/img/ava.png";
import editPen from "./../../../assets/img/edit_pen.svg";
import deleteIcon from "./../../../assets/img/delete_min.svg";


const User: React.FunctionComponent = () => {
  return <div className="users-container__user user">
    <div className="user__logo">
      <img src={avatar} alt=""/>
    </div>
    <div className="user__name">
      <span>Andrew</span>
    </div>
    <div className="user__role">
      <span>admin</span>
    </div>
    <div className="user__space"></div>
    <div className="user__reset-password btn">
      <button>Сбросить пароль</button>
    </div>
    <div className="user__edit">
      <img src={editPen} alt=""/>
    </div>
    <div className="user__delete">
      <img src={deleteIcon} alt=""/>
    </div>
  </div>
}
export default User