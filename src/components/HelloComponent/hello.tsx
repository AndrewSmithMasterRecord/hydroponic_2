import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {loginData} from "../../api/types";
import {useDispatch, useSelector} from "react-redux";
import {getMe, loginMe} from "../../redux/authentication/authenticationReducer";
import {RootState} from "../../redux/store"
import styles from "./Hello.module.css";
import {useHistory} from "react-router-dom";

const Hello: React.FunctionComponent = () => {

  const {register, handleSubmit} = useForm<loginData>();
  const {user, errorMessage, isFetching} = useSelector((state: RootState) => state.auth);
  const blockButton = !isFetching ? "form__button btn" : "form__button btn btn_block";
  const dispatch = useDispatch();
  const onSubmit = handleSubmit((data) => {
    dispatch(loginMe(data));
  })
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])
  const history = useHistory();

  if (user){
    history.push("/devices");
  }

  return <div className="login-wrapper">
    <div className="login-wrapper__container">
      <div className="login-wrapper__hello">
        <span>Войдите чтобы продолжить.</span>
      </div>
      <div className="login-wrapper__form">
        <form action="#" className="login-wrapper__form form" onSubmit={onSubmit}>
          <div className="form__group">
            <label htmlFor="name" className="form__label">Имя</label>
            <input type="text" className="form__input" placeholder="Имя" {...register("name")}/>
            <small className="form__prompt">Введите Ваше имя.</small>
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">Пароль</label>
            <input type="password" className="form__input" placeholder="Пароль" {...register("password")}/>
            <small className="form__prompt">Введите Ваш пароль.</small>
          </div>
          {errorMessage && <div className={styles.errorMessage}>
            <div className={styles.errorElement}>
              <span>{errorMessage}</span>
            </div>
          </div>}
          <div className={blockButton}>
            <button type="submit" disabled={isFetching}>Отправить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
}

export default Hello;