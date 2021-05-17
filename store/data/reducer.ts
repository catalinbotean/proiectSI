import {ActionType, State} from "./types";
import {initialState} from "./initialState";
import {addHours, differenceInMinutes} from "date-fns";
import produce from "immer";
import {getFormattedData} from "../../helpers";

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_GPS_DATA: {
      const dataArray: string[] = action.payload.information;
      const data = getFormattedData(dataArray);
      return produce(state, (draft) => {
        draft.byDate = data.byDate;
        draft.byId = data.byId;
        draft.dates = data.dates;
        draft.location = data.location;
      });
    }

    case ActionType.REFETCH_DATA: {
      const dataArray: string[] = action.payload.information;
      const e = dataArray[dataArray.length - 1];
      const hour = parseInt(`${e[60]}${e[61]}`);
      const minutes = parseInt(`${e[70]}${e[71]}`);
      const seconds = parseInt(`${e[80]}${e[81]}`);
      return produce(state, (draft) => {
        draft.location.location.latitude = parseFloat(
          `${e[4]}${e[5]}${e[6]}${e[7]}${e[8]}${e[9]}${e[10]}${e[11]}${e[12]}`
        );
        draft.location.location.longitude = parseFloat(
          `${e[19]}${e[20]}${e[21]}${e[22]}${e[23]}${e[24]}${e[25]}${e[26]}${e[27]}`
        );
        const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        const stringHour = hour < 10 ? `0${hour}` : `${hour}`;

        draft.location.hour = `${stringHour}:${stringMinutes}:${stringSeconds}`;
      });
    }

    default:
      return state;
  }
};
