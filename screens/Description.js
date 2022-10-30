import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

export default function Description({ navigation, route }) {
  var creditDict = require("../classDict.json");

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
    for (let i = 0; i < subject.length; i++) {
      requirements[subject[i]] += parseFloat(Credits[i]);
    }
    if (Length == "Year-long on a block") {
      schedule[number] = name;
      schedule[number + addition] = name;
      oSchedule[number] = name;
      oSchedule[number + addition] = name;
    }
    if (Length == "Semester") {
      if (Class == oSchedule[number] && Class == oSchedule[number + addition]) {
        oSchedule[number] = "Click Here to Add Class!";
        oSchedule[number + addition] = "Click Here to Add Class!";
      }
      if (Class == oSchedule[number]) {
        oSchedule[number] = "Click Here to Add Class!";
      }
      if (schedule[number + addition] == oSchedule[number + addition]) {
        oSchedule[number + addition] = "Click Here to Add Class!";
      }
      schedule[number] = name;
      schedule[number + addition] = name;
    }
    if (Length == "Term") {
      if (
        oSchedule[number + addition] == oSchedule[number] &&
        schedule[number + addition] == oSchedule[number]
      ) {
        // is a block
        oSchedule[number] = "Click Here to Add Class!";
        oSchedule[number + addition] = "Click Here to Add Class!";
        schedule[number + addition] = "Click Here to Add Class!";
      }
      if (Class == schedule[number + addition]) {
        // is a semester
        schedule[number + addition] = "Click Here to Add Class!";
      }
      if (oSchedule[number] == Class) {
        oSchedule[number] = "Click Here to Add Class!";
      }
      schedule[number] = name;
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
      if (fall[i] != tempFall[i]) {
        difference[index] = tempFall[i];
        index += 1;
      }
      if (spring[i] != tempSpring[i]) {
        difference[index] = tempSpring[i];
        index += 1;
      }
    }
    var visited = ["", "", "", ""];
    for (let i = 0; i < 4; i++) {
      if (difference[i] == "") {
        continue;
      }
      if (visited.indexOf(difference[i]) != -1) {
        continue;
      }
      if (difference[i] == "Click Here to Add Class!") {
        continue;
      }
      visited[i] = difference[i];
      for (let j = 0; j < creditDict[difference[i]].Subject.length; j++) {
        requirements[creditDict[difference[i]].Subject[j]] -= parseFloat(
          creditDict[difference[i]].Credits[j]
        );
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
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../ORHS.png")}
          style={{
            width: "100%",
            position: "absolute",
            opacity: 0.15,
          }}
        />

        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            marginLeft: "5%",
            marginRight: "5%",
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
        <Text style={{ marginLeft: "5%", marginRight: "5%" }}>
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
        <Text style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Text
            style={{
              fontSize: 20,

              fontWeight: "bold",
            }}
          >
            {"\n"}Credits
          </Text>
          {creditDict[name].Credits.map((item, index) => {
            if (index == 0) {
              return (
                <Text style={{ fontSize: 20 }}>
                  : {creditDict[name].Credits[0]}
                </Text>
              );
            } else {
              return (
                <Text style={{ fontSize: 20 }}>
                  , {creditDict[name].Credits[index]}
                </Text>
              );
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
          {creditDict[name].Subject.map((item, index) => {
            if (index == 0) {
              return (
                <Text style={{ fontSize: 20 }}>
                  : {creditDict[name].Subject[0]}
                </Text>
              );
            } else {
              return (
                <Text style={{ fontSize: 20 }}>
                  , {creditDict[name].Subject[index]}
                </Text>
              );
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
        <Text
          style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "10%" }}
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
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
