import {IBase} from "./types";

export type humidityViewType = {
  state: number,
  temperature: number,
  humidity: number,
  isBlocking: number
}

export interface IHumidityView extends IBase{
  data: humidityViewType
}

export type humidityControlType = {
  humiditySet: number,
  deadZone: number,
  block: number,
  manualMode: number,
  manualOn: number
}
export type humidityControlSetType = {
  humiditySet?: number,
  deadZone?: number,
  block?: number,
  manualMode?: number,
  manualOn?: number
}

export interface IHumidityControl extends IBase{
  data: humidityControlType
}