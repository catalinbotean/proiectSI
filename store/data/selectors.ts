import {createSelector} from "reselect";
import {State} from "./types";

export const selectGPSData = createSelector(
  (state: State) => state.location,
  (infoArray) => infoArray
);

export const selectDays = createSelector(
  (state: State) => state.byDate,
  (date) => date
);
