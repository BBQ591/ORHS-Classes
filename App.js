import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Home from "./screens/Home";
import Original from "./screens/Original";
import Description from "./screens/Description";
import ChooseYear from "./screens/ChooseYear";
import ChooseClasses from "./screens/ChooseClasses";
import CAacademies from "./screens/CAacademies";
import ChooseLength from "./screens/ChooseLength";
import React from "react";
import CustomClass from "./screens/CustomClass";
import CustomYear from "./screens/CustomYear";
import SearchScreen from "./screens/SearchScreen";
// blue part of import is the function name
const Stack = createNativeStackNavigator();
export default function App() {
  const MyTheme = {
    dark: false,
    colors: {
      primary: "rgb(255, 45, 85)",
      background: "rgb(242, 242, 242)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Year"
          component={ChooseYear}
          options={{
            // headerStyle: {
            //   backgroundColor: "white",
            // },
            // headerTintColor: "black",
            headerTitleStyle: {
              fontSize: 0,
            },
            headerTransparent: true,
            headerShown: true,
          }}
        />
        <Stack.Screen name="Search Class" component={SearchScreen} />

        <Stack.Screen name="Class Taken" component={CustomYear} />
        <Stack.Screen
          name="Add Class"
          component={CustomClass}
          options={{
            // headerStyle: {
            //   backgroundColor: "white",
            // },
            // headerTintColor: "black",
            headerTitleStyle: {
              fontSize: 0,
            },
            headerTransparent: true,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Schedule"
          component={ChooseClasses}
          options={{
            headerStyle: {
              backgroundColor: "white",
            },
            // headerTintColor: "black",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Subjects"
          component={Original}
          options={{
            headerTitleStyle: {
              fontSize: 0,
            },
            // headerStyle: {
            //   backgroundColor: "white",
            // },
            // headerTintColor: "black",
            headerTransparent: true,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Classes"
          component={Home}
          options={{
            // headerStyle: {
            //   backgroundColor: "white",
            // },
            // headerTintColor: "black",
            headerTitleStyle: {
              fontSize: 0,
            },
            headerTransparent: true,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Description"
          component={Description}
          options={{
            // headerStyle: {
            //   backgroundColor: "white",
            // },
            // headerTintColor: "black",
            headerTitleStyle: {
              fontSize: 0,
            },
            headerTransparent: true,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Academies"
          component={CAacademies}
          options={{
            // headerStyle: {
            //   backgroundColor: "white",
            // },
            // headerTintColor: "black",
            headerTitleStyle: {
              fontSize: 0,
            },
            headerTransparent: true,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Pick Length"
          component={ChooseLength}
          options={{
            // headerStyle: {
            //   backgroundColor: "white",
            // },
            // headerTintColor: "black",
            headerTitleStyle: {
              fontSize: 0,
            },
            headerTransparent: true,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
