import { Action } from "redux";

export interface State {
  infoArray: string[];
}

export enum ActionType {
  GET_GPS_DATA = "GET_GPS_DATA",
}

export interface GetGPSDataAction extends Action {
  type: ActionType.GET_GPS_DATA;
  payload: {
    information: string[];
  };
}

export type Actions = GetGPSDataAction;
