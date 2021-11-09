import {Action} from "redux";

export interface MapInput {
  latitude: number;
  longitude: number;
}

export interface Walk {
  walk: MapInput[];
  startHour: Date;
  endHour: Date;
}
[];

export interface State {
  dates: string[];
  byDate: {
    [id: string]: Walk[];
  };
  byId: {
    [id: string]: MapInput;
  };
  location: {location: MapInput; hour: string};
}

export enum ActionType {
  GET_GPS_DATA = "GET_GPS_DATA",
  REFETCH_DATA = "REFETCH_DATA",
}

export interface GetGPSDataAction extends Action {
  type: ActionType.GET_GPS_DATA;
  payload: {
    information: string[];
  };
}

export interface RefetchDataAction extends Action {
  type: ActionType.REFETCH_DATA;
  payload: {
    information: string[];
  };
}

export type Actions = GetGPSDataAction | RefetchDataAction;
