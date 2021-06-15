import {createAction, createReducer} from "@reduxjs/toolkit";
import {IPumpView, pumpConfigType, pumpControlType, pumpViewType} from "../../api/devicesTypes";
import devicesAPI from "../../api/devices";
import {addError, ERRORS_PUMP, ERRORS_UPDATE_USER_PASS} from "../errors/errorsReducer";

type pumpStateType = {
  view: pumpViewType,
  control: pumpControlType,
  config: pumpConfigType
}

export const setPumpView = createAction<pumpViewType>("pump/getView");
export const setPumpConfig = createAction<pumpConfigType>("pump/setConfig");
export const setPumpControl = createAction<pumpControlType>("pump/setControl");

const stateInit: pumpStateType = {
  view: {
    state: 0,
    timer: 0,
    performance: 0,
    error: 0,
    isBlocking: 0
  },
  control: {
    power: 0,
    timerOn: 0,
    timerOff: 0,
    flowControl: 0,
    jobPerformance: 0,
    dMaxPerformance: 0,
    dMinPerformance: 0,
    resetError: 0,
    block: 0,
    manualMode: 0,
    manualOn: 0
  },
  config: {
    mode: 0
  }
}

const pumpReducer = createReducer(stateInit, builder => {
  builder.addCase(setPumpView, (state, action) => {
    state.view = action.payload;
  })
      .addCase(setPumpConfig, (state, action) => {
        state.config = action.payload;
      })
      .addCase(setPumpControl, (state, action) => {
        state.control = action.payload;
      })
})

const pumpApi = new devicesAPI("pump");

export const pumpGetViewAJAX = () => async (dispatch: any) => {
  try {
    const response = await pumpApi.getView<IPumpView>();
    dispatch(setPumpView(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_PUMP, message: error.response.data.message}));
  }
}


export default pumpReducer;