import "react-native-gesture-handler";
import React from "react";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";

const AppNavigator = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <AppNavigator.Navigator initialRouteName="Login">
        <AppNavigator.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" ,headerLeft: false  }}
        />
        <AppNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Admin", headerLeft: false }}
        />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}
