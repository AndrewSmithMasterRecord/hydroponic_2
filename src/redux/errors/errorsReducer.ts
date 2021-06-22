import {createAction, createReducer} from "@reduxjs/toolkit";

export const ERRORS_USERS = "errors/users"
export const ERRORS_CREATE_USER = "errors/createUser"
export const ERRORS_UPDATE_USER = "errors/updateUser"
export const ERRORS_UPDATE_USER_PASS = "errors/updateUserPass"
export const ERRORS_PUMP = "errors/pump";
export const ERRORS_DRAIN = "errors/drain";
export const ERRORS_LIGHT = "errors/light";
export const ERRORS_HUMIDITY = "errors/humidity";
export const ERRORS_CLOCK = "errors/clock";
export const ERRORS_FLOW = "errors/flow";
export const ERRORS_VENTILATION = "errors/ventilation";

export type error = {
  source: string,
  message: string
}

type errorsState = {
  errors: Array<error>};

export const addError = createAction<error>("errors/add");
export const deleteErrors = createAction("errors/delete");
export const filterDelete = createAction<string>("errors/filterDelete");

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

