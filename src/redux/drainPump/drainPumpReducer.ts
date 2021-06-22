import {createAction, createReducer} from "@reduxjs/toolkit";

import devicesAPI from "../../api/devices";
import {addError, ERRORS_DRAIN} from "../errors/errorsReducer";
import {addButtonToBlockList, filterDeleteButtonsBlock} from "../buttons/buttonsReducer";
import {
  drainPumpControlType,
  drainPumpSetControlType,
  drainViewType,
  IDrainPumpControl,
  IDrainPumpView
} from "../../api/drainPumpDeviceTypes";
import {AppDispatch} from "../store";

type drainPumpStateType = {
  view: drainViewType,
  control: drainPumpControlType,
}

export const setDrainView = createAction<drainViewType>("drainPump/getView");
export const setDrainControl = createAction<drainPumpControlType>("drainPump/setControl");

const stateInit: drainPumpStateType = {
  view: {
    state: 0,
    timer: 0,
    performance: 0,
    error: 0,
    isBlocking: 0
  },
  control: {
    power: 0,
    levelOn: 0,
    timerOn: 0,
    flowControl: 0,
    jobPerformance: 0,
    dMaxPerformance: 0,
    dMinPerformance: 0,
    resetError: 0,
    block: 0,
    manualMode: 0,
    manualOn: 0
  }
}

const drainPumpReducer = createReducer(stateInit, builder => {
  builder.addCase(setDrainView, (state, action) => {
    state.view = action.payload;
  })
      .addCase(setDrainControl, (state, action) => {
        state.control = action.payload;
      })
})

const drainApi = new devicesAPI("drain");

export const drainGetViewAJAX = () => async (dispatch: any) => {
  try {
    const response = await drainApi.getView<IDrainPumpView>();
    dispatch(setDrainView(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_DRAIN, message: error.response.data.message}));
  }
}

export const drainGetControlAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await drainApi.getControl<IDrainPumpControl>();
    dispatch(setDrainControl(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_DRAIN, message: error.response.data.message}));
  }
}

export const setDrainControlAJAX = (data: drainPumpSetControlType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addButtonToBlockList(`drain ${Object.keys(data)[0]}`));
    const response = await drainApi.setControlValue<drainPumpSetControlType, IDrainPumpControl>(data);
    dispatch(setDrainControl(response.data));
    dispatch(filterDeleteButtonsBlock(`drain ${Object.keys(data)[0]}`))
  } catch (error) {
    if (error.response)
      dispatch(filterDeleteButtonsBlock(`drain ${Object.keys(data)[0]}`))
    dispatch(addError({source: ERRORS_DRAIN, message: error.response.data.message}));
  }
}


export default drainPumpReducer;