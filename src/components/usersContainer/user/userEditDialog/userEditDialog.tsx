import React from "react";
import {user} from "../../../../api/types";
import {useForm} from "react-hook-form";
import {updateUser} from "../../../../api/usersTypes";
import {ErrorMessage} from "@hookform/error-message";

export type propsUserEditType = {
  user: user,
  closeDialog: () => void
}

const UserEditDialog: React.FunctionComponent<propsUserEditType> = (props) => {

  const {register, handleSubmit, formState: {errors}} = useForm<updateUser>();

  const onSubmit = (data: updateUser) => {
    alert(`${data.name} ${data.role}`)
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
                 placeholder="Имя" {...register("name", {required: "Поле не должно быть пустым"})}/>
          <ErrorMessage name={"name"} errors={errors}
                        render={({message}) => <span style={{color: "red"}}>{message}</span>}/>
        </div>
        <div className="form__group">
          <label htmlFor="role" className="form__label">Роль</label>
          <select className="form__selector" {...register("role")}>
            {props.user.role === "admin" ? <option selected={true} value="admin">admin</option> :
                <option value="admin">admin</option>}
            {props.user.role === "user" ? <option selected={true} value="user">user</option> :
                <option value="user">user</option>}
          </select>
        </div>
        <div className="form__buttons-container">
          <div className="form__button btn btn_green">
            <button type="submit">Отправить</button>
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