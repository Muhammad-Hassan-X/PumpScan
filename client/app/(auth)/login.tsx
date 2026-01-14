import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import InputField from "@/components/InputField";
import Icon from "@/components/Icons";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // ✅ Mock authentication
    if (email === "test@example.com" && password === "1234") {
      // Save token
      await AsyncStorage.setItem("token", "user-token");

      // Navigate to tabs (replace so user can't go back)
      router.replace("/(tabs)");
    } else {
      alert("Invalid credentials");
    }
  };

  const router = useRouter();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <Icon name={"Login"} size={300} style={styles.icon} />

        <InputField
          iconName={"envelope"}
          isPassword={false}
          placeholder="Enter you Email"
          value={email}
          onChangeText={setEmail}
        ></InputField>
        <InputField
          iconName={"lock"}
          isPassword={true}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter you Password "
        ></InputField>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.accountLink}>
              Dont have an account?{" "}
              <Pressable onPress={() => router.push("signUp")}>
                {({ pressed }) => (
                  <Text style={[styles.loginLink, pressed && { opacity: 0.6 }]}>
                    SignUp
                  </Text>
                )}
              </Pressable>
            </Text>
          </View>

          <Pressable style={styles.button} onPress={handleLogin}>
            {({ pressed }) => (
              <Text style={[styles.buttonText, pressed && { opacity: 0.6 }]}>
                Login
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.back_ground_color,
  },
  text: {
    fontFamily: font.Bold,
    color: Colors.heading,
    fontSize: 36,
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.active_color,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    overflow: "hidden",
  },
  accountLink: {
    color: Colors.heading,
    fontFamily: font.Bold,
    marginLeft: 20,
    marginTop: 10,
    marginRight: 6,
  },
  loginLink: {
    color: Colors.active_color,
    fontFamily: font.Bold,
  },
  buttonText: {
    color: Colors.heading,
    fontSize: 16,
    fontFamily: font.Bold,
  },
  icon: {
    width: "100%",
    marginTop: 10,
    height: "100%",
    alignSelf: "center",
  },
  nameTag: {
    color: Colors.heading,
  },
  textContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
});

export default Login;
