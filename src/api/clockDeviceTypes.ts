import {IBase} from "./types";

export type clockViewType = {
  hours: number,
  minutes: number
}

export interface IClockView extends IBase{
  data: clockViewType
}

export type clockControlType = {
  hoursSet: number,
  minutesSet: number
}

export type clockControlSetType = {
  hoursSet?: number,
  minutesSet?: number
}

export interface IClockControl extends IBase{
  data: clockControlType
}