import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6C460",
    paddingTop: "15%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
  map: {
    marginTop: "5%",
    height: 250,
    width: "100%",
  },
  scrollContent: {
    width: Dimensions.get("window").width,
  },
  item: {
    padding: 20,
    width: "100%",
    marginTop: 12,
    fontSize: 27,
    borderRadius: 4,
  },
});
