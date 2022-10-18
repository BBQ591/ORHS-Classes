import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Button from "react-native-flat-button";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
export default function information({ navigation }) {
  // useEffect(() => {
  //     console.log(poop);
  // }, [poop]);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  console.log(windowHeight);
  var [country, setCountry] = useState();
  console.log(country, "YOUR MOM IS FAT");
  const pressHandler10 = (country) => {
    Alert.alert("Graduation Year", "Please Select Graduation Year First", [
      {
        text: "Okay",
      },
    ]);
  };
  const pressHandler = (country) => {
    setpoop(false);
    navigation.navigate("Year", { country });
  };
  // AsyncStorage.clear();

  const pressHandler3 = (value) => {
    setCountry(value);
    console.log(value, "this is different");
    AsyncStorage.clear();

    const _storeData = async (country) => {
      try {
        await AsyncStorage.setItem("graduation", JSON.stringify(country));
      } catch (error) {
        // Error saving data
      }
    };
    _storeData(value);
  };
  const pressHandler2 = (poop, country) => {
    setpoop(!poop);
  };
  const pressHandler5 = (poop, country) => {
    setpoop(!poop);
    const _storeData = async () => {
      try {
        await AsyncStorage.setItem("poopface", JSON.stringify(2026));
      } catch (error) {
        // Error saving data
      }
    };
    _storeData();
  };
  const [poop, setpoop] = useState(false);
  const _retrieveData = async (country) => {
    try {
      var value = await AsyncStorage.getItem("graduation");
    } catch (error) {}
    if (value == null) {
      return "Click Here to Select Your Graduation Year";
    }
    console.log(country, value, "sadness");
    return JSON.parse(value);
  };
  _retrieveData(country).then((soup) => {
    setCountry(soup);
    console.log(country);
  });
  return (
    // <ScrollView>
    <View
      style={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
        flex: 1,
      }}
    >
      <Text></Text>

      <View
        style={{
          // flex: 0.5,
          padding: 25,
          backgroundColor: "yellow",
          // fontSize: 50,
          alignItems: "center",
          borderRadius: 20,
          width: windowWidth * 0.9,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: windowHeight * 0.027,
            color: "black",
            textAlign: "center",
          }}
        >
          DISCLAIMER: THIS APP IS IS NOT OFFICIAL. IT IS FOR PLANNING PURPOSES
          ONLY
        </Text>
      </View>
      {poop && (
        <View style={styles.container}>
          <Picker
            selectedValue={country}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => pressHandler3(itemValue)}
          >
            <Picker.Item label="2026" value={2026} />
            <Picker.Item label="2025" value={2025} />
            <Picker.Item label="2024" value={2024} />
            <Picker.Item label="2023" value={2023} />
          </Picker>
        </View>
      )}
      {!poop && country != "Click Here to Select Your Graduation Year" && (
        <View style={{ flex: 1, top: 20, justifyContent: "center" }}>
          <TouchableOpacity onPress={() => pressHandler2(poop, country)}>
            <Text style={{ fontSize: 50, color: "#893940" }}>{country}</Text>
          </TouchableOpacity>
        </View>
      )}
      {!poop && country == "Click Here to Select Your Graduation Year" && (
        <View style={{ flex: 1, top: 20, justifyContent: "center" }}>
          <TouchableOpacity onPress={() => pressHandler5(poop, country)}>
            <Text
              style={{
                fontSize: windowHeight * 0.03,
                color: "#893940",
                textAlign: "center",
              }}
            >
              {country}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Image
        source={require("../assets/information.png")}
        style={{
          opacity: 1,
          height: windowHeight / 4,
          width: windowHeight / 4,
        }}
      />
      {country != "Click Here to Select Your Graduation Year" && (
        <Button
          type="neutral"
          containerStyle={StyleSheet.compose(
            styles.buttonContainer,
            styles.lengthButton
          )}
          onPress={() => pressHandler(country)}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "black",
            }}
          >
            CONTINUE
          </Text>
        </Button>
      )}
      {country == "Click Here to Select Your Graduation Year" && (
        <Button
          type="neutral"
          containerStyle={StyleSheet.compose(
            styles.buttonContainer,
            styles.lengthButton
          )}
          onPress={() => pressHandler10(country)}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "black",
            }}
          >
            CONTINUE
          </Text>
        </Button>
      )}
    </View>
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    // top: -35,
    justifyContent: "center",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d1d1d1",
  },
  picker: {
    flex: 0,
    top: 0,
    width: 300,
    // borderWidth: 1,
    // borderColor: '#d1d1d1',
  },
  buttonContainer: {
    flex: 1,

    width: "80%",
    // height: 125,
    marginVertical: 20,
    borderRadius: 20,
    // shadowHeight:8,
    // activeOpacity:0.5,
  },
  viewButton: {
    flex: 0.6,

    backgroundColor: "#d1d1d1",
    borderColor: "#b7b7b7",
  },
  lengthButton: {
    flex: 0.6,

    backgroundColor: "#88A9AA",
    borderColor: "#6a9495",
  },
});
