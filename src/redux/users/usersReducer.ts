import {createAction, createReducer} from "@reduxjs/toolkit";
import {user} from "../../api/types";
import usersAPI from "../../api/users";
import {addError, ERRORS_UPDATE_USER, ERRORS_USERS} from "../errors/errorsReducer";
import {updateUser} from "../../api/usersTypes";


export type usersStateType = {
  users: Array<user>,
  isFetching: boolean,
  buttonsBlockList: Array<String>
}

const initialState: usersStateType = {
  users: [],
  isFetching: false,
  buttonsBlockList: []
}

const setUsers = createAction<Array<user>>("users/setUsers");
const setFetching = createAction<boolean>("users/setFetching");
const addButtonToBlockList = createAction<String>("users/setButtonBlock");
const removeButtonFromBlockList = createAction<String>("users/removeButtonBlock");

const usersReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFetching, (state, action) => {
    state.isFetching = action.payload;
  })
      .addCase(setUsers, (state, action) => {
        state.users = action.payload;
      })
})

export const getAllUsersAJAX = () => async (dispatch: any) => {
  try{
    dispatch(setFetching(true));
    const users = await usersAPI.getAll();
    dispatch(setUsers(users.data.data));
    dispatch(setFetching(false));
  }catch (error) {
    dispatch(setFetching(false));
    if(error.response)
    dispatch(addError({source: ERRORS_USERS, message: error.response.data.message}))
  }
}

export const updateUserAJAX = (id: String, data: updateUser) => async (dispatch: any) => {
  try{
    await usersAPI.updateById(id, data);
  } catch (error) {
    if(error.response)
      dispatch(addError({source: ERRORS_UPDATE_USER, message: error.response.data.message}))
  }
}


export default usersReducer;