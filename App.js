import "react-native-gesture-handler";
import React from "react";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";

const AppNavigator = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs()
  return (
    <NavigationContainer>
      <AppNavigator.Navigator>
        <AppNavigator.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <AppNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "welcome" }}
        />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}
