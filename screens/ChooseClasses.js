import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  Fontisto,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Swipeout from "react-native-swipeout";
const creditDict = require("../classDict.json");

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Overview({ navigation, route }) {
  const { fall, spring, lunchClass } = route.params;
  var count = 0;
  var tempLunch = lunchClass;
  if (tempLunch == "Click Here to Add Class!") {
    tempLunch = "No Class Here";
  }
  var tempFall = Array.from(fall);
  var tempSpring = Array.from(spring);
  for (let i = 0; i < 8; i++) {
    if (fall[i] == "Click Here to Add Class!") {
      tempFall[i] = "No Class Here";
    }
    if (spring[i] == "Click Here to Add Class!") {
      tempSpring[i] = "No Class Here";
    }
  }
  var Fblock = false;
  var Sblock = false;
  var year = false;
  return (
    <ScrollView style={{ backgroundColor: "#893940" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#893940",
            height: 90,
            width: "50%",
          }}
        >
          <Text
            style={{
              fontSize: 60,
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            Fall
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#893940",
            height: 90,
            width: "50%",
            borderLeftColor: "black",
            borderLeftWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 60,
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            Spring
          </Text>
        </View>
      </View>
      {tempFall.map((item2, i) => {
        Fblock = false;
        Sblock = false;
        year = false;
        // remember to do i+1 at the end
        if (
          tempFall[i] == tempSpring[i + 1] &&
          tempFall[i] != "No Class Here"
        ) {
          year = true;
        } else {
          if (
            tempFall[i] == tempFall[i + 1] &&
            tempFall[i] != "No Class Here"
          ) {
            Fblock = true;
          }
          if (
            tempSpring[i] == tempSpring[i + 1] &&
            tempSpring[i] != "No Class Here"
          ) {
            Sblock = true;
          }
        }
        if (i % 2 == 0) {
          if (year) {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <View style={styles.same}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {item2}
                  </Text>
                </View>
              </View>
            );
          } else if (Fblock && Sblock == false) {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <View style={styles.sameL}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {item2}
                  </Text>
                </View>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <View style={styles.right1}>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 18,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {tempSpring[i]}
                    </Text>
                  </View>
                  <View style={styles.right2}>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 18,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {tempSpring[i + 1]}
                    </Text>
                  </View>
                </View>
              </View>
            );
          } else if (Sblock && Fblock == false) {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <View style={{ width: "50%" }}>
                  <View style={styles.left1}>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 18,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {item2}
                    </Text>
                  </View>
                  <View style={styles.left2}>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 18,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {tempFall[i + 1]}
                    </Text>
                  </View>
                </View>

                <View style={styles.sameR}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {tempSpring[i]}
                  </Text>
                </View>
              </View>
            );
          } else if (Sblock && Fblock) {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <View style={styles.sameL}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {item2}
                  </Text>
                </View>
                <View style={styles.sameR}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {tempSpring[i]}
                  </Text>
                </View>
              </View>
            );
          }
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <View
                style={{
                  width: "50%",
                }}
              >
                <View style={styles.overall}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 18,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {item2}
                  </Text>
                </View>
                <View style={styles.overall2}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 18,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {tempFall[i + 1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "50%",
                  borderLeftColor: "black",
                  borderLeftWidth: 1,
                }}
              >
                <View style={styles.overall}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 18,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {tempSpring[i]}
                  </Text>
                </View>
                <View style={styles.overall2}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 18,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {tempSpring[i + 1]}
                  </Text>
                </View>
              </View>
            </View>
          );
        }
        i += 1;
      })}
      <View
        style={{
          justifyContent: "center",
          width: "100%",
          height: 50,
          marginTop: 0,
          backgroundColor: "grey",
          padding: "0%",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            color: "white",
            textAlign: "center",
          }}
        >
          Lunch Class: {tempLunch}
        </Text>
      </View>
    </ScrollView>
  );
}

function Credits({ navigation, route }) {
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
    </ScrollView>
  );
}
function Schedule({ navigation, route }) {
  const isFocused = useIsFocused();
  useEffect(() => {
    //Update the state you want to be updated
  }, [isFocused]);
  const { FS, fall, spring, lunchClass, requirements, year } = route.params;
  var schedule;
  var title;
  if (FS == "Fall (edit)") {
    title = "Fall";
    schedule = fall;
  } else {
    title = "Spring";
    schedule = spring;
  }
  const chooseL = (item, item2, number) => {
    // Direction is true if we need to delete up, false if we need to delete down
    navigation.navigate("Pick Action", {
      FS: FS,
      Class: item2,
      fall: fall,
      spring: spring,
      time: item,
      lunchClass: lunchClass,
      requirements: requirements,
      year,
      number,
    });
  };
  const toDelete = (Class, number) => {
    var schedule = spring;
    var oSchedule = fall;
    if (FS == "Fall (edit)") {
      schedule = fall;
      oSchedule = spring;
    }
    var addition = 1;
    if (number % 2 == 1) {
      addition = -1;
    }
    if (
      oSchedule[number + addition] == oSchedule[number] &&
      schedule[number + addition] == oSchedule[number] &&
      oSchedule[number] == Class
    ) {
      // is a year-long block
      oSchedule[number] = "Click Here to Add Class!";
      oSchedule[number + addition] = "Click Here to Add Class!";
      schedule[number + addition] = "Click Here to Add Class!";
    }
    if (Class == schedule[number + addition]) {
      // is semester
      schedule[number + addition] = "Click Here to Add Class!";
    }
    if (Class == oSchedule[number]) {
      // is skinny year-long
      oSchedule[number] = "Click Here to Add Class!";
    }
    schedule[number] = "Click Here to Add Class!";
    for (let i = 0; i < creditDict[Class].Credits.length; i++) {
      requirements[creditDict[Class].Subject[i]] -= parseFloat(
        creditDict[Class].Credits[i]
      );
    }
    const _storeData = async () => {
      try {
        if (year == "Freshman") {
          await AsyncStorage.setItem("FreshmanFall", JSON.stringify(fall)),
            await AsyncStorage.setItem(
              "FreshmanSpring",
              JSON.stringify(spring)
            ),
            await AsyncStorage.setItem("lunchFresh", lunchClass[0]),
            await AsyncStorage.setItem(
              "requirements",
              JSON.stringify(requirements)
            );
        }
        if (year == "Sophomore") {
          await AsyncStorage.setItem("SophomoreFall", JSON.stringify(fall)),
            await AsyncStorage.setItem(
              "SophomoreSpring",
              JSON.stringify(spring)
            ),
            await AsyncStorage.setItem("lunchSoph", lunchClass[0]),
            await AsyncStorage.setItem(
              "requirements",
              JSON.stringify(requirements)
            );
        }
        if (year == "Junior") {
          await AsyncStorage.setItem("JuniorFall", JSON.stringify(fall)),
            await AsyncStorage.setItem("JuniorSpring", JSON.stringify(spring)),
            await AsyncStorage.setItem("lunchJun", lunchClass[0]),
            await AsyncStorage.setItem(
              "requirements",
              JSON.stringify(requirements)
            );
        }
        if (year == "Senior") {
          await AsyncStorage.setItem("SeniorFall", JSON.stringify(fall)),
            await AsyncStorage.setItem("SeniorSpring", JSON.stringify(spring)),
            await AsyncStorage.setItem("lunchSen", lunchClass[0]),
            await AsyncStorage.setItem(
              "requirements",
              JSON.stringify(requirements)
            );
        }
        if (year == "Playground") {
          await AsyncStorage.setItem("PlaygroundFall", JSON.stringify(fall)),
            await AsyncStorage.setItem(
              "PlaygroundSpring",
              JSON.stringify(spring)
            ),
            await AsyncStorage.setItem("lunchPlay", lunchClass[0]),
            await AsyncStorage.setItem(
              "requirements",
              JSON.stringify(requirements)
            );
        }
      } catch (error) {
        // Error saving data
      }
    };
    _storeData();
    setDummy(!dummy);
  };
  const pressHandler = (item, item2) => {
    navigation.navigate("Subjects", {
      FS: FS,
      add: item,
      fall: fall,
      spring: spring,
      time: item2,
      lunchClass: lunchClass,
      requirements: requirements,
      year,
    });
  };
  const [dummy, setDummy] = useState(false);
  const testing = (name, number) => {
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          toDelete(name, number);
        },
      },
    ];
    return swipeBtns;
  };
  var count = 0;
  return (
    <ScrollView style={{ backgroundColor: "#893940" }}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#893940",
          height: 80,
          // flexDirection: 'row',
          // flexWrap: 'wrap',
          // alignItems: 'flex-start',
          // flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 60,
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </View>
      {schedule.map((item, index) => {
        count += 1;
        if (item != "Click Here to Add Class!") {
          if (count % 2 == 1) {
            // Checks if they are the same
            if (schedule[index] == schedule[index + 1]) {
              return (
                <Swipeout right={testing(item, index)}>
                  <TouchableOpacity
                    onPress={() => chooseL(title, schedule[index], index)}
                  >
                    <View style={styles.same}>
                      <Text
                        style={{
                          fontSize: 30,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Swipeout>
              );
              // if they aren't the same
            } else {
              return (
                <Swipeout right={testing(item, index)}>
                  <TouchableOpacity
                    onPress={() => chooseL(title, schedule[index], index)}
                  >
                    <View style={styles.overall}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Swipeout>
              );
            }
          } else {
            if (schedule[index] != schedule[index - 1]) {
              return (
                <Swipeout right={testing(item, index)}>
                  <TouchableOpacity
                    onPress={() => chooseL(title, schedule[index], index)}
                  >
                    <View style={styles.overall2}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Swipeout>
              );
            }
          }
        } else {
          if (count % 2 == 1) {
            return (
              <TouchableOpacity
                onPress={() => chooseL(title, schedule[index], index)}
              >
                <View style={styles.overall}>
                  <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() => chooseL(title, schedule[index], index)}
              >
                <View style={styles.overall2}>
                  <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        }
      })}
      <TouchableOpacity
        onPress={() => pressHandler("Year-long skinny at lunch", "")}
      >
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            height: 80,
            marginTop: 0,
            backgroundColor: "grey",
            padding: "0%",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              color: "white",
            }}
          >
            Lunch Class: {lunchClass[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
const Tab = createBottomTabNavigator();

export default function ChooseClasses({ navigation, route }) {
  const { fall, spring, lunchClass, requirements, year } = route.params;
  console.log(
    "STARTTTTTTT",
    fall,
    spring,
    lunchClass,
    requirements,
    year,
    "HIIIIIIIIIIII"
  );
  const _storeData = async () => {
    try {
      if (year == "Freshman") {
        console.log("SAVING TO FRESHMAN", fall, spring, "ENDDDD");

        await AsyncStorage.setItem("FreshmanFall", JSON.stringify(fall)),
          await AsyncStorage.setItem("FreshmanSpring", JSON.stringify(spring)),
          await AsyncStorage.setItem("lunchFresh", lunchClass[0]),
          await AsyncStorage.setItem(
            "requirements",
            JSON.stringify(requirements)
          );
      }
      if (year == "Sophomore") {
        await AsyncStorage.setItem("SophomoreFall", JSON.stringify(fall)),
          await AsyncStorage.setItem("SophomoreSpring", JSON.stringify(spring)),
          await AsyncStorage.setItem("lunchSoph", lunchClass[0]),
          await AsyncStorage.setItem(
            "requirements",
            JSON.stringify(requirements)
          );
      }
      if (year == "Junior") {
        await AsyncStorage.setItem("JuniorFall", JSON.stringify(fall)),
          await AsyncStorage.setItem("JuniorSpring", JSON.stringify(spring)),
          await AsyncStorage.setItem("lunchJun", lunchClass[0]),
          await AsyncStorage.setItem(
            "requirements",
            JSON.stringify(requirements)
          );
      }
      if (year == "Senior") {
        await AsyncStorage.setItem("SeniorFall", JSON.stringify(fall)),
          await AsyncStorage.setItem("SeniorSpring", JSON.stringify(spring)),
          await AsyncStorage.setItem("lunchSen", lunchClass[0]),
          await AsyncStorage.setItem(
            "requirements",
            JSON.stringify(requirements)
          );
      }
      if (year == "Playground") {
        await AsyncStorage.setItem("PlaygroundFall", JSON.stringify(fall)),
          await AsyncStorage.setItem(
            "PlaygroundSpring",
            JSON.stringify(spring)
          ),
          await AsyncStorage.setItem("lunchPlay", lunchClass[0]),
          await AsyncStorage.setItem(
            "requirements",
            JSON.stringify(requirements)
          );
      }
    } catch (error) {
      // Error saving data
    }
  };
  _storeData();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Fall") {
            return (
              <MaterialCommunityIcons
                name="table-column"
                size={24}
                color="black"
              />
            );
          } else if (route.name == "Spring") {
            return (
              <MaterialCommunityIcons
                name="table-column"
                size={24}
                color="black"
              />
            );
          } else if (route.name == "Schedule Overview") {
            iconName = focused ? "columns" : "columns";
            return <Fontisto name={iconName} size={size} color={color} />;
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
        name="Fall"
        options={{
          title: "Fall",
          headerStyle: {
            height: 0,
          },
        }}
        component={Schedule}
        initialParams={{
          FS: "Fall (edit)",
          fall: fall,
          spring: spring,
          lunchClass: lunchClass,
          requirements: requirements,
          year: year,
        }}
      />
      <Tab.Screen
        options={{
          title: "Spring",
          headerStyle: {
            height: 0,
          },
        }}
        name="Spring"
        component={Schedule}
        initialParams={{
          FS: "Spring (edit)",
          fall: fall,
          spring: spring,
          lunchClass: lunchClass,
          requirements: requirements,
          year: year,
        }}
      />
      <Tab.Screen
        options={{
          title: "Schedule Overview",
          headerStyle: {
            height: 0,
          },
        }}
        name="Schedule Overview"
        component={Overview}
        initialParams={{
          fall: fall,
          spring: spring,
          lunchClass: lunchClass,
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
  },
  creditWord: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#f3b60c",
    padding: "0%",
    top: 0,
  },
  text: { textAlign: "center" },
  same: {
    justifyContent: "center",
    width: "100%",
    height: 160,
    marginTop: 0,
    backgroundColor: "grey",
    padding: 0,
    borderBottomColor: "#893940",
    borderBottomWidth: 7,
    alignItems: "center",
  },
  sameL: {
    justifyContent: "center",
    width: "50%",
    height: 160,
    marginTop: 0,
    backgroundColor: "grey",
    padding: 0,
    borderBottomColor: "#893940",
    borderBottomWidth: 7,
    alignItems: "center",
    borderRightColor: "black",
    borderRightWidth: 1,
  },
  right1: {
    justifyContent: "center",
    width: "100%",
    height: 80,
    marginTop: 0,
    backgroundColor: "grey",
    padding: 0,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  right2: {
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
  sameR: {
    justifyContent: "center",
    width: "50%",
    height: 160,
    marginTop: 0,
    backgroundColor: "grey",
    padding: 0,
    borderBottomColor: "#893940",
    borderBottomWidth: 7,
    alignItems: "center",
    borderLeftColor: "black",
    borderLeftWidth: 1,
  },
  left1: {
    justifyContent: "center",
    width: "100%",
    height: 80,
    marginTop: 0,
    backgroundColor: "grey",
    padding: 0,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  left2: {
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
});
