import {IBase} from "./types";


export type pumpViewType = {
  state: Number,
  timer: Number,
  performance: Number,
  error: Number,
  isBlocking: Number
}
export interface IPumpView extends IBase{
  data: pumpViewType
}

export type pumpControlType = {
  power?: Number,
  timerOn?: Number,
  timerOff?: Number,
  flowControl?: Number,
  jobPerformance?: Number,
  dMaxPerformance?: Number,
  dMinPerformance?: Number,
  resetError?: Number,
  block?: Number,
  manualMode?: Number,
  manualOn?: Number
}

export interface IPumpControl extends IBase{
  data: pumpControlType
}

export type pumpConfigType = {
  mode: Number
}

export interface IPumpConfig extends IBase{
  data: pumpConfigType
}