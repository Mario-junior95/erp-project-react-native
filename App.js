import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";

const AppNavigator = createStackNavigator();

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
