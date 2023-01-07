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
  ImageBackground,
} from "react-native";
import { sendEmail } from "./sendEmail";
// import LinearGradient from "react-native-linear-gradient";
import { StringUtils } from "turbocommons-ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ChooseYear({ navigation, route }) {
  const image = require("../ORHS2.png");
  var nameTesting = "";
  const graduation = 2027;
  // AsyncStorage.clear();

  const send = () => {
    const _retrieveData2 = async () => {
      try {
        var name = await AsyncStorage.getItem("Name");
        var graduation = await AsyncStorage.getItem("Graduation");
        var CurrentYear = await AsyncStorage.getItem("PlaygroundFall");
        var CurrentYear2 = await AsyncStorage.getItem("PlaygroundSpring");
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
        var lunchPlay = await AsyncStorage.getItem("lunchPlay");
        var taken = await AsyncStorage.getItem("takenClasses");
        return [
          name,
          JSON.parse(graduation),
          JSON.parse(taken),
          JSON.parse(Freshman),
          JSON.parse(Freshman2),
          JSON.parse(Sophomore),
          JSON.parse(Sophomore2),
          JSON.parse(Junior),
          JSON.parse(Junior2),
          JSON.parse(Senior),
          JSON.parse(Senior2),
          JSON.parse(CurrentYear),
          JSON.parse(CurrentYear2),
          lunchFresh,
          lunchSoph,
          lunchJun,
          lunchSen,
          lunchPlay,
        ];
      } catch (error) {}
    };
    _retrieveData2().then((soup) => {
      var takenCl = "";
      var currentClFall = "";
      var currentClSpring = "";
      for (let i = 0; i < soup[2].length; i++) {
        if (soup[2][i][0] == "Click Here to Add Previously Taken Classes!") {
          continue;
        }
        takenCl += soup[2][i][0] + "; ";
        console.log(soup[2][i][0]);
      }
      if (takenCl == "") {
        takenCl = "None";
      }
      for (let i = 0; i < soup[11].length; i++) {
        if (soup[11][i][0] == "Click Here to Add Class!") {
          currentClFall += " Empty;";
          continue;
        }
        currentClFall += soup[11][i][0] + "; ";
      }
      for (let i = 0; i < soup[12].length; i++) {
        if (soup[12][i][0] == "Click Here to Add Class!") {
          currentClSpring += " Empty;";
          continue;
        }
        currentClSpring += soup[12][i][0] + "; ";
      }
      var reciever;
      var freshmanFall = "";
      var freshmanSpring = "";
      var sophomoreFall = "";
      var sophomoreSpring = "";
      var juniorFall = "";
      var juniorSpring = "";
      var seniorFall = "";
      var seniorSpring = "";
      if (graduation - soup[1] == 1) {
        reciever = "hptaylor@ortn.edu";
        for (let i = 0; i < soup[5].length; i++) {
          if (soup[5][i][0] == "Click Here to Add Class!") {
            sophomoreFall += " Empty;";
            continue;
          }
          sophomoreFall += "; " + soup[5][i][0];
        }
        for (let i = 0; i < soup[6].length; i++) {
          if (soup[6][i][0] == "Click Here to Add Class!") {
            sophomoreSpring += " Empty;";
            continue;
          }
          sophomoreSpring += soup[6][i][0] + "; ";
        }
        for (let i = 0; i < soup[7].length; i++) {
          if (soup[7][i][0] == "Click Here to Add Class!") {
            juniorFall += " Empty;";
            continue;
          }
          juniorFall += soup[7][i][0] + "; ";
        }
        for (let i = 0; i < soup[8].length; i++) {
          if (soup[8][i][0] == "Click Here to Add Class!") {
            juniorSpring += " Empty;";
            continue;
          }
          juniorSpring += soup[8][i][0] + "; ";
        }
        for (let i = 0; i < soup[9].length; i++) {
          if (soup[9][i][0] == "Click Here to Add Class!") {
            seniorFall += " Empty;";
            continue;
          }
          seniorFall += soup[9][i][0] + "; ";
        }
        for (let i = 0; i < soup[10].length; i++) {
          if (soup[10][i][0] == "Click Here to Add Class!") {
            seniorSpring += " Empty;";
            continue;
          }
          seniorSpring += soup[10][i][0] + "; ";
        }
        var freshmanLunch = "Empty";
        var sophomoreLunch = "Empty";
        var juniorLunch = "Empty";
        var seniorLunch = "Empty";
        var currentLunch = "Empty";

        if (soup[13] != "Click Here to Add Class!") {
          freshmanLunch = soup[13];
        }
        if (soup[14] != "Click Here to Add Class!") {
          sophomoreLunch = soup[14];
        }
        if (soup[15] != "Click Here to Add Class!") {
          juniorLunch = soup[15];
        }
        if (soup[16] != "Click Here to Add Class!") {
          seniorLunch = soup[16];
        }
        if (soup[17] != "Click Here to Add Class!") {
          currentLunch = soup[17];
        }
        sendEmail(
          reciever,
          soup[0] + "'s Schedule",
          "Taken Classes: " +
            takenCl +
            "\n" +
            "\n" +
            "\n" +
            "Current Schedule Fall: " +
            currentClFall +
            "\n" +
            "\n" +
            "Current Schedule Spring: " +
            currentClSpring +
            "\n" +
            "\n" +
            "Current Year Lunch: " +
            currentLunch +
            "\n" +
            "\n" +
            "\n" +
            "Sophomore Fall: " +
            sophomoreFall +
            "\n" +
            "\n" +
            "Sophomore Spring: " +
            sophomoreSpring +
            "\n" +
            "\n" +
            "Sophomore Lunch: " +
            sophomoreLunch +
            "\n" +
            "\n" +
            "\n" +
            "Junior Fall: " +
            juniorFall +
            "\n" +
            "\n" +
            "Junior Spring: " +
            juniorSpring +
            "\n" +
            "\n" +
            "Junior Lunch: " +
            juniorLunch +
            "\n" +
            "\n" +
            "\n" +
            "Senior Fall: " +
            seniorFall +
            "\n" +
            "\n" +
            "Senior Spring: " +
            seniorSpring +
            "\n" +
            "\n" +
            "Senior Lunch: " +
            seniorLunch
          //  { cc: 'user@domain.com; user2@domain.com; userx@domain1.com' }
        ).then(() => {
          console.log("Your message was successfully sent!");
        });
      }
      if (graduation - soup[1] == 2) {
        reciever = "abennewitz@ortn.edu";
        for (let i = 0; i < soup[7].length; i++) {
          if (soup[7][i][0] == "Click Here to Add Class!") {
            juniorFall += " Empty;";
            continue;
          }
          juniorFall += soup[7][i][0] + "; ";
        }
        for (let i = 0; i < soup[8].length; i++) {
          if (soup[8][i][0] == "Click Here to Add Class!") {
            juniorSpring += " Empty;";
            continue;
          }
          juniorSpring += soup[8][i][0] + "; ";
        }
        for (let i = 0; i < soup[9].length; i++) {
          if (soup[9][i][0] == "Click Here to Add Class!") {
            seniorFall += " Empty;";
            continue;
          }
          seniorFall += soup[9][i][0] + "; ";
        }
        for (let i = 0; i < soup[10].length; i++) {
          if (soup[10][i][0] == "Click Here to Add Class!") {
            seniorSpring += " Empty;";
            continue;
          }
          seniorSpring += soup[10][i][0] + "; ";
        }
        console.log(seniorSpring, soup[10]);
        var freshmanLunch = "Empty";
        var sophomoreLunch = "Empty";
        var juniorLunch = "Empty";
        var seniorLunch = "Empty";
        var currentLunch = "Empty";

        if (soup[13] != "Click Here to Add Class!") {
          freshmanLunch = soup[13];
        }
        if (soup[14] != "Click Here to Add Class!") {
          sophomoreLunch = soup[14];
        }
        if (soup[15] != "Click Here to Add Class!") {
          juniorLunch = soup[15];
        }
        if (soup[16] != "Click Here to Add Class!") {
          seniorLunch = soup[16];
        }
        if (soup[17] != "Click Here to Add Class!") {
          currentLunch = soup[17];
        }
        sendEmail(
          reciever,
          soup[0] + "'s Schedule",
          "Taken Classes: " +
            takenCl +
            "\n" +
            "\n" +
            "\n" +
            "Current Schedule Fall: " +
            currentClFall +
            "\n" +
            "\n" +
            "Current Schedule Spring: " +
            currentClSpring +
            "\n" +
            "\n" +
            "Current Year Lunch: " +
            currentLunch +
            "\n" +
            "\n" +
            "\n" +
            "Junior Fall: " +
            juniorFall +
            "\n" +
            "\n" +
            "Junior Spring: " +
            juniorSpring +
            "\n" +
            "\n" +
            "Junior Lunch: " +
            juniorLunch +
            "\n" +
            "\n" +
            "\n" +
            "Senior Fall: " +
            seniorFall +
            "\n" +
            "\n" +
            "Senior Spring: " +
            seniorSpring +
            "\n" +
            "\n" +
            "Senior Lunch: " +
            seniorLunch
          //  { cc: 'user@domain.com; user2@domain.com; userx@domain1.com' }
        ).then(() => {
          console.log("Your message was successfully sent!");
        });
      }
      if (graduation - soup[1] == 3) {
        reciever = "hafoster@ortn.edu";
        for (let i = 0; i < soup[9].length; i++) {
          if (soup[9][i][0] == "Click Here to Add Class!") {
            seniorFall += " Empty;";
            continue;
          }
          seniorFall += soup[9][i][0] + "; ";
        }
        for (let i = 0; i < soup[10].length; i++) {
          if (soup[10][i][0] == "Click Here to Add Class!") {
            seniorSpring += " Empty;";
            continue;
          }
          seniorSpring += soup[10][i][0] + "; ";
        }
        var freshmanLunch = "Empty";
        var sophomoreLunch = "Empty";
        var juniorLunch = "Empty";
        var seniorLunch = "Empty";
        var currentLunch = "Empty";

        if (soup[13] != "Click Here to Add Class!") {
          freshmanLunch = soup[13];
        }
        if (soup[14] != "Click Here to Add Class!") {
          sophomoreLunch = soup[14];
        }
        if (soup[15] != "Click Here to Add Class!") {
          juniorLunch = soup[15];
        }
        if (soup[16] != "Click Here to Add Class!") {
          seniorLunch = soup[16];
        }
        if (soup[17] != "Click Here to Add Class!") {
          currentLunch = soup[17];
        }
        sendEmail(
          reciever,
          soup[0] + "'s Schedule",
          "Taken Classes: " +
            takenCl +
            "\n" +
            "\n" +
            "\n" +
            "Current Schedule Fall: " +
            currentClFall +
            "\n" +
            "\n" +
            "Current Schedule Spring: " +
            currentClSpring +
            "\n" +
            "\n" +
            "Current Year Lunch: " +
            currentLunch +
            "\n" +
            "\n" +
            "\n" +
            "Senior Fall: " +
            seniorFall +
            "\n" +
            "\n" +
            "Senior Spring: " +
            seniorSpring +
            "\n" +
            "\n" +
            "Senior Lunch: " +
            seniorLunch
          //  { cc: 'user@domain.com; user2@domain.com; userx@domain1.com' }
        ).then(() => {
          console.log("Your message was successfully sent!");
        });
      }
      if (graduation - soup[1] == 4) {
        reciever = "bottinger@ortn.edu";
        var freshmanLunch = "Empty";
        var sophomoreLunch = "Empty";
        var juniorLunch = "Empty";
        var seniorLunch = "Empty";
        var currentLunch = "Empty";

        if (soup[13] != "Click Here to Add Class!") {
          freshmanLunch = soup[13];
        }
        if (soup[14] != "Click Here to Add Class!") {
          sophomoreLunch = soup[14];
        }
        if (soup[15] != "Click Here to Add Class!") {
          juniorLunch = soup[15];
        }
        if (soup[16] != "Click Here to Add Class!") {
          seniorLunch = soup[16];
        }
        if (soup[17] != "Click Here to Add Class!") {
          currentLunch = soup[17];
        }
        sendEmail(
          reciever,
          soup[0] + "'s Schedule",
          "Taken Classes: " +
            takenCl +
            "\n" +
            "\n" +
            "\n" +
            "Current Schedule Fall: " +
            currentClFall +
            "\n" +
            "\n" +
            "Current Schedule Spring: " +
            currentClSpring +
            "\n" +
            "\n" +
            "Current Year Lunch: " +
            currentLunch
          //  { cc: 'user@domain.com; user2@domain.com; userx@domain1.com' }
        ).then(() => {
          console.log("Your message was successfully sent!");
        });
      }
      if (graduation - soup[1] == 0) {
        console.log("poop");
      }
    });
  };
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
            setYears(["Freshman", "Sophomore", "Junior", "Senior"]);
            setisVisible3(true);
          },
        },
      ]
    );
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => pressHandler10()} title="Reset" />
      ),
    });
  }, [navigation]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={() => send()} title="Upload" />,
    });
  }, [navigation]);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const [isVisible3, setisVisible3] = useState(false);
  // AsyncStorage.clear();
  var alphaKeyDict = require("../alphaKeyDict.json");
  const skywardRest = require("../skyward-rest");
  const url =
    "https://skyed.ortn.edu/scripts/wsisa.dll/WService=wsEAplus/seplog01.w";
  const scraper = skywardRest(url); // the scraper!
  // scraper
  //   .scrapeActualGradebook("qubri000", "014503", {
  //     course: 9963,
  //     bucket: "TERM 1",
  //   })
  //   .then(({ raw, data }) => console.log(data));
  const alphaKeys = [];
  const currAlphaKeys = [];
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

  const convertData = (
    alphaKeys,
    graduation2,
    sortedcurrScheduleCorNumID,
    periods,
    currAlphaKeys,
    lengths,
    names,
    raw2
  ) => {
    var theList;
    var closestName;
    var closestCredits;
    var closestSubject;
    var currClose;
    for (const key in alphaKeys) {
      currClose = Infinity;
      for (const [key2, value2] of Object.entries(alphaKeyDict)) {
        theList = key2.split(" ");
        if (theList.indexOf(alphaKeys[key]) != -1) {
          for (const index1 in alphaKeyDict[key2].Subject) {
            alphaKeyDict[key2].Credits[index1] = parseFloat(
              alphaKeyDict[key2].Credits[index1]
            );
          }
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
    var currYearFall = [
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
    ];
    var currYearSpring = [
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
      ["Click Here to Add Class!"],
    ];
    var currYearCredits = [];
    var currYearSubjects = [];
    var currYearNames = [];
    for (let i = 0; i < currAlphaKeys.length; i++) {
      currYearNames.push("Click Here to Add Class!");
      currYearSubjects.push("Special Programs");
      currYearCredits.push(0);
    }
    var currClosest;
    var currClosestNum;
    console.log(currAlphaKeys, "NAMES");
    for (const key in currAlphaKeys) {
      currClose = Infinity;
      currClosestNum = Infinity;
      for (const [key2, value2] of Object.entries(alphaKeyDict)) {
        theList = key2.split(/\s+/);
        currClosestNum = Infinity;

        for (let i = 0; i < theList.length; i++) {
          if (
            StringUtils.compareByLevenshtein(theList[i], currAlphaKeys[key]) <
            currClosestNum
          ) {
            currClosestNum = StringUtils.compareByLevenshtein(
              theList[i],
              currAlphaKeys[key]
            );
            currClosest = theList[i];
          }
        }
        if (currClosestNum < currClose) {
          currClose = currClosestNum;
          closestName = alphaKeyDict[key2].name;
          closestCredits = alphaKeyDict[key2].Credits;
          closestSubject = alphaKeyDict[key2].Subject;
        }
        // theList = key2.split(/\s+/);
        // if (theList.includes(currAlphaKeys[key])) {
        //   for (const index1 in alphaKeyDict[key2].Subject) {
        //     alphaKeyDict[key2].Credits[index1] = parseFloat(
        //       alphaKeyDict[key2].Credits[index1]
        //     );
        //   }

        //   for (const index1 in alphaKeyDict[key2].Subject) {
        //     takenCredits[alphaKeyDict[key2].Subject[index1]] +=
        //       alphaKeyDict[key2].Credits[index1];
        //   }

        // }
      }
      for (const index1 in closestSubject) {
        takenCredits[closestSubject[index1]] += parseFloat(
          closestCredits[index1]
        );
      }
      currYearCredits[key] = closestCredits;
      currYearSubjects[key] = closestSubject;
      currYearNames[key] = names[key];
    }
    console.log(currYearCredits);
    for (let i = 0; i < currAlphaKeys.length; i++) {
      if (currYearNames[i] == "Click Here to Add Class!") {
        continue;
      }
      if (periods[i] == "1") {
        if (lengths[i] == "Term") {
          if (currYearFall[0][0] == "Click Here to Add Class!") {
            currYearFall[0] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearFall[1][0] == "Click Here to Add Class!") {
            currYearFall[1] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[0][0] == "Click Here to Add Class!") {
            currYearSpring[0] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[1][0] == "Click Here to Add Class!") {
            currYearSpring[1] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
        if (lengths[i] == "Semester") {
          if (currYearFall[0][0] == "Click Here to Add Class!") {
            currYearFall[0] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[1] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[0][0] == "Click Here to Add Class!") {
            currYearSpring[0] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearSpring[1] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
        if (lengths[i] == "Year") {
          if (
            lengths[i + 1] &&
            lengths[i + 1] == "Year" &&
            periods[i + 1] == "1"
          ) {
            // means its 2 year-long skinnies
            currYearSpring[0] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearSpring[1] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearFall[0] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearFall[1] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
          } else {
            currYearSpring[0] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearSpring[1] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[0] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[1] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
      }
      if (periods[i] == "2") {
        if (lengths[i] == "Term") {
          if (currYearFall[2][0] == "Click Here to Add Class!") {
            currYearFall[2] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearFall[3][0] == "Click Here to Add Class!") {
            currYearFall[3] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[2][0] == "Click Here to Add Class!") {
            currYearSpring[2] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[3][0] == "Click Here to Add Class!") {
            currYearSpring[3] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
        if (lengths[i] == "Semester") {
          if (currYearFall[2][0] == "Click Here to Add Class!") {
            currYearFall[2] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[3] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[2][0] == "Click Here to Add Class!") {
            currYearSpring[2] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearSpring[3] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
        if (lengths[i] == "Year") {
          if (
            lengths[i + 1] &&
            lengths[i + 1] == "Year" &&
            periods[i + 1] == "2"
          ) {
            // means its 2 year-long skinnies
            currYearSpring[2] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearSpring[3] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearFall[2] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearFall[3] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
          } else {
            currYearSpring[2] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearSpring[3] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[2] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[3] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
      }
      if (periods[i] == "4") {
        if (lengths[i] == "Term") {
          if (currYearFall[4][0] == "Click Here to Add Class!") {
            currYearFall[4] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearFall[5][0] == "Click Here to Add Class!") {
            currYearFall[5] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[4][0] == "Click Here to Add Class!") {
            currYearSpring[4] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[5][0] == "Click Here to Add Class!") {
            currYearSpring[5] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
        if (lengths[i] == "Semester") {
          if (currYearFall[4][0] == "Click Here to Add Class!") {
            currYearFall[4] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[5] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[4][0] == "Click Here to Add Class!") {
            currYearSpring[4] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearSpring[5] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
        if (lengths[i] == "Year") {
          if (
            lengths[i + 1] &&
            lengths[i + 1] == "Year" &&
            periods[i + 1] == "4"
          ) {
            // means its 2 year-long skinnies
            currYearSpring[4] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearSpring[5] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearFall[4] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearFall[5] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
          } else {
            currYearSpring[4] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearSpring[5] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[4] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[5] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
      }
      if (periods[i] == "5") {
        if (lengths[i] == "Term") {
          if (currYearFall[6][0] == "Click Here to Add Class!") {
            currYearFall[6] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearFall[7][0] == "Click Here to Add Class!") {
            currYearFall[7] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[6][0] == "Click Here to Add Class!") {
            currYearSpring[6] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[7][0] == "Click Here to Add Class!") {
            currYearSpring[7] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
        if (lengths[i] == "Semester") {
          if (currYearFall[6][0] == "Click Here to Add Class!") {
            currYearFall[6] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[7] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          } else if (currYearSpring[6][0] == "Click Here to Add Class!") {
            currYearSpring[6] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearSpring[7] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
        if (lengths[i] == "Year") {
          if (
            lengths[i + 1] &&
            lengths[i + 1] == "Year" &&
            periods[i + 1] == "5"
          ) {
            // means its 2 year-long skinnies
            currYearSpring[6] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearSpring[7] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearFall[6] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
            currYearFall[7] = [
              "Combined Studies",
              ["1", "1"],
              ["English", "Social Studies"],
            ];
          } else {
            currYearSpring[6] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearSpring[7] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[6] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
            currYearFall[7] = [
              currYearNames[i],
              currYearCredits[i],
              currYearSubjects[i],
            ];
          }
        }
      }
    }
    console.log(currYearFall, currYearSpring);
    console.log(takenClasses);
    var pFinance = false;
    var wC = false;
    if (raw2.indexOf("Personal Finance CP") != -1) {
      pFinance = true;
    }
    if (raw2.indexOf("Wellness C") != -1) {
      wC = true;
    }
    for (let i = 0; i < currYearFall.length; i++) {
      if (currYearFall[i][0].indexOf("Personal Finance CP") != -1) {
        pFinance = false;
      }
      if (currYearSpring[i][0].indexOf("Personal Finance CP") != -1) {
        pFinance = false;
      }
      if (currYearFall[i][0].indexOf("Wellness C") != -1) {
        pFinance = false;
      }
      if (currYearSpring[i][0].indexOf("Wellness C") != -1) {
        pFinance = false;
      }
    }
    if (pFinance) {
      takenClasses.push(["Personal Finance", ["0.5"], ["Social Studies"]]);
      takenCredits["Social Studies"] += 0.5;
    }
    if (wC) {
      takenClasses.push(["Wellness C", ["0.5"], ["Wellness"]]);
      takenCredits["Wellness"] += 0.5;
    }
    takenClasses.push(["Click Here to Add Previously Taken Classes!", 0, 0]);

    const _storeData2 = async (
      takenClasses,
      credits,
      graduation2,
      currYearFall,
      currYearSpring,
      graduation
    ) => {
      try {
        await AsyncStorage.setItem(
          "takenClasses",
          JSON.stringify(takenClasses)
        );
        await AsyncStorage.setItem("requirements", JSON.stringify(credits));
        await AsyncStorage.setItem(
          "PlaygroundFall",
          JSON.stringify(currYearFall)
        );
        await AsyncStorage.setItem(
          "PlaygroundSpring",
          JSON.stringify(currYearSpring)
        );
        await AsyncStorage.setItem("lunchPlay", "Click Here to Add Class!");
        if (graduation - graduation2 <= 3) {
          await AsyncStorage.setItem(
            "SeniorFall",
            JSON.stringify([
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
            ])
          );
          await AsyncStorage.setItem("lunchSen", "Click Here to Add Class!");
          await AsyncStorage.setItem(
            "SeniorSpring",
            JSON.stringify([
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
            ])
          );
          if (graduation - graduation2 <= 2) {
            await AsyncStorage.setItem(
              "JuniorFall",
              JSON.stringify([
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
              ])
            );
            await AsyncStorage.setItem("lunchJun", "Click Here to Add Class!");
            await AsyncStorage.setItem(
              "JuniorSpring",
              JSON.stringify([
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
              ])
            );
            if (graduation - graduation2 <= 1) {
              await AsyncStorage.setItem(
                "SophomoreFall",
                JSON.stringify([
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                ])
              );
              await AsyncStorage.setItem(
                "lunchSoph",
                "Click Here to Add Class!"
              );
              await AsyncStorage.setItem(
                "SophomoreSpring",
                JSON.stringify([
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                ])
              );
              if (graduation - graduation2 == 0) {
                await AsyncStorage.setItem(
                  "FreshmanFall",
                  JSON.stringify([
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                  ])
                );
                await AsyncStorage.setItem(
                  "lunchFresh",
                  "Click Here to Add Class!"
                );
                await AsyncStorage.setItem(
                  "FreshmanSpring",
                  JSON.stringify([
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
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
    _storeData2(
      takenClasses,
      takenCredits,
      graduation2,
      currYearFall,
      currYearSpring,
      graduation
    );
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
          var CurrentYear = await AsyncStorage.getItem("PlaygroundFall");
          var CurrentYear2 = await AsyncStorage.getItem("PlaygroundSpring");
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
            JSON.parse(CurrentYear),
            JSON.parse(CurrentYear2),
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
            CurrentYear,
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
          isCurr: false,
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
          isCurr: false,
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
          isCurr: false,
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
          isCurr: false,
        });
      }
      if (year == "Current Year") {
        navigation.navigate("Schedule", {
          FS: "Fall (edit)",
          fall: soup[10],
          spring: soup[11],
          lunchClass: [soup[17]],
          requirements: soup[12],
          year: "Current Year",
          isCurr: true,
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
  useEffect(() => {
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
        setYears(["Freshmen", "Sophomore", "Junior", "Senior"]);
      }
      var currYears;
      console.log(graduation, "YEARSSSSSSSSSS");
      if (graduationYear[0] == false) {
        if (graduation - graduationYear[1] == 4) {
          currYears = ["Classes Taken", "Current Year"];
        }
        if (graduation - graduationYear[1] == 3) {
          currYears = ["Classes Taken", "Current Year", "Senior"];
        }
        if (graduation - graduationYear[1] == 2) {
          currYears = ["Classes Taken", "Current Year", "Junior", "Senior"];
        }
        if (graduation - graduationYear[1] == 1) {
          currYears = [
            "Classes Taken",
            "Current Year",
            "Sophomore",
            "Junior",
            "Senior",
          ];
        }
        if (graduationYear[1] - graduation == 0) {
          currYears = [
            "Classes Taken",
            "Freshman",
            "Sophomore",
            "Junior",
            "Senior",
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
    setisVisible2(true);

    username = text1;
    password = text2;
    if (graduation - graduationTesting == 4) {
      setYears(["Classes Taken", "Current Year"]);
    }
    if (graduation - graduationTesting == 3) {
      setYears(["Classes Taken", "Current Year", "Senior"]);
    }
    if (graduation - graduationTesting == 2) {
      setYears(["Classes Taken", "Current Year", "Junior", "Senior"]);
    }
    if (graduation - graduationTesting == 1) {
      setYears([
        "Classes Taken",
        "Current Year",

        "Sophomore",
        "Junior",

        "Senior",
      ]);
    }
    if (graduation - graduationTesting == 0) {
      setYears(["Classes Taken", "Freshman", "Sophomore", "Junior", "Senior"]);
    }
    if ((username === "demoUsername") & (password === "12345")) {
      convertData(
        ["313102", "323108", "303133", "333108", "313103"],
        graduationTesting
      );
    } else {
      scraper.gettingSessionID(username, password).then((authent) => {
        if (authent != "No username or password or it is invalid") {
          scraper.scrapeReport(authent).then(({ raw }) => {
            const raw2 = raw;
            console.log(raw.indexOf("Wellness B"), "hello");
            const recurse = (
              course1,
              indexers,
              corNumID,
              Graduation,
              sortedcurrScheduleCorNumID,
              periods,
              currAlphaKeys,
              lengths,
              raw,
              names,
              raw2
            ) => {
              scraper
                .scrapeGradebook(
                  {
                    course: course1,
                  },
                  authent
                )
                .then(({ data }) => {
                  if (sortedcurrScheduleCorNumID.indexOf(course1) == -1) {
                    var classIndex = [];
                    // in this if statement, check if the class has any grades in it. Get the class name, search for it in scrapeReport's raw by counting 7 {'s then seeing if index+39 of raw is a &. If it is, then there is no grade, so that class wasn't actually taken
                    for (let i = 0; i < raw.length; i++) {
                      if (raw.substring(i, i + data[2].length) == data[2]) {
                        classIndex.push(i);
                      }
                    }
                    var currIndex;
                    var isClass = false;
                    var numberOfCurly;
                    // you may possibly need to account for if the student has taken the same class
                    for (let i = 0; i < classIndex.length; i++) {
                      numberOfCurly = 0;
                      currIndex = classIndex[i] + data[2].length;
                      for (let j = currIndex; j < raw.length; j++) {
                        if (raw[j] == "{") {
                          numberOfCurly += 1;
                        }
                        if (numberOfCurly == 7) {
                          if (raw[j + 37] != "&") {
                            isClass = true;
                          }
                          break;
                        }
                      }
                    }
                    if (isClass && alphaKeys.indexOf(data[0]) == -1) {
                      alphaKeys.push(data[0]);
                    }
                    // if (alphaKeys.indexOf(data[0]) == -1 && isClass) {
                    //   alphaKeys.push(data[0]);
                    // }
                  } else {
                    // if (currAlphaKeys.indexOf(data[0]) == -1) {
                    // problem here already: if there is a repeat, then it won't account for the repeat, and will assign the same value to the same place in currAlphaKeys twice
                    names[sortedcurrScheduleCorNumID.indexOf(course1)] =
                      data[2];
                    currAlphaKeys[sortedcurrScheduleCorNumID.indexOf(course1)] =
                      data[0];
                    lengths[sortedcurrScheduleCorNumID.indexOf(course1)] =
                      data[1];
                    //   console.log("IN THE ELSE");
                    // }
                  }

                  indexers += 1;
                  if (indexers >= corNumID.length) {
                    // TODO: change 20 to length and call function
                    return convertData(
                      alphaKeys,
                      Graduation,
                      sortedcurrScheduleCorNumID,
                      periods,
                      currAlphaKeys,
                      lengths,
                      names,
                      raw2
                    );
                  }
                  recurse(
                    corNumID[indexers],
                    indexers,
                    corNumID,
                    Graduation,
                    sortedcurrScheduleCorNumID,
                    periods,
                    currAlphaKeys,
                    lengths,
                    raw,
                    names,
                    raw2
                  );
                });
            };
            const sstr = raw;
            const indexes = [];
            for (let index = 0; index < sstr.length; index++) {
              if (
                sstr.substring(index, index + 10).indexOf("'cornumid'") != -1
              ) {
                indexes.push(index);
              }
            }
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
            // now has all of the cornumid's
            scraper.gettinggradebook(authent).then(({ raw }) => {
              var currScheduleCorNumID = [];
              const sstr = raw;
              const indexes = [];
              for (let index = 0; index < sstr.length; index++) {
                if (
                  sstr.substring(index, index + 10).indexOf("'cornumid'") != -1
                ) {
                  indexes.push(index);
                }
              }
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
                currScheduleCorNumID.push(parseInt(currNum));
              }
              // for (var index in corNumID) {
              //   if (
              //     raw.indexOf("'" + JSON.stringify(corNumID[index]) + "'") != -1
              //   ) {
              //     currScheduleCorNumID.push(corNumID[index]);
              //   }
              // }
              console.log(currScheduleCorNumID, "CURR CORNUMID");
              // gets the corNumID's of the current schedule
              var sortedcurrScheduleCorNumID = [];
              var minimum;
              var minimumCorNumID;
              var testing1;
              var currlength = currScheduleCorNumID.length;
              console.log(currlength);
              for (let index1 = 0; index1 < currlength; index1 += 1) {
                console.log("hi");
                minimum = Infinity;
                for (var index2 in currScheduleCorNumID) {
                  if (
                    raw.indexOf(
                      "_" + JSON.stringify(currScheduleCorNumID[index2]) + "_"
                    ) < minimum
                  ) {
                    minimum = raw.indexOf(
                      "_" + JSON.stringify(currScheduleCorNumID[index2]) + "_"
                    );
                    minimumCorNumID = currScheduleCorNumID[index2];
                  }
                }
                testing1 = currScheduleCorNumID.indexOf(minimumCorNumID);
                currScheduleCorNumID.splice(testing1, 1);
                sortedcurrScheduleCorNumID.push(minimumCorNumID);
              }
              console.log(sortedcurrScheduleCorNumID);
              // sorts the currScheduleCorNumID
              var periods = [];
              for (let letter = 0; letter < raw.length; letter += 1) {
                if (
                  raw.substring(letter, letter + 6).indexOf("Period") != -1 &&
                  isNaN(raw.substring(letter + 14, letter + 15)) == false
                ) {
                  periods.push(raw.substring(letter + 14, letter + 15));
                }
              }
              console.log(periods);
              // gets the respective periods of each class
              var currAlphaKeys = [];
              var lengths = [];
              var names = [];
              for (let i = 0; i < periods.length; i++) {
                currAlphaKeys.push("");
                lengths.push("");
                names.push("");
              }
              var raw3 = "";
              for (let i = 0; i < raw2.length; i++) {
                if (raw2[i] != "\\") {
                  raw3 = raw3 + raw2[i];
                }
              }
              recurse(
                corNumID[0],
                0,
                corNumID,
                graduationTesting,
                sortedcurrScheduleCorNumID,
                periods,
                [],
                [],
                raw3,
                names,
                raw2
              );
            });
          });
        } else {
          Alert.alert(
            "ERROR",

            'PLEASE ENTER VALID SKYWARD CREDENTIALS (USERNAME DOES NOT HAVE "@ORTN.EDU")',
            [
              {
                text: "OK",
                onPress: () => {
                  setisVisible2(false);

                  setisVisible(true);
                },
              },
            ]
          );
        }
      });
    }
  };
  const cancelling = () => {};
  const inputtingGraduation = () => {
    console.log(graduationTesting, "hiiiiiii");
    if ((graduationTesting <= 2027) & (graduationTesting >= 2023)) {
      console.log("I AM IN MATH CLASS!");
      const _storeData2 = async (takenClasses, credits, graduation2) => {
        try {
          await AsyncStorage.setItem("Name", nameTesting);

          await AsyncStorage.setItem("Graduation", JSON.stringify(graduation2));
          await AsyncStorage.setItem(
            "takenClasses",
            JSON.stringify(takenClasses)
          );
          await AsyncStorage.setItem("requirements", JSON.stringify(credits));
          await AsyncStorage.setItem(
            "PlaygroundFall",
            JSON.stringify([
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
            ])
          );
          await AsyncStorage.setItem(
            "PlaygroundSpring",
            JSON.stringify([
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
            ])
          );
          await AsyncStorage.setItem("lunchPlay", "Click Here to Add Class!");
          await AsyncStorage.setItem(
            "PlaygroundSpring",
            JSON.stringify([
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
              ["Click Here to Add Class!"],
            ])
          );
          if (graduation - graduation2 <= 3) {
            await AsyncStorage.setItem(
              "SeniorFall",
              JSON.stringify([
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
              ])
            );
            await AsyncStorage.setItem("lunchSen", "Click Here to Add Class!");
            await AsyncStorage.setItem(
              "SeniorSpring",
              JSON.stringify([
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
                ["Click Here to Add Class!"],
              ])
            );
            if (graduation - graduation2 <= 2) {
              await AsyncStorage.setItem(
                "JuniorFall",
                JSON.stringify([
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                ])
              );
              await AsyncStorage.setItem(
                "lunchJun",
                "Click Here to Add Class!"
              );
              await AsyncStorage.setItem(
                "JuniorSpring",
                JSON.stringify([
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                  ["Click Here to Add Class!"],
                ])
              );
              if (graduation - graduation2 >= 1) {
                await AsyncStorage.setItem(
                  "SophomoreFall",
                  JSON.stringify([
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                  ])
                );
                await AsyncStorage.setItem(
                  "lunchSoph",
                  "Click Here to Add Class!"
                );
                await AsyncStorage.setItem(
                  "SophomoreSpring",
                  JSON.stringify([
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                    ["Click Here to Add Class!"],
                  ])
                );
                if (graduation - graduation2 == 0) {
                  await AsyncStorage.setItem(
                    "FreshmanFall",
                    JSON.stringify([
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                    ])
                  );
                  await AsyncStorage.setItem(
                    "lunchFresh",
                    "Click Here to Add Class!"
                  );
                  await AsyncStorage.setItem(
                    "FreshmanSpring",
                    JSON.stringify([
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
                      ["Click Here to Add Class!"],
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
      if (graduation - graduationTesting == 4) {
        setYears(["Classes Taken", "Current Year"]);
      }
      if (graduation - graduationTesting == 3) {
        setYears(["Classes Taken", "Current Year", "Senior"]);
      }
      if (graduation - graduationTesting == 2) {
        setYears(["Classes Taken", "Current Year", "Junior", , "Senior"]);
      }
      if (graduation - graduationTesting == 1) {
        setYears([
          "Classes Taken",
          "Current Year",

          "Sophomore",
          "Junior",
          "Senior",
        ]);
      }
      if (graduation - graduationTesting == 0) {
        setYears([
          "Classes Taken",
          "Freshman",
          "Sophomore",
          "Junior",
          "Senior",
        ]);
      }
      console.log("I AM IN MATH CLASS 2");
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
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
          animationType="fade"
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
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                PLEASE TYPE IN YOUR FULL NAME BELOW
              </Text>
              <TextInput
                value={text1}
                placeholder="Full Name"
                onChangeText={(value, index) => (nameTesting = value)}
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
          <TouchableOpacity
            onPress={() => pressHandler(user)}
            activeOpacity={0.6}
          >
            <View style={styles.items}>
              {/* <LinearGradient colors={["#004d40", "#009688"]} style={styles.items}> */}
              <Text
                style={{
                  fontSize: 38,
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {user}
              </Text>
              {/* </LinearGradient> */}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>

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
    height: "50%",
    width: "90%",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    paddingTop: 70,
  },
  items: {
    shadowColor: "rgba(0,0,0, 0.4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
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
    opacity: 0.9,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
