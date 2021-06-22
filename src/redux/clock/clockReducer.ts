import {createAction, createReducer} from "@reduxjs/toolkit";

import devicesAPI from "../../api/devices";
import {addError, ERRORS_CLOCK} from "../errors/errorsReducer";
import {addButtonToBlockList, filterDeleteButtonsBlock} from "../buttons/buttonsReducer";
import {
  clockControlSetType,
  clockControlType,
  clockViewType,
  IClockControl,
  IClockView
} from "../../api/clockDeviceTypes";
import { AppDispatch } from "../store";

type clockStateType = {
  view: clockViewType,
  control: clockControlType,
}

export const setClockView = createAction<clockViewType>("clock/getView");
export const setClockControl = createAction<clockControlType>("clock/setControl");

const stateInit: clockStateType = {
  view: {
    hours: 0,
    minutes: 0
  },
  control: {
    hoursSet: 0,
    minutesSet: 0
  }
}

const clockReducer = createReducer(stateInit, builder => {
  builder.addCase(setClockView, (state, action) => {
    state.view = action.payload;
  })
      .addCase(setClockControl, (state, action) => {
        state.control = action.payload;
      })
})

const clockApi = new devicesAPI("clock");

export const clockGetViewAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await clockApi.getView<IClockView>();
    dispatch(setClockView(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_CLOCK, message: error.response.data.message}));
  }
}

export const controlGetControlAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await clockApi.getControl<IClockControl>();
    dispatch(setClockControl(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_CLOCK, message: error.response.data.message}));
  }
}


export const setClockControlAJAX = (data: clockControlSetType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addButtonToBlockList(`clock ${Object.keys(data)[0]}`));
    const response = await clockApi.setControlValue<clockControlSetType, IClockControl>(data);
    dispatch(setClockControl(response.data));
    dispatch(filterDeleteButtonsBlock(`clock ${Object.keys(data)[0]}`))
  } catch (error) {
    if (error.response)
      dispatch(filterDeleteButtonsBlock(`clock ${Object.keys(data)[0]}`))
    dispatch(addError({source: ERRORS_CLOCK, message: error.response.data.message}));
  }
}



export default clockReducer;