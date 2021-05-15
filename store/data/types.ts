import { Action } from "redux";
import { GPSData } from "../../api/types";

export interface State {
  infoArray: GPSData;
  byName: {
    [name: string]: string;
  };
}

export enum ActionType {
  GET_GPS_DATA = "GET_GPS_DATA",
}

export interface GetGPSDataAction extends Action {
  type: ActionType.GET_GPS_DATA;
  payload: {
    information: GPSData;
  };
}

export type Actions = GetGPSDataAction;
