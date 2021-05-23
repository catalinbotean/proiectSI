import {Dimensions, StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 120,
  },
  select: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
  },
  map: {
    alignSelf: "center",
    marginTop: 15,
    height: 500,
    width: "100%",
    marginBottom: 15,
  },
});
