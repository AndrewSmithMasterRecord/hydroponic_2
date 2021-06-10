import React from "react";


const UserEditDialog: React.FunctionComponent = () => {
  return <div className="popup-wrapper__container">
      <div className="popup-wrapper__hello">
        <span>Редактор пользователя.</span>
      </div>
      <div className="popup-wrapper__form">
        <form action="#" className="popup-wrapper__form form">
          <div className="form__group">
            <label htmlFor="name" className="form__label">Имя</label>
            <input type="text" className="form__input" placeholder="Имя"/>
          </div>
          <div className="form__group">
            <label htmlFor="role" className="form__label">Роль</label>
            <select className="form__selector">
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
          <div className="form__buttons-container">
            <div className="form__button btn btn_green">
              <button type="submit">Отправить</button>
            </div>
            <div className="form__button btn btn_red">
              <button>Отклонить</button>
            </div>
          </div>
        </form>
      </div>
    </div>

}


// const UserEditModal: React.FunctionComponent = (props) => {
//   return ReactDOM.createPortal(props.children, contentContainer)
// }

export default UserEditDialog;