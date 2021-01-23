import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const image = require("../../images/login-bg.jpg");

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
          " Accept": "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.data.error) {
          alert("Unauthorized");
        } else {
          alert("Welcome back " + username);
          setUsername("");
          setPassword("");
          response &&
            response.data &&
            response.data.access_token &&
            AsyncStorage.setItem("token", response.data.access_token);

          setToken(response.data.access_token);
          LogBox.ignoreAllLogs(true);
          console.log(token);
        }
      });
    } catch (error) {
      if (
        error.response.data.error.username &&
        error.response.data.error.password
      ) {
        alert(
          error.response.data.error.username +
            " And " +
            error.response.data.error.password
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
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.loginForm}>
          <Text style={styles.text}>Username :</Text>
          <Icon
            style={styles.icon}
            name="person-outline"
            size={24}
            color="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={(username) => setUsername(username)}
            value={username}
            placeholder="Enter your username"
            placeholderTextColor="#fee715ff"
          />
          <Text style={styles.text}>Password :</Text>
          <Icon
            style={styles.icon}
            name="lock-closed-outline"
            size={24}
            color="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            value={password}
            placeholder="Enter your password"
            placeholderTextColor="#fee715ff"
            type="password"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleLogin}
          >
            <Text style={styles.buttonTextStyle}>Login</Text>
          </TouchableOpacity>
        </View>
        {token ? navigation.navigate("Admin") : navigation.navigate("Login")}
      </ImageBackground>
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
    width: 250,
    borderColor: "rgb(255,255,255)f",
    borderWidth: 0,
    marginTop: -20,
    borderBottomWidth: 1,
    borderRadius: 5,
    color: "rgb(255,255,255)",
    marginBottom: 25,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  loginForm: {
    position: "absolute",
    left: 55,
  },
  text: {
    color: "rgb(255,255,255)",
  },
  icon: {
    color: "rgb(255,255,255)",
    position: "relative",
    left: 220,
    top: 10,
  },
  buttonStyle: {
    backgroundColor: "#fee715ff",
  },
  buttonTextStyle: {
    position: "relative",
    left: 90,
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
});
