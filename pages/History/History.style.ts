import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 120,
    backgroundColor: "#342D73",
    height: "100%",
  },
  select: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
  },
  dateView: {
    color: "#fff",
    backgroundColor: "#FFA500",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },

  button: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  map: {
    alignSelf: "center",
    marginTop: 15,
    height: 500,
    width: "100%",
    marginBottom: 15,
  },
  error: {
    marginTop: 20,
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#800000",
    borderRadius: 15,
  },
  text: {
    color: "#fff",
  },
});
