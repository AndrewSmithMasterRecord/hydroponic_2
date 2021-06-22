import {IBase} from "./types";

export type ventViewType = {
  state: number,
  timer: number,
  isBlocking: number
}
export interface IVentView extends IBase{
  data: ventViewType
}

export type ventControlType = {
  timerOn: number,
  timerOff: number,
  block: number,
  manualMode: number,
  manualOn: number
}
export type ventControlSetType = {
  timerOn?: number,
  timerOff?: number,
  block?: number,
  manualMode?: number,
  manualOn?: number
}

export interface IVentControl extends IBase{
  data: ventControlType
}