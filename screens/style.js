import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a9495",
    alignItems: "center",
    justifyContent: "center",
  },
  items: {
    width: 350,
    marginTop: 30,
    padding: 30,
    backgroundColor: "#6a9495",
    // fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  lengthItems: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    marginTop: 24,
    padding: 30,
    backgroundColor: "#d1d1d1",
    fontSize: 40,
  },

  buttonContainer: {
    width: "80%",
    height: 125,
    marginVertical: 20,
    borderRadius: 20,
    // shadowHeight:8,
    // activeOpacity:0.5,
  },
  viewButton: {
    backgroundColor: "#d1d1d1",
    borderColor: "#b7b7b7",
  },
  lengthButton: {
    backgroundColor: "#88A9AA",
    borderColor: "#6a9495",
  },
});
