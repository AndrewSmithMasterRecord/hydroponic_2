import React from "react";

const UserCreater:React.FunctionComponent = () => {
  return <div className="users-container__users-creater">
    <div className="users-container__creater-box creater-box">
      <div className="creater-box__hello">
        <span>Создать нового пользователя</span>
      </div>
      <form action="#" className="creater-box__form form">
        <div className="form__group">
          <label htmlFor="name" className="form__label">Имя</label>
          <input type="text" className="form__input"/>
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__label">Пароль</label>
          <input type="password" className="form__input"/>
        </div>
        <div className="form__group">
          <label htmlFor="passwor_confirm" className="form__label">Подтверждение пароля</label>
          <input type="password" className="form__input"/>
        </div>
        <div className="form__button btn">
          <button>Создать</button>
        </div>
      </form>
    </div>
  </div>
}
export default UserCreater;