import React from "react";
import {NavLink} from "react-router-dom";

const Navbar: React.FunctionComponent = () => {
  return <nav className="nav-wrapper nav">
    <ul className="nav__ul">
      <li className="nav__li">
        <NavLink to={"/devices"} activeClassName={"nav__li_active"} className={"nav__link home-icon"}>
          <div className="nav__link-text">Домой</div>
        </NavLink>
      </li>
      <li className="nav__li ">
        <a href="#" className="nav__link reports-icon">
          <div className="nav__link-text">Отчеты</div>
        </a>
      </li>
      <li className="nav__li ">
        <a href="#" className="nav__link galery-icon">
          <div className="nav__link-text">Галерея</div>
        </a>
      </li>
    </ul>
    <div className="nav__admin-nav">
      <div className="nav__border-line"></div>
      <ul className="nav__ul">
        <li className="nav__li">
          <NavLink to={"/users"} className={"nav__link users-icon"} activeClassName={"nav__li_active"}>
            <div className="nav__link-text">Пользователи</div>
          </NavLink>
        </li>
        <li className="nav__li ">
          <a href="#" className="nav__link settings-icon">
            <div className="nav__link-text">Настройки</div>
            <div className="nav__sublist-icon_down"></div>
          </a>
        </li>
        <ul className="nav__ul nav__ul_hide">
          <li className="nav__li nav__li-sub">
            <a href="#" className="nav__link-sub">
              <div className="nav__link-text">Насос 1</div>
            </a>
          </li>
          <li className="nav__li nav__li-sub">
            <a href="#" className="nav__link-sub">
              <div className="nav__link-text">Насос 2</div>
            </a>
          </li>
          <li className="nav__li nav__li-sub">
            <a href="#" className="nav__link-sub">
              <div className="nav__link-text">Дренаж</div>
            </a>
          </li>
          <li className="nav__li nav__li-sub">
            <a href="#" className="nav__link-sub">
              <div className="nav__link-text">Освещение</div>
            </a>
          </li>
          <li className="nav__li nav__li-sub">
            <a href="#" className="nav__link-sub">
              <div className="nav__link-text">Вентиляция</div>
            </a>
          </li>
        </ul>
      </ul>
    </div>
  </nav>
}
export default Navbar;