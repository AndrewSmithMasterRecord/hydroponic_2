import React, {useState} from "react";
import avatar from "./../../../assets/img/ava.png";
import editPen from "./../../../assets/img/edit_pen.svg";
import deleteIcon from "./../../../assets/img/delete_min.svg";
import {user} from "../../../api/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import UserDialogsModal from "./userDialogsModal/userDialogsModal";
import UserEditDialog from "./userEditDialog/userEditDialog";

export type userPropType = {
  user: user
}

type stateType = {
  openEditModal: boolean
}


const User: React.FunctionComponent<userPropType> = (props) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [state, setState] = useState<stateType>({openEditModal: false})

  const onClickEdit = () => {
    setState({openEditModal: true})
  }

  const closeModal = () => {
    setState({openEditModal: false})
  }

  return <div className="users-container__user user">
    {state.openEditModal && <UserDialogsModal>
      <UserEditDialog user={props.user} closeDialog={closeModal}/>
    </UserDialogsModal>}
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
    <div className="user__edit" onClick={onClickEdit}>
      <img src={editPen} alt=""/>
    </div>
    {(userId !== props.user._id || !(props.user.role === "admin")) && <div className="user__delete">
      <img src={deleteIcon} alt=""/>
    </div>}
  </div>
}
export default User