import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from "react-native";

import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  

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
      }).then((response) => {
        if (response.data.error) {
          alert("Unauthorized");
        } else {
          alert("Welcome back " + username);
          setUsername("");
          setPassword("");
        }
        setToken(response.data.access_token);
        LogBox.ignoreAllLogs(true);
        console.log(token);

        if (token) {
          response &&
            response.data &&
            response.data.access_token &&
            AsyncStorage.setItem("token", response.data.access_token);
        }
      });
    } catch (error) {
      if (
        error.response.data.error.username &&
        error.response.data.error.password
      ) {
        alert(
          error.response.data.error.username +
          " And " + error.response.data.error.password
        );
      } else if (error.response.data.error.username) {
        alert(error.response.data.error.username);
      } else if (error.response.data.error.password) {
        alert(error.response.data.error.password);
      }

      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Username :</Text>
      <TextInput
        style={styles.input}
        onChangeText={(username) => setUsername(username)}
        value={username}
      />
      <Text>Password :</Text>
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
