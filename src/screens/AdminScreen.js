import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Axios from "axios";

const AdminScreen = ({ navigation }) => {

  //Example how to map with headers in react native 
  const [ListData, setListData] = useState([]);
  const getToken = async () => AsyncStorage.getItem("token");

  const addTest = async () => {
    let token = await getToken();
    console.log(token);
    Axios.get("http://192.168.0.107:8000/api/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((result) => {
      setListData(result.data);
    });
  };

  React.useEffect(() => {
    addTest();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Admin Screen</Text>
      {ListData.map((val) => {
        return (
          <View key={val.id}>
            <Text>{val.firstname}</Text>
          </View>
        );
      })}
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
                  AsyncStorage.removeItem("token");
                  navigation.replace("Login");
                  console.log(AsyncStorage.removeItem("token"));
                  // AsyncStorage.removeItem("token");
                  //removeItem() work the same as clear()s
                },
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={styles.buttonTextStyle}>LogOut</Text>
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
    width: 100,
  },
  buttonTextStyle: {
    position: "relative",
    left: 12,
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
});
