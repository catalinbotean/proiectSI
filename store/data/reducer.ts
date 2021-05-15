import {initialState} from "./initialState";

export enum ActionType {
  GET_DATA = "GET DATA",
  BLABLABLA = "BLABLBA",
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_DATA: {
      return {
        ...state,
        data: action.payload.data,
      };
    }
    default:
      return state;
  }
};
