import React from "react";
import {user} from "../../../../api/types";
import {useForm} from "react-hook-form";
import {updateUserPassword} from "../../../../api/usersTypes";
import {ErrorMessage} from "@hookform/error-message";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {filterButtonsFetching} from "../../../../redux/buttons/buttonsFetchingSelector";
import {BUTTONS_UPDATE_PASS} from "../../../../redux/buttons/buttonsReducer";
import {updateUserPassAJAX} from "../../../../redux/users/usersReducer";
import {selectTypedErrors} from "../../../../redux/errors/errorsSelector";
import {ERRORS_UPDATE_USER_PASS, filterDelete} from "../../../../redux/errors/errorsReducer";
import style from "./userUpdatePassDialog.module.css"

export type propsUserEditType = {
  user: user,
  closeDialog: () => void
}

const UserUpdatePassDialog: React.FunctionComponent<propsUserEditType> = (props) => {

  const {register, handleSubmit, formState: {errors}} = useForm<updateUserPassword>();
  const passChangeButtonBlock = useSelector((state: RootState) =>
      filterButtonsFetching(state.buttons, BUTTONS_UPDATE_PASS));
  let blockButton: String;
  passChangeButtonBlock.length !== 0 ? blockButton = "btn_block" : blockButton = "";

  const responseErrors = useSelector((state: RootState) => selectTypedErrors(state, ERRORS_UPDATE_USER_PASS));

  const dispatch = useDispatch();
  const onSubmit = (data: updateUserPassword) => {
    dispatch(updateUserPassAJAX(props.user._id, data, props.closeDialog));
  }

  return <div className="popup-wrapper__container">
    <div className={style.hello}>
      <div>
        <span>Сброс пароля для пользователя:</span>
      </div>
      <br></br>
      <p style={{fontStyle: "italic", color: "#f59525"}}>{props.user.name}</p>
    </div>
    <div className="popup-wrapper__form">
      <form className="popup-wrapper__form form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <label htmlFor="password" className="form__label">Пароль</label>
          <input type="password" className="form__input"
                 {...register("newPassword", {required: "Поле не должно быть пустым"})}/>
          <ErrorMessage name={"newPassword"} errors={errors}
                        render={({message}) => <span style={{color: "red"}}>{message}</span>}/>
        </div>
        <div className="form__group">
          <label htmlFor="passwordConfirm" className="form__label">Подтверждение пароля</label>
          <input type="password" className="form__input"
                 {...register("newPasswordConfirm", {required: "Поле не должно быть пустым"})}/>
          <ErrorMessage name={"newPasswordConfirm"} errors={errors}
                        render={({message}) => <span style={{color: "red"}}>{message}</span>}/>
        </div>
        <div className={style.errorMessage}>
          <span>{responseErrors.length !== 0 ? responseErrors[0].message : ""}</span>
        </div>
        <div className="form__buttons-container">
          <div className={`form__button btn btn_green ${blockButton}`}>
            <button type="submit" disabled={passChangeButtonBlock.length !== 0 ? true : false}>Отправить</button>
          </div>
          <div className="form__button btn btn_red">
            <button onClick={props.closeDialog}>Отклонить</button>
          </div>
        </div>
      </form>
    </div>
  </div>

}

export default UserUpdatePassDialog;