import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Original({ navigation, route }) {
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
    <ScrollView>
      <View style={{ backgroundColor: "#6a9495", alignItems: "center" }}>
        {people.map((item) => {
          return (
            <TouchableOpacity onPress={() => pressHandler(item)}>
              <View style={styles.items}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
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
  },
});
