import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const styles = require("./style");

export default function ChooseLength({ navigation, route }) {
  const image = require("../APG.png");
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
    isCurr,
  } = route.params;
  console.log(isCurr, "IN LENGTH");
  console.log(FS, "daks;ljla;dkjsljdfsalaj;kfds");
  const options = [
    "Add Semester",
    "Add Block Year Long",
    "Add Term",
    "Explore",
    "View Description",
  ];

  const pressHandler = (item, Class, isCurr) => {
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
    if (isCurr == false) {
      console.log(isCurr, "is false");
      if (item == "View Description" && Class != "Click Here to Add Class!") {
        navigation.navigate("Description", {
          FS,
          name: Class[0],
          GPA: creditDict[Class[0]].GPA,
          Length: creditDict[Class[0]].Length,
          Credits: creditDict[Class[0]].Credits,
          Description: creditDict[Class[0]].Description,
          Prerequisites: creditDict[Class[0]].Prerequisites,
          Notes: creditDict[Class[0]].Notes,
          subject: creditDict[Class[0]].Subject,
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
    } else {
      if (item == "View Description" && Class != "Click Here to Add Class!") {
        console.log("is true");
        navigation.navigate("Description", {
          FS,
          name: Class[0],
          GPA: "None",
          Length: "None",
          Credits: Class[1],
          Description: "None",
          Prerequisites: "None",
          Notes: "None",
          subject: Class[2],
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
    }
  };

  return (
    <ImageBackground
      source={image}
      style={{
        justifyContent: "space-evenly",
        flex: 1,
        width: "100%",
        alignItems: "center",
      }}
      imageStyle={{ opacity: 0.5 }}
      resizeMode="cover"
    >
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "space-evenly",
          paddingTop: 70,
        }}
      >
        {options.map((item) => {
          return (
            // <View style = {styles.items}>
            <TouchableOpacity
              onPress={() => pressHandler(item, Class, isCurr)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  shadowColor: "rgba(0,0,0, .4)", // IOS
                  shadowOffset: { height: 5, width: 5 }, // IOS
                  shadowOpacity: 1, // IOS
                  elevation: 10,
                  // top: 80,
                  // flexGrow: 0.3,
                  flex: 0,
                  height: 110,
                  justifyContent: "center",
                  width: 350,
                  backgroundColor: "#6a9495",
                  // fontSize: 50,
                  alignItems: "center",
                  borderRadius: 20,
                  opacity: 0.9,
                }}
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
              </View>
            </TouchableOpacity> // </View>
          );
        })}
      </View>
    </ImageBackground>
  );
}
const temp = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    width: "80%",
    height: 40,
    marginVertical: 20,
    backgroundColor: "#88A9AA",
    borderColor: "#6a9495",
    borderRadius: 20,
    // shadowHeight:8,
    // activeOpacity:0.5,
  },
});
