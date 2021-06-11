import {createAction, createReducer} from "@reduxjs/toolkit";

export const ERRORS_USERS = "errors/users"
export const ERRORS_CREATE_USER = "errors/createUser"
export const ERRORS_UPDATE_USER = "errors/updateUser"

export type error = {
  source: String,
  message: String
}

type errorsState = {
  errors: Array<error>};

export const addError = createAction<error>("errors/add");
export const deleteErrors = createAction("errors/delete");
export const filterDelete = createAction<String>("errors/filterDelete");

const initialState: errorsState = { errors: []};

const errorsReducer = createReducer(initialState, (builder) => {
  builder.addCase(addError, (state, action) => {
    state.errors.push(action.payload);
  })
      .addCase(deleteErrors, (state, action) => {
        state.errors = [];
      })
      .addCase(filterDelete, (state, action) => {

        state.errors = state.errors.filter((value) =>
            value.source !== action.payload
        )
      })
})

export default errorsReducer;

