import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Admin Screen</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
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
      >
        <Text style={styles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: "#fee715ff",
    width:100
  },
  buttonTextStyle: {
    position: "relative",
    left: 20,
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
});
