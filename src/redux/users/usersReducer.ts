import {createAction, createReducer} from "@reduxjs/toolkit";
import {user} from "../../api/types";
import usersAPI from "../../api/users";
import {addError, ERRORS_USERS} from "../errors/errorsReducer";
import {catchAsync} from "../../utils/utils";


export type usersStateType = {
  users: Array<user>,
  isFetching: boolean
}

const initialState: usersStateType = {
  users: [],
  isFetching: false
}

const setUsers = createAction<Array<user>>("users/setUsers");
const setFetching = createAction<boolean>("users/setFetching");

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


export default usersReducer;