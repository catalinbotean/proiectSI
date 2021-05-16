import {State} from "./types";

export const initialState: State = {
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
