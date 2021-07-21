import {createAction, createReducer} from "@reduxjs/toolkit";

import devicesAPI from "../../api/devices";
import {addError, ERRORS_FLOW} from "../errors/errorsReducer";
import {addButtonToBlockList, filterDeleteButtonsBlock} from "../buttons/buttonsReducer";
import {
  flowConfigSetType,
  flowConfigType, flowControlSetType,
  flowControlType,
  flowViewType,
  IFlowConfig,
  IFlowControl,
  IFlowView
} from "../../api/flowDeviceTypes";
import {AppDispatch} from "../store";


type flowStateType = {
  sensors: Array<{
    view: flowViewType,
    control: flowControlType,
    config: flowConfigType
  }>
}

type flowViewAction = {
  view: flowViewType,
  sensorNumber: number
}
type flowControlAction = {
  control: flowControlType,
  sensorNumber: number
}
type flowConfigAction = {
  config: flowConfigType,
  sensorNumber: number
}

const setFlowView = createAction<flowViewAction>("flow/getView");
const setFlowConfig = createAction<flowConfigAction>("flow/setConfig");
const setFlowControl = createAction<flowControlAction>("flow/setControl");


const stateInit: flowStateType = {
  sensors: [{
    view: {
      performance: 0,
      volume: 0,
      callImpCounter: 0
    },
    control: {
      resetVolume: 0
    },
    config: {
      impPerLiter: 0,
    }
  },
    {
      view: {
        performance: 0,
        volume: 0,
        callImpCounter: 0
      },
      control: {
        resetVolume: 0
      },
      config: {
        impPerLiter: 0,
      }
    }
  ]

}

const flowReducer = createReducer(stateInit, builder => {
  builder.addCase(setFlowView, (state, action) => {
    state.sensors[action.payload.sensorNumber].view = action.payload.view
  })
      .addCase(setFlowConfig, (state, action) => {
        state.sensors[action.payload.sensorNumber].config = action.payload.config;
      })
      .addCase(setFlowControl, (state, action) => {
        state.sensors[action.payload.sensorNumber].control = action.payload.control;
      })
})

const flowApi = new devicesAPI("flow");

export const flowGetViewAJAX = (flowNumber: number) => async (dispatch: AppDispatch) => {
  try {
    flowApi.newName = `flow${flowNumber}`
    const response = await flowApi.getView<IFlowView>();
    dispatch(setFlowView({view: response.data, sensorNumber: flowNumber}))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_FLOW, message: error.response.data.message}));
  }
}

export const flowGetControlAJAX = (flowNumber: number) => async (dispatch: AppDispatch) => {
  try {
    flowApi.newName = `flow${flowNumber}`
    const response = await flowApi.getControl<IFlowControl>();
    dispatch(setFlowControl({control: response.data, sensorNumber: flowNumber}))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_FLOW, message: error.response.data.message}));
  }
}

export const flow1GetConfigAJAX = (flowNumber: number) => async (dispatch: AppDispatch) => {
  try {
    flowApi.newName = `flow${flowNumber}`;
    const response = await flowApi.getConfig<IFlowConfig>();
    dispatch(setFlowConfig({config: response.data, sensorNumber: flowNumber}))
  } catch (error) {
    if (error.response)
      dispatch(addError({source: ERRORS_FLOW, message: error.response.data.message}));
  }
}

export const setFlowControlAJAX = (data: flowControlSetType, flowNumber: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addButtonToBlockList(`flow${flowNumber} ${Object.keys(data)[0]}`));
    flowApi.newName = `flow${flowNumber}`;
    const response = await flowApi.setControlValue<flowControlSetType, IFlowControl>(data);
    dispatch(setFlowControl({control: response.data, sensorNumber: flowNumber}));
    dispatch(filterDeleteButtonsBlock(`flow${flowNumber} ${Object.keys(data)[0]}`))
  } catch (error) {
    if (error.response)
      dispatch(filterDeleteButtonsBlock(`flow${flowNumber} ${Object.keys(data)[0]}`))
    dispatch(addError({source: ERRORS_FLOW, message: error.response.data.message}));
  }
}
export const setFlowConfigAJAX = (data: flowConfigSetType, flowNumber: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addButtonToBlockList(`flow${flowNumber} ${Object.keys(data)[0]}`));
    flowApi.newName = `flow${flowNumber}`;
    const response = await flowApi.setConfigValue<flowConfigSetType, IFlowConfig>(data);
    dispatch(setFlowConfig({config: response.data, sensorNumber: flowNumber}));
    dispatch(filterDeleteButtonsBlock(`flow${flowNumber} ${Object.keys(data)[0]}`))
  } catch (error) {
    if (error.response)
      dispatch(filterDeleteButtonsBlock(`flow${flowNumber} ${Object.keys(data)[0]}`))
    dispatch(addError({source: ERRORS_FLOW, message: error.response.data.message}));
  }
}


export default flowReducer;