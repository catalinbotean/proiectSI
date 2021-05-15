import { ActionType } from "./types";
import { initialState } from "./initialState";

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_GPS_DATA: {
      return {
        ...state,
        data: action.payload.information,
      };
    }
    default:
      return state;
  }
};
