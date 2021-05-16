import axios from "axios";
import { FirebaseData } from "./types";

export const apiFactory = () => ({
  data: {
    getData: async function () {
      const { data } = await axios.get<FirebaseData>(
        "https://wifi-f0745-default-rtdb.firebaseio.com/gps.json"
      );
      let gpsData: string[] = [];
      Object.entries(data.data).map(([key, value]) => gpsData.push(value));
      return gpsData;
    },
  },
});

export type ApiFactory = ReturnType<typeof apiFactory>;
