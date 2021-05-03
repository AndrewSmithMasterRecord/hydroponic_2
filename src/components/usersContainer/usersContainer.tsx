import React from "react";
import UserCreater from "./userCreater/userCreater";
import User from "./user/user";

const UsersContainer: React.FunctionComponent = () => {
  return <div className="content-wrapper users-container">
    <div className="users-container__users">
      <User/>
      <User/>
    </div>
    <UserCreater/>
  </div>
}
export default UsersContainer