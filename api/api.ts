import axios from "axios";

import { GPSData } from "./types";

export const apiFactory = () => ({
  data: {
    getData: async function () {
      const { data } = await axios.get<GPSData>(
        "https://wifi-f0745-default-rtdb.firebaseio.com/data.json"
      );
      return data;
    },
  },
});

export type ApiFactory = ReturnType<typeof apiFactory>;
