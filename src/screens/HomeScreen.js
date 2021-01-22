import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {

  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Log Out" onPress={() => {navigation.navigate("Login"); AsyncStorage.removeItem('token')}} />
    </View>
  );
};

export default HomeScreen;
