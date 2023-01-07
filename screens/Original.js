import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function Original({ navigation, route }) {
  var dict = require("../subjectDict.json");
  const image = require("../combined2.png");
  const academies = [
    "Advanced Manufacturing",
    "Arts & A/V Communications",
    "Business",
    "Early Childhood Education",
    "Government and Public Administration",
    "Health Science",
    "Information Technology and Cyber Security",
    "STEM",
    "Transportation",
  ];
  const people = [
    "Career Academies",
    "English",
    "Visual Arts",
    "Math",
    "Science",
    "Social Studies",
    "World Languages",
    "Special Programs",
    "Wellness",
    "Performing Arts",
  ];
  const {
    FS,
    add,
    fall,
    spring,
    time,
    lunchClass,
    requirements,
    year,
    Class,
    number,
  } = route.params;
  const pressHandler = (items) => {
    console.log(number, "poooop");
    if (items != "Career Academies") {
      navigation.navigate("Classes", {
        FS: FS,
        name: items,
        length: add,
        fall: fall,
        spring: spring,
        time: time,
        lunchClass: lunchClass,
        requirements: requirements,
        year: year,
        Class,
        number,
      });
    } else {
      navigation.navigate("Academies", {
        FS: FS,
        name: "Career Academies",
        add: add,
        fall: fall,
        spring: spring,
        time: time,
        lunchClass: lunchClass,
        requirements: requirements,
        year: year,
        Class,
        number,
      });
    }
  };
  return (
    <ImageBackground
      source={image}
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
      imageStyle={{ opacity: 0.5 }}
      resizeMode="cover"
    >
      <ScrollView
        style={{ paddingTop: 80, width: "100%" }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={{ alignItems: "center" }}>
          {people.map((item) => {
            if (item == "Career Academies") {
              console.log();
              var count = 0;
              academies.map((academy) => {
                if (
                  dict[academy].filter((currClass) =>
                    currClass.Length.includes(add)
                  ).length != 0
                ) {
                  count += 1;
                }
              });
              if (count > 0) {
                return (
                  <TouchableOpacity
                    onPress={() => pressHandler(item)}
                    activeOpacity={0.6}
                  >
                    <View style={styles.items}>
                      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            } else {
              if (
                dict[item].filter((currClass) => currClass.Length.includes(add))
                  .length != 0
              ) {
                console.log(
                  dict[item].filter((currClass) =>
                    currClass.Length.includes(add)
                  ).length,
                  item
                );
                return (
                  <TouchableOpacity
                    onPress={() => pressHandler(item)}
                    activeOpacity={0.6}
                  >
                    <View style={styles.items}>
                      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            }
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  items: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    marginTop: 24,
    padding: 30,
    backgroundColor: "#d1d1d1",
    fontSize: 40,
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    elevation: 10,
    opacity: 0.9,
  },
});
