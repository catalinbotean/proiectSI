import { createSelector } from "reselect";

import { State } from "./types";

export const selectActivity = createSelector(
  ({ activities }: State, type: string, payload?: any) => {
    if (payload !== undefined) {
      return !!activities.find(
        (activity) => activity.type === type && activity.payload === payload
      );
    }

    return !!activities.find((activity) => activity.type === type);
  },
  (activity) => activity
);

export const selectActivities = createSelector(
  (state: State, types: string[]) =>
    !!state.activities.find(
      (activity) => activity.type && types.includes(activity.type)
    ),
  (activities) => activities
);

export const selectError = createSelector(
  (state: State, type: string) =>
    !!state.errors.find((error) => error.type === type),
  (error) => error
);

export const selectErrorDetails = createSelector(
  (state: State, type: string) =>
    state.errors.find((error) => error.type === type),
  (error) => error
);

export const selectErrors = createSelector(
  (state: State, types: string[]) =>
    !!state.errors.find((error) => error.type && types.includes(error.type)),
  (error) => error
);

export const selectErrorsDetails = createSelector(
  (state: State, types: string[]) =>
    state.errors.find((error) => error.type && types.includes(error.type)),
  (error) => error
);

export const selectAllErrors = createSelector(
  (state: State) => state.errors,
  (errors) => errors
);
