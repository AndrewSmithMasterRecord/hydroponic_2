import {IBase} from "./types";

export type drainViewType ={
  state: number,
  timer: number,
  performance: number,
  error: number,
  isBlocking: number
}

export interface IDrainPumpView extends IBase{
  data: drainViewType
}

export type drainPumpControlType = {
  power: number,
  levelOn: number,
  timerOn: number,
  flowControl: number,
  jobPerformance: number,
  dMaxPerformance: number,
  dMinPerformance: number,
  resetError: number,
  block: number,
  manualMode: number,
  manualOn: number
}

export type drainPumpSetControlType ={
  power?: number,
  levelOn?: number,
  timerOn?: number,
  flowControl?: number,
  jobPerformance?: number,
  dMaxPerformance?: number,
  dMinPerformance?: number,
  resetError?: number,
  block?: number,
  manualMode?: number,
  manualOn?: number
}

export interface IDrainPumpControl extends IBase{
  data: drainPumpControlType
}