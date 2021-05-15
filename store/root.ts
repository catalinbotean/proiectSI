import { combineReducers } from "redux";

import { ApplicationActions } from "./types";

import { State as GPSData, reducer as dataGPS } from "./data";
import { State as Activities, reducer as activities } from "./ui/activities";
export interface ApplicationState {
  GPS: {
    dataGPS: GPSData;
  };
  ui: {
    activities: Activities;
  };
}

const appReducer = combineReducers<ApplicationState>({
  GPS: combineReducers({
    dataGPS,
  }),
  ui: combineReducers({
    activities,
  }),
});

function rootReducer(
  state: ApplicationState | undefined,
  action: ApplicationActions
) {
  return appReducer(state, action);
}

export default rootReducer;
