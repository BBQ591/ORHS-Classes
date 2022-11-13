import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CAacademies({ navigation, route }) {
  const image = require("../combined.png");
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
  const {
    FS,
    name,
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
  };
  var dict = require("../subjectDict.json");

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
        style={{ paddingTop: 80 }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={{ alignItems: "center" }}>
          {academies.map((item) => {
            if (
              dict[item].filter((currClass) => currClass.Length.includes(add))
                .length != 0
            ) {
              return (
                <TouchableOpacity
                  onPress={() => pressHandler(item)}
                  style={{
                    shadowColor: "rgba(0,0,0, .4)", // IOS
                    shadowOffset: { height: 5, width: 5 }, // IOS
                    shadowOpacity: 1, // IOS
                    elevation: 10,
                    opacity: 0.9,
                  }}
                >
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {item}
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
  items: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    marginTop: 24,
    padding: 30,
    backgroundColor: "#6a9495",
    fontSize: 40,
    // height: 110,
    borderRadius: 15,
  },
});
