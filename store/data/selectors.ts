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

export const selectWalksOfDay = createSelector(
  (state: State, date: string) => state.byDate[date],
  (walks) => walks
);
