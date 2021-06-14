import React from "react";
import {propsUserEditType} from "../userEditDialog/userEditDialog";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {filterButtonsFetching} from "../../../../redux/buttons/buttonsFetchingSelector";
import {BUTTONS_DELETE_USER} from "../../../../redux/buttons/buttonsReducer";
import style from "./userDeleteDialog.module.css"
import {deleteUserAJAX} from "../../../../redux/users/usersReducer";

const UserDeleteDialog: React.FunctionComponent<propsUserEditType> = (props) => {

  const updateButtonBlock = useSelector((state: RootState) =>
      filterButtonsFetching(state.buttons, BUTTONS_DELETE_USER));
  let blockButton: String;
  updateButtonBlock.length !== 0 ? blockButton = "btn_block" : blockButton = "";


  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(deleteUserAJAX(props.user._id));
    props.closeDialog();
  }

  return <div className={style.container}>
    <div className={style.hello}>
      <div>
        <span>Вы уверены, что хотите удалить пользователя:</span>
      </div>
      <br></br>
      <p style={{fontStyle: "italic", color: "#f59525"}}>{props.user.name}</p>
    </div>
    <div className={style.buttonsContainer}>
      <div className={`form__button btn ${style.button_green} ${blockButton}`}>
        <button type="submit" onClick={onClick}>Да</button>
      </div>
      <div className={`form__button btn ${style.button_red}`}>
        <button onClick={props.closeDialog} disabled={updateButtonBlock.length !== 0? true: false}>Нет</button>
      </div>
    </div>
  </div>
}

export default UserDeleteDialog;