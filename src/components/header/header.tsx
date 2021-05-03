import React from "react";
import avatar from "./../../assets/img/ava.png";
import logoImg from "./../../assets/img/admin_brown.svg";

const Header:React.FunctionComponent = () => {
  return <header className="header">
    <div className="header__content">
      <div className="header__logo">Гидропоника</div>
      <div className="header__media"></div>
      <div className="header__user-block user-block">
        <div className="user-block__date">
          <div><span>12:44</span></div>
          <div><span>12-дек-21</span></div>
        </div>
        <div className="user-block__logocontainer">
          <div className="user-block__logo">
            <img src={avatar} alt="аватар"/>
          </div>
          <div className="user-block__role">
            <img src={logoImg} alt="роль"/>
          </div>
        </div>
        <div className="user-block__name">
          <span>Andrew</span>
        </div>
        <div className="user-block__login-button btn">
          <button>Выйти</button>
        </div>
      </div>
    </div>
  </header>
}
export default Header;