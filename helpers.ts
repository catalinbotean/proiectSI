import {addHours, differenceInMinutes} from "date-fns";
import {State} from "./store/data";

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
  if (differenceInMinutes(new Date(), date) > 15) return false;
  return true;
}

export function getDate(e: string) {
  let date = new Date(
    parseInt(`${e[34]}${e[35]}${e[36]}${e[37]}`),
    parseInt(`${e[45]}${e[46]}`) - 1,
    parseInt(`${e[52]}${e[53]}`),
    parseInt(`${e[60]}${e[61]}`),
    parseInt(`${e[70]}${e[71]}`),
    parseInt(`${e[80]}${e[81]}`)
  );
  // date = addHours(date, 3);
  return date;
}

export function getFormattedData(dataArray: string[]) {
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
    // date = addHours(date, 3);
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
      stateCreated.byDate[stringDate][count].endHour = getDate(e);
    }
    if (index === dataArray.length - 1) {
      stateCreated.location.location = {
        latitude,
        longitude,
      };
      const hour = parseInt(`${e[60]}${e[61]}`);
      const minutes = parseInt(`${e[70]}${e[71]}`);
      const seconds = parseInt(`${e[80]}${e[81]}`);
      const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const stringHour = hour < 10 ? `0${hour}` : `${hour}`;
      stateCreated.location.hour = `${stringHour}:${stringMinutes}:${stringSeconds}`;
    }
  });
  return stateCreated;
}
