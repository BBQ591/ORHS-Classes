import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CustomClass({ navigation, route }) {
  const { fall, requirements } = route.params;
  var text = null;
  var number = null;
  var [country, setCountry] = useState("English");
  const _storeData = async (newValue) => {
    try {
      await AsyncStorage.setItem("value", newValue);
    } catch (error) {
      // Error saving data
    }
  };
  _storeData(country);
  const pressHandler4 = (value) => {
    const _storeData = async (newValue) => {
      try {
        await AsyncStorage.setItem("value1", newValue);
      } catch (error) {
        // Error saving data
      }
    };
    _storeData(value);
    text = value;
    // fall[fall.length - 1][0] = value;
  };
  const pressHandler5 = (value) => {
    const _storeData = async (newValue) => {
      try {
        await AsyncStorage.setItem("value2", newValue);
      } catch (error) {
        // Error saving data
      }
    };
    _storeData(value);
    number = value;
    // fall[fall.length - 1][1] = value;
  };
  const pressHandler3 = (newValue) => {
    setCountry(newValue);
    const _storeData = async (newValue) => {
      try {
        await AsyncStorage.setItem("value", newValue);
      } catch (error) {
        // Error saving data
      }
    };
    _storeData(newValue);
  };
  const pressHandler = (value, value2) => {
    const _retrieveData = async () => {
      try {
        var value3 = await AsyncStorage.getItem("value");
        var value4 = await AsyncStorage.getItem("value1");
        var value5 = await AsyncStorage.getItem("value2");
      } catch (error) {}
      if (value3 == null) {
        value3 = "English";
      }
      return [value3, value4, value5];
    };
    _retrieveData().then((soup) => {
      fall[fall.length - 1][1] = soup[2];
      fall[fall.length - 1][0] = soup[1];

      fall[fall.length - 1] = [
        fall[fall.length - 1][0],
        fall[fall.length - 1][1],
        soup[0],
      ];
      requirements[soup[0]] += JSON.parse(fall[fall.length - 1][1]);

      fall.push(["Click Here to Add Previously Taken Classes!", 0, 0]);
      const _storeData = async () => {
        try {
          await AsyncStorage.setItem("takenClasses", JSON.stringify(fall)),
            await AsyncStorage.setItem(
              "requirements",
              JSON.stringify(requirements)
            );
        } catch (error) {
          // Error saving data
        }
      };
      _storeData();
      navigation.navigate("Class Taken", {
        fall,
        requirements,
      });
    });
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => pressHandler(text, number)} title="Add" />
      ),
    });
  }, [navigation]);
  var place;
  return (
    <View style={{ flexDirection: "column", paddingTop: 100 }}>
      <Image
        source={require("../ORHS.png")}
        style={{
          width: "100%",
          position: "absolute",
          opacity: 0.15,
        }}
      />
      <TextInput
        style={styles.input1}
        onChangeText={(value, index) => pressHandler4(value)}
        value={text}
        placeholder="Please Enter Class Name"
        placeholderTextColor={"black"}
        fontSize={20}
      />
      <TextInput
        style={styles.input2}
        onChangeText={(value, index) => pressHandler5(value)}
        value={number}
        placeholder="Please Enter Number of Credits"
        keyboardType="numeric"
        returnKeyType="done"
        placeholderTextColor={"black"}
        fontSize={20}
      />
      {/* must fix GPA, do the same as the text changes above(with the pressHandler) */}
      {/* <TextInput
        style={styles.input3}
        onChangeText={(value, index) => (place = value)}
        value={number}
        placeholder="Please Enter GPA Weight"
        keyboardType="numeric"
        returnKeyType="done"
        placeholderTextColor={"#893940"}
      /> */}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>
          Select the subject the credits apply to:
        </Text>
      </View>
      <View>
        <Picker
          selectedValue={country}
          onValueChange={(value, index) => pressHandler3(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="English" value={"English"} />
          <Picker.Item label="Math" value={"Math"} />
          <Picker.Item label="Fine Arts" value={"Fine Arts"} />
          <Picker.Item label="Social Studies" value={"Social Studies"} />
          <Picker.Item label="Science" value={"Science"} />
          <Picker.Item label="Electives" value={"Electives"} />
          <Picker.Item label="World Languages" value={"World Languages"} />
          <Picker.Item label="Wellness" value={"Wellness"} />
          <Picker.Item label="Special Programs" value={"Special Programs"} />
        </Picker>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  picker: {},
  input1: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    height: "25%",
    borderRadius: 10,
  },
  input2: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    height: "25%",
    borderRadius: 10,
  },
  input3: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
