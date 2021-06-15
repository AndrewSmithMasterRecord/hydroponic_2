import {createAction, createReducer} from "@reduxjs/toolkit";
import {user} from "../../api/types";
import usersAPI from "../../api/users";
import {
  addError,
  ERRORS_UPDATE_USER,
  ERRORS_UPDATE_USER_PASS,
  ERRORS_USERS,
  filterDelete
} from "../errors/errorsReducer";
import {updateUser, updateUserPassword} from "../../api/usersTypes";
import {
  addButtonToBlockList,
  BUTTONS_DELETE_USER,
  BUTTONS_UPDATE_PASS,
  BUTTONS_UPDATE_USER,
  filterDeleteButtonsBlock
} from "../buttons/buttonsReducer";


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
const updateStateUser = createAction<user>("users/updateUser");
const deleteStateUser = createAction<String>("users/deleteUser");

const usersReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFetching, (state, action) => {
    state.isFetching = action.payload;
  })
      .addCase(setUsers, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateStateUser, (state, action) => {
        state.users.find((value, i) => {
          if (value._id === action.payload._id)
            state.users[i] = action.payload
        })
      })
      .addCase(deleteStateUser, (state, action) => {
        state.users = state.users.filter(item => item._id !== action.payload);
      })
})

export const getAllUsersAJAX = () => async (dispatch: any) => {
  try {
    dispatch(setFetching(true));
    const users = await usersAPI.getAll();
    dispatch(setUsers(users.data.data));
    dispatch(setFetching(false));
  } catch (error) {
    dispatch(setFetching(false));
    if (error.response)
      dispatch(addError({source: ERRORS_USERS, message: error.response.data.message}))
  }
}

export const updateUserAJAX = (id: String, data: updateUser, closeDialog: () => void) => async (dispatch: any) => {
  try {
    dispatch(filterDelete(ERRORS_UPDATE_USER));
    dispatch(addButtonToBlockList(BUTTONS_UPDATE_USER))
    const response = await usersAPI.updateById(id, data);
    dispatch(updateStateUser(response.data.data));

    dispatch(filterDeleteButtonsBlock(BUTTONS_UPDATE_USER));
    closeDialog();
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_UPDATE_USER, message: error.response.data.message}));
    dispatch(filterDeleteButtonsBlock(BUTTONS_UPDATE_USER));
  }
}

export const deleteUserAJAX = (id: String) => async (dispatch: any) => {
  dispatch(addButtonToBlockList(BUTTONS_DELETE_USER));
  await usersAPI.deleteById(id);
  dispatch(deleteStateUser(id));
  dispatch(filterDeleteButtonsBlock(BUTTONS_DELETE_USER));
}

export const updateUserPassAJAX = (id: String, data: updateUserPassword, closeDialog: () => void) => async (dispatch: any) => {
  try {
    dispatch(addButtonToBlockList(BUTTONS_UPDATE_PASS));
    await usersAPI.updatePassword(id, data);
    dispatch(filterDeleteButtonsBlock(BUTTONS_UPDATE_PASS));
    closeDialog();
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_UPDATE_USER_PASS, message: error.response.data.message}));
    dispatch(filterDeleteButtonsBlock(BUTTONS_UPDATE_PASS));
  }
}


export default usersReducer;