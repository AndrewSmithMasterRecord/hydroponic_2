import React from "react";

const Hello: React.FunctionComponent = () => {
  return <div className="login-wrapper">
    <div className="login-wrapper__container">
      <div className="login-wrapper__hello">
        <span>Войдите чтобы продолжить.</span>
      </div>
      <div className="login-wrapper__form">
        <form action="#" className="login-wrapper__form form">
          <div className="form__group">
            <label htmlFor="name" className="form__label">Имя</label>
            <input type="text" className="form__input" placeholder="Имя"/>
            <small className="form__prompt">Введите Ваше имя.</small>
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">Пароль</label>
            <input type="password" className="form__input" placeholder="Пароль"/>
            <small className="form__prompt">Введите Ваш пароль.</small>
          </div>
          <div className="form__button btn">
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
}

export default Hello;