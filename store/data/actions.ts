import {ActionType} from "./reducer";

import {ThunkAction, ThunkDispatch as Dispatch} from "redux-thunk";
import {apiFactory} from "../../api/api";

export type Thunk = ThunkAction<Promise<void>, any, any, any>;
export type ThunkDispatch = Dispatch<any, any, any>;

const getDataAction = (data: any) => ({
  type: ActionType.GET_DATA,
  payload: {data},
});

export const getData = (): Thunk => async (dispatch, getState, context) => {
  console.log("daaa");
  const data = await context.api.data.getData();
  console.log(data);
  dispatch(getDataAction(data));
};
