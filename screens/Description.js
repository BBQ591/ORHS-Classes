import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";

export default function Description({ navigation, route }) {
  var creditDict = require("../classDict.json");
  const image = require("../ORHS.png");
  const {
    FS,
    name,
    GPA,
    Length,
    Credits,
    Description,
    Prerequisites,
    Notes,
    subject,
    fall,
    spring,
    time,
    lunchClass,
    requirements,
    year,
    Class,
    number,
    inSearchMode,
  } = route.params;
  console.log(FS, "YOUR MAMA");
  console.log(subject, Credits, "poop");
  var schedule = spring;
  var oSchedule = fall;
  if (FS == "Fall (edit)") {
    schedule = fall;
    oSchedule = spring;
  }
  var tempFall = Array.from(fall);
  var tempSpring = Array.from(spring);
  var addition = 1;
  if (number % 2 == 1) {
    addition = -1;
  }
  const pressHandler = () => {
    if (Length == "Year-long on a block") {
      schedule[number] = [name, Credits, subject];
      schedule[number + addition] = [name, Credits, subject];
      oSchedule[number] = [name, Credits, subject];
      oSchedule[number + addition] = [name, Credits, subject];
    }
    if (Length == "Semester") {
      if (
        Class[0] == oSchedule[number][0] &&
        Class[0] == oSchedule[number + addition][0]
      ) {
        oSchedule[number][0] = ["Click Here to Add Class!"];
        oSchedule[number + addition][0] = ["Click Here to Add Class!"];
      }
      if (Class[0] == oSchedule[number][0]) {
        oSchedule[number] = ["Click Here to Add Class!"];
      }
      if (schedule[number + addition][0] == oSchedule[number + addition][0]) {
        oSchedule[number + addition][0] = ["Click Here to Add Class!"];
      }
      schedule[number] = [name, Credits, subject];
      schedule[number + addition] = [name, Credits, subject];
    }
    if (Length == "Term") {
      if (
        oSchedule[number + addition][0] == oSchedule[number][0] &&
        schedule[number + addition][0] == oSchedule[number][0]
      ) {
        // is a block
        oSchedule[number] = ["Click Here to Add Class!"];
        oSchedule[number + addition] = ["Click Here to Add Class!"];
        schedule[number + addition] = ["Click Here to Add Class!"];
      }
      if (Class[0] == schedule[number + addition][0]) {
        // is a semester
        schedule[number + addition] = ["Click Here to Add Class!"];
      }
      if (oSchedule[number][0] == Class[0]) {
        oSchedule[number] = ["Click Here to Add Class!"];
      }
      schedule[number] = [name, Credits, subject];
    }
    var old;
    if (Length == "Year-long skinny at lunch") {
      old = lunchClass[0];
      lunchClass[0] = name;
      if (old != "Click Here to Add Class!") {
        for (let j = 0; j < creditDict[old].Subject.length; j++) {
          requirements[creditDict[old].Subject[j]] -= parseFloat(
            creditDict[old].Credits[j]
          );
        }
      }
    }
    var difference = ["", "", "", ""];
    var index = 0;
    for (let i = 0; i < 8; i++) {
      if (fall[i][0] != tempFall[i][0]) {
        difference[index] = tempFall[i];
        index += 1;
      }
      if (spring[i][0] != tempSpring[i][0]) {
        difference[index] = tempSpring[i];
        index += 1;
      }
    }
    var visited = ["", "", "", ""];
    console.log(difference, "DIFFERENTIAL");
    if (
      difference[0] != "" ||
      difference[1] != "" ||
      difference[2] != "" ||
      difference[3] != ""
    ) {
      for (let i = 0; i < subject.length; i++) {
        requirements[subject[i]] += parseFloat(Credits[i]);
      }
      for (let i = 0; i < 4; i++) {
        if (difference[i] == "") {
          continue;
        }
        if (visited.indexOf(difference[i][0]) != -1) {
          continue;
        }
        if (difference[i][0] == "Click Here to Add Class!") {
          continue;
        }
        visited[i] = difference[i][0];
        for (let j = 0; j < difference[i][1].length; j++) {
          requirements[difference[i][2][j]] -= parseFloat(difference[i][1][j]);
        }
      }
    }
    console.log(difference, "adsj;fljl;kdafsljk;fdsljk;dfaslj;");
    console.log(fall, tempFall);
    console.log(spring, tempSpring);

    navigation.navigate("Schedule", {
      FS: FS,
      fall: fall,
      spring: spring,
      lunchClass: lunchClass,
      requirements: requirements,
      year: year,
    });
  };
  var alreadyAdded = false;
  for (let i = 0; i < 8; i++) {
    if (fall[i] == name) {
      alreadyAdded = true;
      break;
    }
    if (spring[i] == name) {
      alreadyAdded = true;
      break;
    }
  }
  if (alreadyAdded == false && inSearchMode == false) {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button onPress={() => pressHandler()} title="Add" />
        ),
      });
    }, [navigation]);
  }

  return (
    <ImageBackground
      source={image}
      style={{ alignItems: "center" }}
      imageStyle={{ opacity: 0.15 }}
    >
      <ScrollView
        style={{ paddingTop: 90 }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              marginLeft: "5%",
              marginRight: "5%",
              fontWeight: "bold",
              paddingBottom: 20,
            }}
          >
            {name}
          </Text>
          {Prerequisites != "None" && (
            <View
              style={{
                backgroundColor: "rgba(255,255,255, .6)",
                shadowColor: "rgba(0,0,0, .4)", // IOS
                shadowOffset: { height: 5, width: 5 }, // IOS
                shadowOpacity: 1, // IOS
                elevation: 10,
                borderRadius: 20,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Text
                style={{
                  marginLeft: "5%",
                  marginRight: "5%",
                  opacity: 1,
                  marginBottom: "5%",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {"\n"}Prerequisites
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  : {Prerequisites}
                </Text>
              </Text>
            </View>
          )}
          <Text style={{ marginLeft: "5%", marginRight: "5%" }}>
            <Text
              style={{
                fontSize: 20,

                fontWeight: "bold",
              }}
            >
              {"\n"}Credits
            </Text>
            {Credits.map((item, index) => {
              if (index == 0) {
                return <Text style={{ fontSize: 20 }}>: {Credits[0]}</Text>;
              } else {
                return <Text style={{ fontSize: 20 }}>, {Credits[index]}</Text>;
              }
            })}
          </Text>
          <Text style={{ marginLeft: "5%", marginRight: "5%" }}>
            <Text
              style={{
                fontSize: 20,

                fontWeight: "bold",
              }}
            >
              {"\n"}Subject
            </Text>
            {subject.map((item, index) => {
              if (index == 0) {
                return <Text style={{ fontSize: 20 }}>: {subject[0]}</Text>;
              } else {
                return <Text style={{ fontSize: 20 }}>, {subject[index]}</Text>;
              }
            })}
          </Text>
          {GPA != "None" && (
            <Text style={{ marginLeft: "5%", marginRight: "5%" }}>
              <Text
                style={{
                  fontSize: 20,

                  fontWeight: "bold",
                }}
              >
                {"\n"}GPA
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                : {GPA}
              </Text>
            </Text>
          )}
          {Length != "None" && (
            <Text style={{ marginLeft: "5%", marginRight: "5%" }}>
              <Text
                style={{
                  fontSize: 20,

                  fontWeight: "bold",
                }}
              >
                {"\n"}Length
              </Text>
              {creditDict[name].Length.map((item, index) => {
                if (index == 0) {
                  return (
                    <Text style={{ fontSize: 20 }}>
                      : {creditDict[name].Length[0]}
                    </Text>
                  );
                } else {
                  return (
                    <Text style={{ fontSize: 20 }}>
                      , {creditDict[name].Length[index]}
                    </Text>
                  );
                }
              })}
            </Text>
          )}
          {Description != "None" && (
            <Text style={{ marginLeft: "5%", marginRight: "5%" }}>
              <Text
                style={{
                  fontSize: 20,

                  fontWeight: "bold",
                }}
              >
                {"\n"}Description
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                : {Description}
              </Text>
            </Text>
          )}
          {Notes != "None" && (
            <Text
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "10%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {"\n"}Counseling Notes
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                : {Notes}
              </Text>
            </Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
