import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {sendUserData} from "../../../api/types";
import {ErrorMessage} from '@hookform/error-message';
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../../../redux/authentication/authenticationReducer";
import { RootState } from "../../../redux/store";
import {selectTypedErrors} from "../../../redux/errors/errorsSelector";
import {ERRORS_CREATE_USER, filterDelete} from "../../../redux/errors/errorsReducer";
import { getAllUsersAJAX } from "../../../redux/users/usersReducer";

const UserCreater: React.FunctionComponent = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<sendUserData>();
  const dispatch = useDispatch();
  const stateErrors = useSelector((state: RootState) =>{
    return selectTypedErrors(state, ERRORS_CREATE_USER)
  })
  const isFetching = useSelector((state: RootState) => state.auth.isFetching);

  const onSubmit = (data: sendUserData) => {
    dispatch(filterDelete(ERRORS_CREATE_USER));
    dispatch(createUser(data));
    setTimeout(()=>{dispatch(getAllUsersAJAX())}, 300)
  }
  const blockButton = !isFetching ? "form__button btn" : "form__button btn btn_block";

useEffect(() => {dispatch(filterDelete(ERRORS_CREATE_USER));}, [dispatch]);
  return <div className="users-container__users-creater">
    <div className="users-container__creater-box creater-box">
      <div className="creater-box__hello">
        <span>Создать нового пользователя</span>
      </div>
      <form className="creater-box__form form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <label htmlFor="name" className="form__label">Имя</label>
          <input type="text" className="form__input" {...register("name",
              {required: "Поле не должно быть пустым!"})}/>
          <ErrorMessage name={"name"} errors={errors}
                        render={({message}) => <span style={{color: "red"}}> {message} </span>}/>
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__label">Пароль</label>
          <input type="password" className="form__input" {...register("password",
              {required: "Поле не должно быть пустым!"})}/>
          <ErrorMessage name={"password"} errors={errors}
                        render={({message}) => <span style={{color: "red"}}> {message} </span>}/>
        </div>
        <div className="form__group">
          <label htmlFor="passwordConfirm" className="form__label">Подтверждение пароля</label>
          <input type="password" className="form__input" {...register("passwordConfirm",
              {required: "Поле не должно быть пустым!"})}/>
          <ErrorMessage name={"passwordConfirm"} errors={errors}
                        render={({message}) => <span style={{color: "red"}}> {message} </span>}/>
        </div>
        <div style={{textAlign: "center", color: "red"}}>
          <span>{stateErrors.length !== 0 ? stateErrors[0].message : ""}</span>
        </div>
        <div className={blockButton}>
          <button disabled={isFetching}>Создать</button>
        </div>
      </form>
    </div>
  </div>
}
export default UserCreater;