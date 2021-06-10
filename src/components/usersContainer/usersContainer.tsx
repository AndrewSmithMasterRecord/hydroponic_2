import React, {useEffect} from "react";
import UserCreater from "./userCreater/userCreater";
import User from "./user/user";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getAllUsersAJAX} from "../../redux/users/usersReducer";

const UsersContainer: React.FunctionComponent = () => {
  const {users, isFetching} = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersAJAX())
  }, [dispatch]);

  const usersMap = users.map((element, index) => <User user={element} key={index}/>);

  return <div className="content-wrapper users-container" >

    <div className="users-container__users">
      {usersMap}
    </div>
    <UserCreater/>
    {/*<div id={"contentModal"} className="popup-wrapper"></div>*/}

  </div>
}
export default UsersContainer