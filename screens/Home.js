import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
export default function Home({ navigation, route }) {
  var dict = require("../subjectDict.json");
  const {
    FS,
    name,
    length,
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
    console.log(number);
    navigation.navigate("Description", {
      FS: FS,
      name: items.Name,
      GPA: items.GPA,
      Length: length,
      Credits: items.Credits,
      Description: items.Description,
      Prerequisites: items.Prerequisites,
      Notes: items.Notes,
      subject: items.Subject,
      fall: fall,
      spring: spring,
      time: time,
      lunchClass: lunchClass,
      requirements: requirements,
      year: year,
      Class: Class,
      number: number,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {dict[name].map((item) => {
          if (item.Length.indexOf(length) != -1) {
            return (
              <TouchableOpacity onPress={() => pressHandler(item)}>
                <View style={styles.items}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {item.Name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1d1d1",
    alignItems: "center",
    justifyContent: "center",
  },
  items: {
    backgroundColor: "#893940",
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    borderRadius: 15,
  },
});
