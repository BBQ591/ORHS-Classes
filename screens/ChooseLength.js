import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "react-native-flat-button";

const styles = require("./style");

export default function ChooseLength({ navigation, route }) {
  const creditDict = require("../classDict.json");
  const {
    FS,
    Class,
    fall,
    spring,
    time,
    lunchClass,
    requirements,
    year,
    number,
  } = route.params;
  console.log(FS, "daks;ljla;dkjsljdfsalaj;kfds");
  const options = [
    "Add Semester",
    "Add Block Year Long",
    "Add Term",
    "Explore",
    "View Description",
  ];

  const pressHandler = (item, Class) => {
    if (item == "Add Semester") {
      navigation.navigate("Subjects", {
        FS: FS,
        add: "Semester",
        fall: fall,
        spring: spring,
        time: time,
        lunchClass: lunchClass,
        requirements: requirements,
        year,
        Class,
        number,
      });
    }
    if (item == "Add Block Year Long") {
      navigation.navigate("Subjects", {
        FS: FS,
        add: "Year-long on a block",
        fall: fall,
        spring: spring,
        time: time,
        lunchClass: lunchClass,
        requirements: requirements,
        year,
        Class,
        number,
      });
    }
    if (item == "Add Term") {
      navigation.navigate("Subjects", {
        FS: FS,
        add: "Term",
        fall: fall,
        spring: spring,
        time: time,
        lunchClass: lunchClass,
        requirements: requirements,
        year,
        Class,
        number,
      });
    }
    if (item == "Explore") {
      navigation.navigate("Search Class", {
        FS: FS,
        fall: fall,
        spring: spring,
        time: time,
        lunchClass: lunchClass,
        requirements: requirements,
        year: year,
        Class: Class,
        number: number,
      });
    }
    if (item == "View Description" && Class != "Click Here to Add Class!") {
      navigation.navigate("Description", {
        FS,
        name: Class,
        GPA: creditDict[Class].GPA,
        Length: creditDict[Class].Length,
        Credits: creditDict[Class].Credits,
        Description: creditDict[Class].Description,
        Prerequisites: creditDict[Class].Prerequisites,
        Notes: creditDict[Class].Notes,
        subject: creditDict[Class].Subject,
        fall,
        spring,
        time,
        lunchClass,
        requirements,
        year,
        Class,
        number,
      });
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#d1d1d1",
          alignItems: "center",
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        {options.map((item) => {
          return (
            // <View style = {styles.items}>
            <Button
              type="neutral"
              containerStyle={StyleSheet.compose(
                styles.buttonContainer,
                styles.lengthButton
              )}
              onPress={() => pressHandler(item, Class)}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {item}
              </Text>
            </Button>
            // </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
const temp = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    width: "80%",
    height: 100,
    marginVertical: 20,
    backgroundColor: "#88A9AA",
    borderColor: "#6a9495",
    borderRadius: 20,
    // shadowHeight:8,
    // activeOpacity:0.5,
  },
});
