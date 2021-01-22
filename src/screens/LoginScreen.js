import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";


import { LogBox } from "react-native"

import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [userNameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [authErr, setAuthErr] = useState("");

  const handleLogin = async () => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    try {
      await Axios.post("http://192.168.0.107:8000/api/login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then((response) => {
        setUsernameErr("");
        setPasswordErr("");
        setToken(response.data.access_token);
        console.log(token);
        {
          response &&
            response.data &&
            response.data.access_token &&
            AsyncStorage.setItem("token", response.data.access_token);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(username) => setUsername(username)}
        value={username}
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        value={password}
        secureTextEntry
      />
      <Button title="LogIn" onPress={handleLogin} />
      {token ? navigation.navigate("Home") : navigation.navigate("Login")}
      
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
  },
});
