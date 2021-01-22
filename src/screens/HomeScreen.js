import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { View, Text, Button, Alert } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Admin Screen</Text>
      <Button
        title="Log Out"
        onPress={() => {
          Alert.alert(
            "Logout",
            "Are you sure? You want to logout?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  return null;
                },
              },
              {
                text: "Confirm",
                onPress: () => {
                  AsyncStorage.clear();
                  navigation.replace("Login");
                  // AsyncStorage.removeItem("token");
                  //removeItem() work the same as clear()
                },
              },
            ],
            { cancelable: false }
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;
