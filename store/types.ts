import { ThunkAction, ThunkDispatch as Dispatch } from "redux-thunk";
import { ApiFactory } from "../api/api";
import { ApplicationState } from "./root";

import { Actions as GPSActions } from "./data";
import { Actions as ActivitiesActions } from "./ui/activities";

export type ApplicationActions = GPSActions | ActivitiesActions;

export type Thunk = ThunkAction<
  Promise<void>,
  ApplicationState,
  ThunkContext,
  ApplicationActions
>;
export type ThunkDispatch = Dispatch<
  ApplicationState,
  ThunkContext,
  ApplicationActions
>;

export interface ThunkContext {
  api: ApiFactory;
}
