import {createAction, createReducer} from "@reduxjs/toolkit";

import devicesAPI from "../../api/devices";
import {addError, ERRORS_LIGHT} from "../errors/errorsReducer";
import {addButtonToBlockList, filterDeleteButtonsBlock} from "../buttons/buttonsReducer";
import {
  ILightControl,
  ILightView,
  lightControlSetType,
  lightControlType,
  lightViewType
} from "../../api/lightDeviceTypes";
import {AppDispatch} from "../store";

type lightStateType = {
  view: lightViewType,
  control: lightControlType
}

export const setLightView = createAction<lightViewType>("light/getView");
export const setLightControl = createAction<lightControlType>("light/setControl");

const stateInit: lightStateType = {
  view: {
    state: 0,
    hoursOn: 0,
    minutesOn: 0,
    power: 0,
    durationOn: 0,
    isBlocking: 0
  },
  control: {
    powerSet: 0,
    hoursOnSet: 0,
    minutesOnSet: 0,
    durationOnSet: 0,
    block: 0,
    manualMode: 0,
    manualOn: 0
  }
}

const lightReducer = createReducer(stateInit, builder => {
  builder.addCase(setLightView, (state, action) => {
    state.view = action.payload;
  })
      .addCase(setLightControl, (state, action) => {
        state.control = action.payload;
      })
})

const lightApi = new devicesAPI("light");

export const lightGetViewAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await lightApi.getView<ILightView>();
    dispatch(setLightView(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_LIGHT, message: error.response.data.message}));
  }
}

export const lightGetControlAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await lightApi.getControl<ILightControl>();
    dispatch(setLightControl(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_LIGHT, message: error.response.data.message}));
  }
}

export const setLightControlAJAX = (data: lightControlSetType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addButtonToBlockList(`light ${Object.keys(data)[0]}`));
    const response = await lightApi.setControlValue<lightControlSetType, ILightControl>(data);
    dispatch(setLightControl(response.data));
    dispatch(filterDeleteButtonsBlock(`light ${Object.keys(data)[0]}`))
  } catch (error) {
    if (error.response)
      dispatch(filterDeleteButtonsBlock(`light ${Object.keys(data)[0]}`))
    dispatch(addError({source: ERRORS_LIGHT, message: error.response.data.message}));
  }
}


export default lightReducer;