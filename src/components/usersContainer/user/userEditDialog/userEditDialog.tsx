import React from "react";
import {user} from "../../../../api/types";
import {useForm} from "react-hook-form";
import {updateUser} from "../../../../api/usersTypes";
import {ErrorMessage} from "@hookform/error-message";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {filterButtonsFetching} from "../../../../redux/buttons/buttonsFetchingSelector";
import {BUTTONS_UPDATE_USER} from "../../../../redux/buttons/buttonsReducer";
import {updateUserAJAX} from "../../../../redux/users/usersReducer";
import {selectTypedErrors} from "../../../../redux/errors/errorsSelector";
import {ERRORS_UPDATE_USER} from "../../../../redux/errors/errorsReducer";
import style from "./userEditDialog.module.css"

export type propsUserEditType = {
  user: user,
  closeDialog: () => void
}

const UserEditDialog: React.FunctionComponent<propsUserEditType> = (props) => {

  const {register, handleSubmit, formState: {errors}} = useForm<updateUser>();
  const updateButtonBlock = useSelector((state: RootState) =>
      filterButtonsFetching(state.buttons, BUTTONS_UPDATE_USER));
  let blockButton: String;
  updateButtonBlock.length !== 0 ? blockButton = "btn_block" : blockButton = "";

  const responseErrors = useSelector((state: RootState) => selectTypedErrors(state, ERRORS_UPDATE_USER));

  const dispatch = useDispatch();
  const onSubmit = (data: updateUser) => {
    dispatch(updateUserAJAX(props.user._id, data, props.closeDialog));
  }


  return <div className="popup-wrapper__container">
    <div className="popup-wrapper__hello">
      <div>
        <span>Редактор пользователя.</span>
      </div>
      <br></br>
      <p style={{fontStyle: "italic", color: "#f59525"}}>{props.user.name}</p>
    </div>
    <div className="popup-wrapper__form">
      <form className="popup-wrapper__form form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <label htmlFor="name" className="form__label">Имя</label>
          <input type="text" className="form__input"
                 defaultValue={props.user.name} {...register("name", {required: "Поле не должно быть пустым"})}/>
          <ErrorMessage name={"name"} errors={errors}
                        render={({message}) => <span style={{color: "red"}}>{message}</span>}/>
        </div>
        <div className="form__group">
          <label htmlFor="role" className="form__label">Роль</label>
          <select className="form__selector" defaultValue={props.user.role} {...register("role")}>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </div>
        <div className={style.errorMessage}>
          <span>{responseErrors.length !== 0 ? responseErrors[0].message : ""}</span>
        </div>
        <div className="form__buttons-container">
          <div className={`form__button btn btn_green ${blockButton}`}>
            <button type="submit" disabled={updateButtonBlock.length !== 0 ? true : false}>Отправить</button>
          </div>
          <div className="form__button btn btn_red">
            <button onClick={props.closeDialog}>Отклонить</button>
          </div>
        </div>
      </form>
    </div>
  </div>

}

export default UserEditDialog;