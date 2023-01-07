import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
export default function Home({ navigation, route }) {
  var dict = require("../subjectDict.json");
  const image = require("../combined.png");
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
      inSearchMode: false,
    });
  };
  return (
    <ImageBackground
      source={image}
      imageStyle={{ opacity: 0.5 }}
      resizeMode="cover"
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{ paddingTop: 80, width: "100%" }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.container}>
          {dict[name].map((item) => {
            if (item.Length.indexOf(length) != -1) {
              return (
                <TouchableOpacity
                  onPress={() => pressHandler(item)}
                  activeOpacity={0.6}
                >
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
  items: {
    backgroundColor: "#6a9495",
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    elevation: 10,
    opacity: 0.9,
  },
});
