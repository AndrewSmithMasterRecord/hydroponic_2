import {createAction, createReducer} from "@reduxjs/toolkit";

import devicesAPI from "../../api/devices";
import {addError, ERRORS_HUMIDITY} from "../errors/errorsReducer";
import {addButtonToBlockList, filterDeleteButtonsBlock} from "../buttons/buttonsReducer";
import {
  humidityControlSetType,
  humidityControlType,
  humidityViewType,
  IHumidityControl,
  IHumidityView
} from "../../api/humidityDeviceTypes";
import {AppDispatch} from "../store";

type humidityStateType = {
  view: humidityViewType,
  control: humidityControlType,
}

export const setHumidityView = createAction<humidityViewType>("humidity/getView");
export const setHumidityControl = createAction< humidityControlType>("humidity/setControl");

const stateInit: humidityStateType = {
  view: {
    state: 0,
    temperature: 0,
    humidity: 0,
    isBlocking: 0
  },
  control: {
    humiditySet: 0,
    deadZone: 0,
    block: 0,
    manualMode: 0,
    manualOn: 0
  }
}

const humidityReducer = createReducer(stateInit, builder => {
  builder.addCase(setHumidityView, (state, action) => {
    state.view = action.payload;
  })
      .addCase(setHumidityControl, (state, action) => {
        state.control = action.payload;
      })
})

const humidityApi = new devicesAPI("humidity");

export const humidityGetViewAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await humidityApi.getView<IHumidityView>();
    dispatch(setHumidityView(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_HUMIDITY, message: error.response.data.message}));
  }
}

export const humidityGetControlAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await humidityApi.getControl<IHumidityControl>();
    dispatch(setHumidityControl(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_HUMIDITY, message: error.response.data.message}));
  }
}

export const setHumidityControlAJAX = (data: humidityControlSetType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addButtonToBlockList(`humidity ${Object.keys(data)[0]}`));
    const response = await humidityApi.setControlValue<humidityControlSetType, IHumidityControl>(data);
    dispatch(setHumidityControl(response.data));
    dispatch(filterDeleteButtonsBlock(`humidity ${Object.keys(data)[0]}`))
  } catch (error) {
    if (error.response)
      dispatch(filterDeleteButtonsBlock(`humidity ${Object.keys(data)[0]}`))
    dispatch(addError({source: ERRORS_HUMIDITY, message: error.response.data.message}));
  }
}


export default humidityReducer;