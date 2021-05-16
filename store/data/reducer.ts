import {ActionType, State} from "./types";
import {initialState} from "./initialState";
import {addHours, differenceInMinutes} from "date-fns";
import produce from "immer";

function isInLast15Minutes(e: string) {
  let date = new Date(
    parseInt(`${e[34]}${e[35]}${e[36]}${e[37]}`),
    parseInt(`${e[45]}${e[46]}`) - 1,
    parseInt(`${e[52]}${e[53]}`),
    parseInt(`${e[60]}${e[61]}`),
    parseInt(`${e[70]}${e[71]}`),
    parseInt(`${e[80]}${e[81]}`)
  );
  date = addHours(date, 3);
  const dataaa = addHours(new Date(), 3);
  console.log(dataaa, "   ", date);
  if (differenceInMinutes(new Date(), date) > 15) return false;
  return true;
}

function getDate(e: string) {
  let date = new Date(
    parseInt(`${e[34]}${e[35]}${e[36]}${e[37]}`),
    parseInt(`${e[45]}${e[46]}`) - 1,
    parseInt(`${e[52]}${e[53]}`),
    parseInt(`${e[60]}${e[61]}`),
    parseInt(`${e[70]}${e[71]}`),
    parseInt(`${e[80]}${e[81]}`)
  );
  date = addHours(date, 3);
  return date;
}

function getFormattedData(dataArray: string[]) {
  const stateCreated: State = {
    dates: [],
    byDate: {},
    byId: {},
    location: {
      location: {
        latitude: 0,
        longitude: 0,
      },
      hour: "",
    },
  };
  let count = 0;
  let redo = true;
  dataArray.forEach((e, index) => {
    const latitude = parseFloat(
      `${e[4]}${e[5]}${e[6]}${e[7]}${e[8]}${e[9]}${e[10]}${e[11]}${e[12]}`
    );
    const longitude = parseFloat(
      `${e[19]}${e[20]}${e[21]}${e[22]}${e[23]}${e[24]}${e[25]}${e[26]}${e[27]}`
    );
    const stringDate = `${e[52]}${e[53]}/${e[45]}${e[46]}/${e[34]}${e[35]}${e[36]}${e[37]}`;
    let date = new Date(
      parseInt(`${e[34]}${e[35]}${e[36]}${e[37]}`),
      parseInt(`${e[45]}${e[46]}`) - 1,
      parseInt(`${e[52]}${e[53]}`),
      parseInt(`${e[60]}${e[61]}`),
      parseInt(`${e[70]}${e[71]}`),
      parseInt(`${e[80]}${e[81]}`)
    );
    date = addHours(date, 3);
    if (!stateCreated.dates.includes(stringDate)) {
      stateCreated.dates.push(stringDate);
    }
    if (!stateCreated.byDate[stringDate]) {
      stateCreated.byDate[stringDate] = [];
      count = 0;
      redo = true;
    }
    if (redo) {
      stateCreated.byDate[stringDate].push({
        startHour: date,
        walk: [{latitude, longitude}],
        endHour: date,
      });
      redo = false;
      console.log("stateCreated");
    } else if (differenceInMinutes(date, getDate(dataArray[index - 1])) > 15) {
      stateCreated.byDate[stringDate][count].endHour = getDate(
        dataArray[index - 1]
      );
      count++;
      stateCreated.byDate[stringDate].push({
        startHour: date,
        walk: [{latitude, longitude}],
        endHour: date,
      });
    } else {
      stateCreated.byDate[stringDate][count].walk.push({
        latitude,
        longitude,
      });
    }
    if (index === dataArray.length - 1) {
      stateCreated.location.location = {
        latitude,
        longitude,
      };
      const hour = parseInt(`${e[60]}${e[61]}`);
      const minutes = parseInt(`${e[70]}${e[71]}`);
      const seconds = parseInt(`${e[80]}${e[81]}`);
      stateCreated.location.hour = `${hour}:${minutes}:${seconds}`;
    }
  });
  return stateCreated;
}

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
        draft.location.hour = `${hour}:${minutes}:${seconds}`;
      });
    }

    default:
      return state;
  }
};
