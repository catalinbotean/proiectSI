import { Thunk } from "..";
import { v4 as uuid } from "uuid";
import { beginActivity, endActivity, setError } from "../ui/activities";
import { ActionType, GetGPSDataAction } from "./types";

const getGPSAction = (information: string[]): GetGPSDataAction => ({
  type: ActionType.GET_GPS_DATA,
  payload: { information },
});

export const getData = (): Thunk => async (dispatch, getState, context) => {
  const activityId = uuid();

  try {
    await dispatch(
      beginActivity({ type: ActionType.GET_GPS_DATA, uuid: activityId })
    );

    const data = await context.api.data.getData();
    dispatch(getGPSAction(data));
  } catch (e) {
    dispatch(
      setError({
        type: ActionType.GET_GPS_DATA,
        message: e.message,
        uuid: activityId,
      })
    );
  } finally {
    dispatch(endActivity({ uuid: activityId }));
  }
};
