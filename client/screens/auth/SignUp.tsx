import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { SimpleLineIcons } from "@expo/vector-icons";
import InputField from "@/components/InputField";

const SignUp = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Sign Up</Text>

        <InputField
          iconName={"user"}
          isPassword={false}
          placeholder="Enter user name "
        ></InputField>
        <InputField
          iconName={"envelope"}
          isPassword={false}
          placeholder="Enter you Email"
        ></InputField>
        <InputField
          iconName={"lock"}
          isPassword={true}
          placeholder="Enter you Password "
        ></InputField>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.accountLink}>
              Already have an account?{" "}
              <Pressable onPress={() => console.log("Go to Login")}>
                {({ pressed }) => (
                  <Text style={[styles.loginLink, pressed && { opacity: 0.6 }]}>
                    Login
                  </Text>
                )}
              </Pressable>
            </Text>
          </View>

          <Pressable
            onPress={() => console.log("Pressed")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 5 },
  text: {
    fontFamily: font.Bold,
    color: Colors.heading,
    fontSize: 36,
  },
  button: {
    backgroundColor: Colors.active_color, // ❗ REQUIRED
    height: 52, // ❗ REQUIRED
    borderRadius: 12,
    justifyContent: "center", // center text vertically
    alignItems: "center", // center text horizontally
    marginTop: 20,
    width: "100%",
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
    fontWeight: "600",
  },
  nameTag: {
    color: Colors.heading,
  },
  textContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
});

export default SignUp;
