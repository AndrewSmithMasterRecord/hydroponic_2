import {createAction, createReducer} from "@reduxjs/toolkit";

export const BUTTONS_UPDATE_USER = "buttons/updateUser";
export const BUTTONS_DELETE_USER = "buttons/deleteUser";
export const BUTTONS_UPDATE_PASS = "buttons/updatePassword";

export type buttonsStateType = {
  buttons: Array<String>
}

export const addButtonToBlockList = createAction<String>("buttons/add");
export const filterDeleteButtonsBlock = createAction<String>("buttons/filterDelete");


const initialState: buttonsStateType = {
  buttons: []
}

const buttonsReducer = createReducer(initialState, builder => {
  builder.addCase(addButtonToBlockList, (state, action) => {
    state.buttons.push(action.payload);
  })
      .addCase(filterDeleteButtonsBlock, (state, action) => {
        state.buttons = state.buttons.filter(item => item !== action.payload);
      })
})

export default buttonsReducer;