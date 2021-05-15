import axios from "axios";

export const apiFactory = () => ({
  data: {
    getData: async function () {
      const data = await axios
        .get("https://wifi-f0745-default-rtdb.firebaseio.com/data.json")
        .catch((e) => {
          console.log(e);
        });
      return data;
    },
  },
});
