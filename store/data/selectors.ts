import { createSelector } from "reselect";
import { State } from "./types";

export const selectGPSData = createSelector(
  (state: State) => state.infoArray,
  (names) => names
);
