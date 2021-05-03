import {loginData, sendUserData, user} from "../../api/types";

const AUTH_LOGIN = "AUTH_LOGIN";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const AUTH_CREATE_USER = "AUTH_CREATE_USER";
const AUTH_ME = "AUTH_ME";
const AUTH_UPDATE_ME = "AUTH_UPDATE_ME";

interface IAuthState {
  user: user | null,
  isFetching: boolean,
  errorMessage: String | null
}

interface IAction {
  type: String
  data?: loginData | sendUserData | user
}


const initialState: IAuthState = {
  user: null,
  isFetching: false,
  errorMessage: null
}

const authReducer = (state: IAuthState = initialState, action: IAction): IAuthState => {
  switch (action.type) {
    case AUTH_LOGIN:
      return state;
    case AUTH_LOGOUT:
      return state;
    case AUTH_CREATE_USER:
      return state;
    case AUTH_ME:
      return state;
    case AUTH_UPDATE_ME:
      return state;
    default:
      return state
  }
}