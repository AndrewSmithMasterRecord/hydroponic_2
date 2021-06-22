import {loginData, sendUserData, user} from "../../api/types";
import {AnyAction} from "redux";
import authenticationAPI from "../../api/authentication";
import {addError, ERRORS_CREATE_USER} from "../errors/errorsReducer";
import {AppDispatch} from "../store";

const AUTH_LOGOUT = "AUTH_LOGOUT";
const AUTH_CREATE_USER = "AUTH_CREATE_USER";
const AUTH_ME = "AUTH_ME";
const AUTH_UPDATE_ME = "AUTH_UPDATE_ME";
const AUTH_IS_FETCHING = "AUTH_IS_FETCHING";
const AUTH_SET_ERROR = "AUTH_SET_ERROR";

export interface IAuthState {
  user: user | null,
  isFetching: boolean,
  errorMessage: String | null
}


interface IMeAction {
  type: typeof AUTH_ME,
  data: {
    user: user
  }
}

interface ILogoutAction {
  type: typeof AUTH_LOGOUT,
  data: {}
}

interface IUpdateMeAction {
  type: typeof AUTH_UPDATE_ME,
  data: {
    user: user
  }
}

interface IFetchingAction {
  type: typeof AUTH_IS_FETCHING,
  data: {
    isFetching: boolean
  }
}

interface ISetErrorAction {
  type: typeof AUTH_SET_ERROR,
  data: {
    errorMessage: String
  }
}

interface ICreateUserAction {
  type: typeof AUTH_CREATE_USER,
  data: {
    user: user
  }
}

const initialState: IAuthState = {
  user: null,
  isFetching: false,
  errorMessage: null
}

const authReducer = (state: IAuthState = initialState, action: AnyAction): IAuthState => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return {
        ...state, user: null, errorMessage: null
      };
    case AUTH_ME:
      return {
        ...state, user: action.data.user, errorMessage: null
      };
    case AUTH_UPDATE_ME:
      return {
        ...state, user: action.data.user
      };
    case AUTH_IS_FETCHING:
      return {
        ...state, isFetching: action.data.isFetching
      };
    case AUTH_SET_ERROR:
      return {
        ...state, errorMessage: action.data.errorMessage, user: null
      }
    default:
      return state
  }
}

const setMeAC = (data: user) => ({type: AUTH_ME, data: {user: data}} as IMeAction);
const unsetMeAC = () => ({type: AUTH_LOGOUT, data: {}} as ILogoutAction);
const isFetchingAC = (status: boolean): IFetchingAction => ({type: AUTH_IS_FETCHING, data: {isFetching: status}});
const updateMeAC = (data: user) => ({type: AUTH_UPDATE_ME, data: {user: data}} as IUpdateMeAction);
const setErrorAC = (data: string) => ({type: AUTH_SET_ERROR, data: {errorMessage: data}} as ISetErrorAction);

export const loginMe = (login: loginData) => async (dispatch: AppDispatch) => {
  dispatch(isFetchingAC(true));
  try {
    const response = await authenticationAPI.login(login);
    dispatch(setMeAC(response.data.user));
    dispatch(isFetchingAC(false));
  } catch (error) {
    dispatch(isFetchingAC(false));
    if (error.response)
      dispatch(setErrorAC(error.response.data.message))
  }
}

export const getMe = () => async (dispatch: AppDispatch) => {
  const response = await authenticationAPI.me();
  dispatch(setMeAC(response.data.data));
}

export const logoutMe = () => async (dispatch: AppDispatch) => {
  const response = await authenticationAPI.logout();
  dispatch(unsetMeAC());
}

export const createUser = (newUser: sendUserData) => async (dispatch: AppDispatch) => {
  dispatch(isFetchingAC(true));
  try{
    await authenticationAPI.createUser(newUser);
    dispatch(isFetchingAC(false));
  }catch (error){
    dispatch(isFetchingAC(false));
    if(error.response)
      dispatch(addError({source: ERRORS_CREATE_USER, message: error.response.data.message}))
  }
}
export default authReducer;