import { Thunk } from "../../types";
import {
  ActionType,
  Activity,
  ActivityAction,
  ActivityError,
  ActivityErrorAction,
} from "./types";

const DEFAULT_ACTIVITY_TIMEOUT = 3000;

const activityAction = (activity: Activity): ActivityAction => ({
  type: ActionType.ACTIVITY,
  payload: activity,
});

export const beginActivity =
  (activity: Activity): Thunk =>
  async (dispatch) => {
    dispatch(activityAction(activity));
  };

export const endActivity =
  ({ uuid }: { uuid: string }): Thunk =>
  async (dispatch) => {
    dispatch(activityAction({ uuid, type: null }));
  };

const errorAction = (error: ActivityError): ActivityErrorAction => ({
  type: ActionType.ERROR,
  payload: error,
});

export const setError =
  (error: ActivityError): Thunk =>
  async (dispatch) => {
    try {
      dispatch(errorAction(error));
      setTimeout(async () => {
        await dispatch(clearError({ uuid: error.uuid }));
      }, error.timeout || DEFAULT_ACTIVITY_TIMEOUT);
    } catch (e) {
      console.error(
        `Awkward... an error occured while dispatching an error ${e}`
      );
    }
  };

export const clearError =
  ({ uuid }: { uuid: string }): Thunk =>
  async (dispatch) => {
    try {
      dispatch(errorAction({ uuid, type: null }));
    } catch (e) {
      console.error(`Awkward... an error occured while clearing an error ${e}`);
    }
  };
