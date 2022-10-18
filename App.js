import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
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
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Year" component={ChooseYear} />

        <Stack.Screen name="Class Taken" component={CustomYear} />
        <Stack.Screen name="Add Class" component={CustomClass} />
        <Stack.Screen name="Schedule" component={ChooseClasses} />
        <Stack.Screen name="Subjects" component={Original} />
        <Stack.Screen name="Classes" component={Home} />
        <Stack.Screen name="Description" component={Description} />
        <Stack.Screen name="Academies" component={CAacademies} />
        <Stack.Screen name="Pick Action" component={ChooseLength} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
