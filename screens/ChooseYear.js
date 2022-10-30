import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ChooseYear({ navigation, route }) {
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const [isVisible3, setisVisible3] = useState(false);
  // AsyncStorage.clear();
  var alphaKeyDict = require("../alphaKeyDict.json");
  const skywardRest = require("../skyward-rest");
  const url =
    "https://skyed.ortn.edu/scripts/wsisa.dll/WService=wsEAplus/seplog01.w";
  const scraper = skywardRest(url); // the scraper!

  const alphaKeys = [];
  var takenClasses = [];
  var takenCredits = {
    English: 0,
    Math: 0,
    Science: 0,
    "Social Studies": 0,
    Wellness: 0,
    "World Languages": 0,
    "Fine Arts": 0,
    "Career Academies": 0,
    "Special Programs": 0,
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => pressHandler10()} title="Reset" />
      ),
    });
  }, [navigation]);
  const pressHandler10 = () => {
    Alert.alert(
      "WARNING",

      "ARE YOU SURE YOU WANT TO RESET ALL OF YOUR CLASSES?",
      [
        { text: "CANCEL", onPress: () => console.log("OK Pressed") },
        {
          text: "YES",
          onPress: () => {
            AsyncStorage.clear();
            setisVisible3(true);
            setYears(["Freshman", "Sophomore", "Junior", "Senior"]);
          },
        },
      ]
    );
  };
  const convertData = (alphaKeys, graduation) => {
    var theList;
    for (const key in alphaKeys) {
      for (const [key2, value2] of Object.entries(alphaKeyDict)) {
        theList = key2.split(/\s+/);
        if (theList.includes(alphaKeys[key])) {
          for (const index1 in alphaKeyDict[key2].Subject) {
            alphaKeyDict[key2].Credits[index1] = parseFloat(
              alphaKeyDict[key2].Credits[index1]
            );
          }
          if (
            JSON.stringify(takenClasses).indexOf(
              JSON.stringify([
                alphaKeyDict[key2].name,
                alphaKeyDict[key2].Credits,
                alphaKeyDict[key2].Subject,
              ])
            ) == -1
          ) {
            for (const index1 in alphaKeyDict[key2].Subject) {
              takenCredits[alphaKeyDict[key2].Subject[index1]] +=
                alphaKeyDict[key2].Credits[index1];
            }

            takenClasses.push([
              alphaKeyDict[key2].name,
              alphaKeyDict[key2].Credits,
              alphaKeyDict[key2].Subject,
            ]);
          }
        }
      }
    }
    console.log(takenClasses);
    takenClasses.push(["Click Here to Add Previously Taken Classes!", 0, 0]);
    const _storeData2 = async (takenClasses, credits, graduation) => {
      try {
        await AsyncStorage.setItem(
          "takenClasses",
          JSON.stringify(takenClasses)
        );
        await AsyncStorage.setItem("requirements", JSON.stringify(credits));
        await AsyncStorage.setItem(
          "PlaygroundFall",
          JSON.stringify([
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
          ])
        );
        await AsyncStorage.setItem(
          "PlaygroundSpring",
          JSON.stringify([
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
          ])
        );
        await AsyncStorage.setItem("lunchPlay", "Click Here to Add Class!");
        await AsyncStorage.setItem(
          "PlaygroundSpring",
          JSON.stringify([
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
            "Click Here to Add Class!",
          ])
        );
        if (graduation - 2023 >= 1) {
          await AsyncStorage.setItem(
            "SeniorFall",
            JSON.stringify([
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
            ])
          );
          await AsyncStorage.setItem("lunchSen", "Click Here to Add Class!");
          await AsyncStorage.setItem(
            "SeniorSpring",
            JSON.stringify([
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
            ])
          );
          if (graduation - 2023 >= 2) {
            await AsyncStorage.setItem(
              "JuniorFall",
              JSON.stringify([
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
              ])
            );
            await AsyncStorage.setItem("lunchJun", "Click Here to Add Class!");
            await AsyncStorage.setItem(
              "JuniorSpring",
              JSON.stringify([
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
              ])
            );
            if (graduation - 2023 >= 3) {
              await AsyncStorage.setItem(
                "SophomoreFall",
                JSON.stringify([
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                ])
              );
              await AsyncStorage.setItem(
                "lunchSoph",
                "Click Here to Add Class!"
              );
              await AsyncStorage.setItem(
                "SophomoreSpring",
                JSON.stringify([
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                ])
              );
              if (graduation - 2023 == 4) {
                await AsyncStorage.setItem(
                  "FreshmanFall",
                  JSON.stringify([
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                  ])
                );
                await AsyncStorage.setItem(
                  "lunchFresh",
                  "Click Here to Add Class!"
                );
                await AsyncStorage.setItem(
                  "FreshmanSpring",
                  JSON.stringify([
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                  ])
                );
              }
            }
          }
        }
      } catch (error) {
        // Error saving data
        console.log("error saving data");
      }
    };
    console.log(takenCredits);
    _storeData2(takenClasses, takenCredits, graduation);
    setisVisible(false);
    setisVisible2(false);
  };
  var username;
  var password;
  const pressHandler = (year) => {
    const _retrieveData2 = async () => {
      // AsyncStorage.clear();
      try {
        var taken = await AsyncStorage.getItem("takenClasses");
        var graduation = await AsyncStorage.getItem("Graduation");
        var credits = await AsyncStorage.getItem("requirements");
        if (graduation != null) {
          var Playground = await AsyncStorage.getItem("PlaygroundFall");
          var Playground2 = await AsyncStorage.getItem("PlaygroundSpring");
          var lunchSen = await AsyncStorage.getItem("lunchSen");
          var lunchJun = await AsyncStorage.getItem("lunchJun");
          var lunchSoph = await AsyncStorage.getItem("lunchSoph");
          var lunchFresh = await AsyncStorage.getItem("lunchFresh");
          var Senior = await AsyncStorage.getItem("SeniorFall");
          var Senior2 = await AsyncStorage.getItem("SeniorSpring");
          var Junior = await AsyncStorage.getItem("JuniorFall");
          var Junior2 = await AsyncStorage.getItem("JuniorSpring");
          var Sophomore = await AsyncStorage.getItem("SophomoreFall");
          var Sophomore2 = await AsyncStorage.getItem("SophomoreSpring");
          var Freshman = await AsyncStorage.getItem("FreshmanFall");
          var Freshman2 = await AsyncStorage.getItem("FreshmanSpring");
          var credits = await AsyncStorage.getItem("requirements");
          var lunchPlay = await AsyncStorage.getItem("lunchPlay");
          return [
            JSON.parse(taken),
            JSON.parse(credits),
            JSON.parse(Freshman),
            JSON.parse(Freshman2),
            JSON.parse(Sophomore),
            JSON.parse(Sophomore2),
            JSON.parse(Junior),
            JSON.parse(Junior2),
            JSON.parse(Senior),
            JSON.parse(Senior2),
            JSON.parse(Playground),
            JSON.parse(Playground2),
            JSON.parse(credits),
            lunchFresh,
            lunchSoph,
            lunchJun,
            lunchSen,
            lunchPlay,
          ];
        } else {
          return [
            taken,
            credits,
            Freshman,
            Sophomore,
            Junior,
            Senior,
            Playground,
            credits,
          ];
        }
      } catch (error) {}
    };
    _retrieveData2().then((soup) => {
      if (year == "Classes Taken") {
        navigation.navigate("Class Taken", {
          fall: soup[0],
          requirements: soup[12],
        });
      }
      if (year == "Freshman") {
        navigation.navigate("Schedule", {
          FS: "Fall (edit)",
          fall: soup[2],
          spring: soup[3],
          lunchClass: [soup[13]],
          requirements: soup[12],
          year: "Freshman",
        });
      }
      if (year == "Sophomore") {
        navigation.navigate("Schedule", {
          FS: "Fall (edit)",
          fall: soup[4],
          spring: soup[5],
          lunchClass: [soup[14]],
          requirements: soup[12],
          year: "Sophomore",
        });
      }
      if (year == "Junior") {
        navigation.navigate("Schedule", {
          FS: "Fall (edit)",
          fall: soup[6],
          spring: soup[7],
          lunchClass: [soup[15]],
          requirements: soup[12],
          year: "Junior",
        });
      }
      if (year == "Senior") {
        navigation.navigate("Schedule", {
          FS: "Fall (edit)",
          fall: soup[8],
          spring: soup[9],
          lunchClass: [soup[16]],
          requirements: soup[12],
          year: "Senior",
        });
      }
      if (year == "Playground") {
        navigation.navigate("Schedule", {
          FS: "Fall (edit)",
          fall: soup[10],
          spring: soup[11],
          lunchClass: [soup[17]],
          requirements: soup[12],
          year: "Playground",
        });
      }
    });
  };
  const [years, setYears] = useState([
    "Freshman",
    "Sophomore",
    "Junior",
    "Senior",
  ]);
  console.log(years, "hi");
  useEffect(() => {
    console.log("HIIIIIIII");
    const _retrieveData = async () => {
      // AsyncStorage.clear();
      try {
        var graduation = await AsyncStorage.getItem("Graduation");
        console.log(graduation);
        if (graduation != null) {
          return [false, JSON.parse(graduation)];
        } else {
          return [true];
        }
      } catch (error) {}
    };
    _retrieveData().then((graduationYear) => {
      console.log(graduationYear);
      if (graduationYear[0] == true) {
        setisVisible3(true);
      }
      var currYears;
      if (graduationYear[0] == false) {
        if (graduationYear[1] - 2023 == 0) {
          currYears = ["Classes Taken", "Playground"];
        }
        if (graduationYear[1] - 2023 == 1) {
          currYears = ["Classes Taken", "Senior", "Playground"];
        }
        if (graduationYear[1] - 2023 == 2) {
          currYears = ["Classes Taken", "Junior", "Senior", "Playground"];
        }
        if (graduationYear[1] - 2023 == 3) {
          currYears = [
            "Classes Taken",
            "Sophomore",
            "Junior",
            "Senior",
            "Playground",
          ];
        }
        if (graduationYear[1] - 2023 == 4) {
          currYears = [
            "Classes Taken",
            "Freshman",
            "Sophomore",
            "Junior",
            "Senior",
            "Playground",
          ];
        }
        setYears(currYears);
      }
      // setisVisible(graduationYear[0]);
    });
  }, []);

  var text1 = null;
  var graduationTesting = null;
  const inputting = () => {
    username = text1;
    password = text2;
    if (graduationTesting - 2023 == 0) {
      setYears(["Classes Taken", "Playground"]);
    }
    if (graduationTesting - 2023 == 1) {
      setYears(["Classes Taken", "Senior", "Playground"]);
    }
    if (graduationTesting - 2023 == 2) {
      setYears(["Classes Taken", "Junior", "Senior", "Playground"]);
    }
    if (graduationTesting - 2023 == 3) {
      setYears([
        "Classes Taken",
        "Sophomore",
        "Junior",
        "Senior",
        "Playground",
      ]);
    }
    if (graduationTesting - 2023 == 4) {
      setYears([
        "Classes Taken",
        "Freshman",
        "Sophomore",
        "Junior",
        "Senior",
        "Playground",
      ]);
    }
    if ((username === "demoUsername") & (password === "12345")) {
      setisVisible2(true);
      convertData(
        ["313102", "323108", "303133", "333108", "313103"],
        graduationTesting
      );
    } else {
      scraper.gettingSessionID(username, password).then((authent) => {
        if (authent != "No username or password or it is invalid") {
          setisVisible2(true);

          scraper.scrapeReport(authent).then(({ raw }) => {
            const recurse = (course1, indexers, corNumID, Graduation) => {
              scraper
                .scrapeGradebook(
                  {
                    course: course1,
                  },
                  authent
                )
                .then(({ data }) => {
                  console.log(data);
                  alphaKeys.push(data);
                  indexers += 1;
                  if (indexers >= corNumID.length) {
                    // TODO: change 20 to length and call function
                    return convertData(alphaKeys, Graduation);
                  }
                  recurse(corNumID[indexers], indexers, corNumID, Graduation);
                });
            };
            // const test = (" " + raw).slice(1);
            // const sourceStr = test;
            // const searchStr = "'corNumID'";
            // const indexes = [
            //   ...sourceStr.matchAll(new RegExp(searchStr, "ig")),
            // ].map((a) => a.index);
            const sstr = raw;
            const indexes = [];
            console.log(raw);
            for (let index = 0; index < sstr.length; index++) {
              if (
                sstr.substring(index, index + 10).indexOf("'cornumid'") != -1
              ) {
                console.log(sstr.substring(index, index + 9));
                indexes.push(index);
              }
            }

            console.log(indexes);
            const corNumID = [];
            var letter;
            var currNum;
            var ind;
            for (var curr in indexes) {
              ind = 13;
              currNum = "";
              letter = raw[indexes[curr] + ind];
              while (letter != "'") {
                currNum = currNum + letter;
                ind += 1;
                letter = raw[indexes[curr] + ind];
              }
              corNumID.push(parseInt(currNum));
            }
            console.log(corNumID);
            recurse(corNumID[0], 0, corNumID, graduationTesting);
          });
        } else {
          setisVisible(true);
          Alert.alert(
            "ERROR",

            'PLEASE ENTER VALID SKYWARD CREDENTIALS (USERNAME DOES NOT HAVE "@ORTN.EDU")',
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
        }
      });
    }
  };
  const cancelling = () => {};
  const inputtingGraduation = () => {
    console.log(graduationTesting, "hiiiiiii");
    if ((graduationTesting <= 2027) & (graduationTesting >= 2023)) {
      const _storeData2 = async (takenClasses, credits, graduation) => {
        try {
          await AsyncStorage.setItem("Graduation", JSON.stringify(graduation));
          await AsyncStorage.setItem(
            "takenClasses",
            JSON.stringify(takenClasses)
          );
          await AsyncStorage.setItem("requirements", JSON.stringify(credits));
          await AsyncStorage.setItem(
            "PlaygroundFall",
            JSON.stringify([
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
            ])
          );
          await AsyncStorage.setItem(
            "PlaygroundSpring",
            JSON.stringify([
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
            ])
          );
          await AsyncStorage.setItem("lunchPlay", "Click Here to Add Class!");
          await AsyncStorage.setItem(
            "PlaygroundSpring",
            JSON.stringify([
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
              "Click Here to Add Class!",
            ])
          );
          if (graduation - 2023 >= 1) {
            await AsyncStorage.setItem(
              "SeniorFall",
              JSON.stringify([
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
              ])
            );
            await AsyncStorage.setItem("lunchSen", "Click Here to Add Class!");
            await AsyncStorage.setItem(
              "SeniorSpring",
              JSON.stringify([
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
                "Click Here to Add Class!",
              ])
            );
            if (graduation - 2023 >= 2) {
              await AsyncStorage.setItem(
                "JuniorFall",
                JSON.stringify([
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                ])
              );
              await AsyncStorage.setItem(
                "lunchJun",
                "Click Here to Add Class!"
              );
              await AsyncStorage.setItem(
                "JuniorSpring",
                JSON.stringify([
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                  "Click Here to Add Class!",
                ])
              );
              if (graduation - 2023 >= 3) {
                await AsyncStorage.setItem(
                  "SophomoreFall",
                  JSON.stringify([
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                  ])
                );
                await AsyncStorage.setItem(
                  "lunchSoph",
                  "Click Here to Add Class!"
                );
                await AsyncStorage.setItem(
                  "SophomoreSpring",
                  JSON.stringify([
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                    "Click Here to Add Class!",
                  ])
                );
                if (graduation - 2023 == 4) {
                  await AsyncStorage.setItem(
                    "FreshmanFall",
                    JSON.stringify([
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                    ])
                  );
                  await AsyncStorage.setItem(
                    "lunchFresh",
                    "Click Here to Add Class!"
                  );
                  await AsyncStorage.setItem(
                    "FreshmanSpring",
                    JSON.stringify([
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                      "Click Here to Add Class!",
                    ])
                  );
                }
              }
            }
          }
        } catch (error) {
          // Error saving data
          console.log("error saving data");
        }
      };
      var takenCredits = {
        English: 0,
        Math: 0,
        Science: 0,
        "Social Studies": 0,
        Wellness: 0,
        "World Languages": 0,
        "Fine Arts": 0,
        "Career Academies": 0,
        "Special Programs": 0,
      };
      _storeData2(
        [["Click Here to Add Previously Taken Classes!", 0, 0]],
        takenCredits,
        graduationTesting
      );
      if (graduationTesting - 2023 == 0) {
        setYears(["Classes Taken", "Playground"]);
      }
      if (graduationTesting - 2023 == 1) {
        setYears(["Classes Taken", "Senior", "Playground"]);
      }
      if (graduationTesting - 2023 == 2) {
        setYears(["Classes Taken", "Junior", "Senior", "Playground"]);
      }
      if (graduationTesting - 2023 == 3) {
        setYears([
          "Classes Taken",
          "Sophomore",
          "Junior",
          "Senior",
          "Playground",
        ]);
      }
      if (graduationTesting - 2023 == 4) {
        setYears([
          "Classes Taken",
          "Freshman",
          "Sophomore",
          "Junior",
          "Senior",
          "Playground",
        ]);
      }
      setisVisible(true);
    } else {
      Alert.alert(
        "ERROR",

        "PLEASE ENTER A GRADUATION YEAR BETWEEN 2023-2027",
        [{ text: "OK", onPress: () => setisVisible3(true) }]
      );
    }
  };
  var text2 = null;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        // onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        //     isVisible(!isVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              PLEASE TYPE IN YOUR SKYWARD CREDENTIALS BELOW
            </Text>
            <TextInput
              value={text1}
              placeholder="Username (without @ortn.edu)"
              autoCapitalize="none"
              onChangeText={(value, index) => (text1 = value)}
              fontSize={20}
              returnKeyType="done"
            />
            <TextInput
              value={text2}
              placeholder="Password"
              onChangeText={(value, index) => (text2 = value)}
              keyboardType="numeric"
              returnKeyType="done"
              fontSize={20}
              secureTextEntry={true}
            />

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setisVisible(false);

                  cancelling();
                }}
                style={{ flex: 2 }}
              >
                <View
                  style={{
                    backgroundColor: "#d1d1d1",
                    height: 50,
                    width: 100,
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Skip
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setisVisible(false);

                  inputting();
                }}
                style={{ flex: 1 }}
              >
                <View
                  style={{
                    backgroundColor: "#d1d1d1",
                    height: 50,
                    width: 100,
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Enter
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible2}
        // onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        //     isVisible(!isVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible3}
        // onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        //     isVisible(!isVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView3}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              PLEASE TYPE IN YOUR GRADUATION YEAR BELOW
            </Text>
            <TextInput
              value={text1}
              placeholder="Graduation Year"
              onChangeText={(value, index) => (graduationTesting = value)}
              keyboardType="numeric"
              fontSize={20}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => {
                setisVisible3(false);

                inputtingGraduation();
              }}
            >
              <View
                style={{
                  backgroundColor: "#d1d1d1",
                  height: 50,
                  width: 100,
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  Enter
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {years.map((user) => (
        <TouchableOpacity onPress={() => pressHandler(user)}>
          <View style={styles.items}>
            <Text
              style={{
                fontSize: 38,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {user}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: "50%",
    width: "90%",
    justifyContent: "space-evenly",
  },
  modalView2: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: "15%",
    width: "30%",
    justifyContent: "space-evenly",
  },
  modalView3: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: "30%",
    width: "90%",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
    backgroundColor: "#d1d1d1",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  items: {
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
  },
});
