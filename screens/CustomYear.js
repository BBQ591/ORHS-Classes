import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Swipeout from "react-native-swipeout";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Button,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Credits({ navigation, route }) {
  const image2 = require("../page10.png");
  const requirements = route.params.requirements;
  const requirement = [
    "Career Academies",
    "English",
    "Fine Arts",
    "Social Studies",
    "Math",
    "Science",
    "Wellness",
    "World Languages",
    "Special Programs",
  ];
  const number = ["0", "4", "1", "3.5", "4", "3", "1.5", "2", "0"];
  return (
    <ScrollView>
      <ImageBackground source={image2}>
        <View style={styles.creditWord}>
          <Text
            style={{
              fontSize: 40,
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            TOTAL CREDITS
          </Text>
        </View>
        {requirement.map((item, i) => {
          if (requirements[item] >= number[i]) {
            return (
              <View style={styles.credits}>
                <Text style={{ fontSize: 20, color: "green" }}>
                  {item}: {requirements[item]} / {number[i]}
                </Text>
              </View>
            );
          } else {
            return (
              <View style={styles.credits}>
                <Text style={{ fontSize: 20 }}>
                  {item}: {requirements[item]} / {number[i]}
                </Text>
              </View>
            );
          }
        })}
      </ImageBackground>
    </ScrollView>
  );
}
function Schedule({ navigation, route }) {
  const { fall, requirements } = route.params;
  console.log(typeof fall);

  const isFocused = useIsFocused();
  const [dummy, setDummy] = useState(false);
  useEffect(() => {
    setDummy(!dummy);
  }, [isFocused]);
  // if (fall[0] == 'Click Here to Add Previously Taken Classes!' || fall.length == 1) {
  //     fall = [['Click Here to Add Previously Taken Classes!', 0, 0]];
  // }
  var schedule = fall;
  const pressHandler = () => {
    navigation.navigate("Add Class", {
      fall: fall,
      requirements: requirements,
    });
  };
  var count = 0;

  const pressHandler2 = (index) => {
    if (typeof fall[index][1] == "object") {
      for (const indexer in fall[index][1]) {
        requirements[fall[index][2][indexer]] -= fall[index][1][indexer];
      }
    } else {
      requirements[fall[index][2]] -= fall[index][1];
    }
    fall.splice(index, 1);
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
    setDummy(!dummy);
  };
  const pressHandler3 = (item) => {
    navigation.navigate("Description", {
      FS: "Fall (edit)",
      name: item[0],
      GPA: "None",
      Length: "None",
      Credits: item[1],
      Description: "None",
      Prerequisites: "None",
      Notes: "None",
      subject: item[2],
      fall: fall,
      spring: [],
      requirements: requirements,
      Class: item,
    });
  };
  const testing = (index) => {
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          pressHandler2(index);
        },
      },
    ];
    return swipeBtns;
  };
  return (
    <ScrollView style={{ backgroundColor: "#893940" }}>
      {schedule.map((item, index) => {
        if (item[0] == "Click Here to Add Previously Taken Classes!") {
          return (
            <TouchableOpacity onPress={() => pressHandler()}>
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  height: 80,
                  marginTop: 0,
                  backgroundColor: "grey",
                  padding: 0,
                  borderBottomColor: "white",
                  borderBottomWidth: 1,
                  alignItems: "center",
                  opacity: 0.9,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {item[0]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        } else {
          return (
            <Swipeout right={testing(index)} style={{ opacity: 0.9 }}>
              <TouchableOpacity onPress={() => pressHandler3(item)}>
                <View style={styles.overall}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {item[0]}
                  </Text>
                </View>
              </TouchableOpacity>
            </Swipeout>
          );
        }
      })}
    </ScrollView>
  );
}
const Tab = createBottomTabNavigator();

export default function ChooseClasses({ navigation, route }) {
  var { fall, requirements } = route.params;

  // if (fall[0] == 'Click Here to Add Class!' || fall.length == 1) {
  //     fall = [['Click Here to Add Previously Taken Classes!', 0, 0]];
  // }
  // navigation.setParams({
  //     fall: fall,
  //     requirements: requirements,
  //     year: year,
  // });
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Schedule") {
            return (
              <MaterialCommunityIcons
                name="table-column"
                size={24}
                color="black"
              />
            );
          } else {
            return <AntDesign name="menuunfold" size={24} color="black" />;
          }
          // You can return any component that you like here!
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Schedule"
        options={{
          title: "Schedule",
          headerStyle: {
            height: 0,
          },
        }}
        component={Schedule}
        initialParams={{
          fall: fall,
          requirements: requirements,
        }}
      />
      <Tab.Screen
        options={{
          title: "Credits",
          headerStyle: {
            height: 0,
          },
        }}
        name="Credits"
        component={Credits}
        initialParams={{
          requirements: requirements,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  overall2: {
    justifyContent: "center",
    width: "100%",
    height: 80,
    marginTop: 0,
    backgroundColor: "grey",
    padding: 0,
    borderBottomColor: "#893940",
    borderBottomWidth: 7,

    alignItems: "center",
  },
  overall: {
    justifyContent: "center",
    width: "100%",
    height: 80,
    marginTop: 0,
    backgroundColor: "grey",
    padding: 0,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    opacity: 1,
  },
  credits: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#d1d1d1",
    padding: "0%",
    borderTopColor: "black",
    borderTopWidth: 1,
    opacity: 0.9,
  },
  creditWord: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#f3b60c",
    padding: "0%",
    top: 0,
    opacity: 0.9,
  },
  overall5: {
    // alignItems: 'center',
    justifyContent: "center",
    width: "50%",
    height: 100,
    marginTop: 0,
    backgroundColor: "grey",
    padding: "0%",
    borderBottomColor: "#893940",
    borderBottomWidth: 7,
    paddingLeft: 3,
    paddingRight: 3,
  },
  overall6: {
    justifyContent: "center",
    width: "50%",
    height: 100,
    marginTop: 0,
    backgroundColor: "grey",
    padding: "0%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
  },
  overall3: {
    justifyContent: "center",
    width: "50%",
    height: 100,
    marginTop: 0,
    backgroundColor: "grey",
    padding: "0%",
    borderBottomColor: "#893940",
    borderBottomWidth: 7,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
  },
  overall4: {
    top: -940,
    justifyContent: "center",
    width: "50%",
    height: 100,
    marginTop: 0,
    backgroundColor: "grey",
    padding: "0%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
  },
  text: { textAlign: "center" },
});
