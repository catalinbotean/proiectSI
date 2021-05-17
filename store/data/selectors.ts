import {createSelector} from "reselect";
import {State} from "./types";

export const selectLastGPSData = createSelector(
  (state: State) => state.location,
  (infoArray) => infoArray
);

export const selectDaysWithWalks = createSelector(
  (state: State) => state.byDate,
  (date) => date
);
