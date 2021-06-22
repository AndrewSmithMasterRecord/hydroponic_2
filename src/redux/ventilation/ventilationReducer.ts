import {createAction, createReducer} from "@reduxjs/toolkit";

import devicesAPI from "../../api/devices";
import {addError, ERRORS_VENTILATION} from "../errors/errorsReducer";
import {addButtonToBlockList, filterDeleteButtonsBlock} from "../buttons/buttonsReducer";
import {IVentControl, IVentView, ventControlSetType, ventControlType, ventViewType} from "../../api/ventDeviceTypes";
import {AppDispatch} from "../store";


type ventilationStateType = {
  view: ventViewType,
  control: ventControlType,
}

export const setVentView = createAction<ventViewType>("ventilation/getView");
export const setVentControl = createAction<ventControlType>("ventilation/setControl");

const stateInit: ventilationStateType = {
  view: {
    state: 0,
    timer: 0,
    isBlocking: 0
  },
  control: {
    timerOn: 0,
    timerOff: 0,
    block: 0,
    manualMode: 0,
    manualOn: 0
  }
}

const ventilationReducer = createReducer(stateInit, builder => {
  builder.addCase(setVentView, (state, action) => {
    state.view = action.payload;
  })
      .addCase(setVentControl, (state, action) => {
        state.control = action.payload;
      })
})

const ventApi = new devicesAPI("ventilation");

export const ventGetViewAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await ventApi.getView<IVentView>();
    dispatch(setVentView(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_VENTILATION, message: error.response.data.message}));
  }
}

export const ventGetControlAJAX = () => async (dispatch: AppDispatch) => {
  try {
    const response = await ventApi.getControl<IVentControl>();
    dispatch(setVentControl(response.data))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_VENTILATION, message: error.response.data.message}));
  }
}

export const setVentControlAJAX = (data: ventControlSetType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addButtonToBlockList(`ventilation ${Object.keys(data)[0]}`));
    const response = await ventApi.setControlValue<ventControlSetType, IVentControl>(data);
    dispatch(setVentControl(response.data));
    dispatch(filterDeleteButtonsBlock(`ventilation ${Object.keys(data)[0]}`))
  } catch (error) {
    if (error.response)
      dispatch(filterDeleteButtonsBlock(`ventilation ${Object.keys(data)[0]}`))
    dispatch(addError({source: ERRORS_VENTILATION, message: error.response.data.message}));
  }
}


export default ventilationReducer;