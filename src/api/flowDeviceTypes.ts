import {IBase} from "./types";

export type flowViewType = {
  performance: number,
  volume: number,
  callImpCounter: number
}

export interface IFlowView extends IBase{
  data: flowViewType
}

export type flowControlType = {
  resetVolume: number
}
export type flowControlSetType = {
  resetVolume?: number
}
export interface IFlowControl extends IBase{
  data: flowControlType
}

export type flowConfigType = {
  impPerLiter: number,
}
export type flowConfigSetType = {
  impPerLiter?: number
}
export interface IFlowConfig extends IBase{
  data: flowConfigType
}