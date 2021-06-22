import {IBase} from "./types";


export type pumpViewType = {
  state: number,
  timer: number,
  performance: number,
  error: number,
  isBlocking: number
}
export interface IPumpView extends IBase{
  data: pumpViewType
}

export type pumpControlType = {
  power: number,
  timerOn: number,
  timerOff: number,
  flowControl: number,
  jobPerformance: number,
  dMaxPerformance: number,
  dMinPerformance: number,
  resetError: number,
  block: number,
  manualMode: number,
  manualOn: number
}

export type pumpSetControlType = {
  power?: number,
  timerOn?: number,
  timerOff?: number,
  flowControl?: number,
  jobPerformance?: number,
  dMaxPerformance?: number,
  dMinPerformance?: number,
  resetError?: number,
  block?: number,
  manualMode?: number,
  manualOn?: number
}

export interface IPumpControl extends IBase{
  data: pumpControlType
}

export type pumpConfigType = {
  mode: number
}
export type pumpSetConfigType = {
  mode?: number
}

export interface IPumpConfig extends IBase{
  data: pumpConfigType
}