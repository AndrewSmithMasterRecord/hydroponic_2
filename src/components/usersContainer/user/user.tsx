import React from "react";
import avatar from "./../../../assets/img/ava.png";
import editPen from "./../../../assets/img/edit_pen.svg";
import deleteIcon from "./../../../assets/img/delete_min.svg";
import {user} from "../../../api/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

export type userPropType = {
  user: user
}

const User: React.FunctionComponent<userPropType> = (props) => {
 const userId = useSelector((state: RootState) => state.auth.user?._id)

  return <div className="users-container__user user">
    <div className="user__logo">
      <img src={avatar} alt="avatar"/>
    </div>
    <div className="user__name">
      <span>{props.user.name}</span>
    </div>
    <div className="user__role">
      <span>{props.user.role}</span>
    </div>
    <div className="user__space"></div>
    <div className="user__reset-password btn">
      <button>Сбросить пароль</button>
    </div>
    <div className="user__edit">
      <img src={editPen} alt=""/>
    </div>
    {(userId !== props.user._id || !(props.user.role === "admin")) && <div className="user__delete">
      <img src={deleteIcon} alt=""/>
    </div>}
  </div>
}
export default User