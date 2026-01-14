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
import InputField from "@/components/InputField";
import Icon from "@/components/Icons";

const Login = () => {
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
        ></InputField>
        <InputField
          iconName={"lock"}
          isPassword={true}
          placeholder="Enter you Password "
        ></InputField>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.accountLink}>
              Dont have an account?{" "}
              <Pressable onPress={() => console.log("Go to Login")}>
                {({ pressed }) => (
                  <Text style={[styles.loginLink, pressed && { opacity: 0.6 }]}>
                    SignUp
                  </Text>
                )}
              </Pressable>
            </Text>
          </View>

          <Pressable
            onPress={() => console.log("Pressed")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
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
