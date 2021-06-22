import {IBase} from "./types";

export type lightViewType = {
  state: number,
  hoursOn: number,
  minutesOn: number,
  power: number,
  durationOn: number,
  isBlocking: number
}

export interface ILightView extends IBase{
  data: lightViewType
}

export type lightControlType = {
  powerSet: number,
  hoursOnSet: number,
  minutesOnSet: number,
  durationOnSet: number,
  block: number,
  manualMode: number,
  manualOn: number
}

export type lightControlSetType ={
  powerSet?: number,
  hoursOnSet?: number,
  minutesOnSet?: number,
  durationOnSet?: number,
  block?: number,
  manualMode?: number,
  manualOn?: number
}

export interface ILightControl extends IBase{
  data: lightControlType
}