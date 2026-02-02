import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import InputField from "@/components/InputField";
import Icon from "@/components/Icons";
import { useRouter } from "expo-router";
import { useLogin } from "@/hooks/useLogin";
import { useModal } from "@/context/ModalContext";
import AnimatedView from "@/components/AnimatedView";

const Login = () => {
  const router = useRouter();
  const { showModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginMutate, isPending } = useLogin();

  const handleLogin = () => {
    console.log("Login button pressed with:", email);
    if (!email || !password) {
      showModal("Please fill in all fields", "error");
      return;
    }

    loginMutate(
      { email, password },
      {
        onSuccess: () => {
          console.log("Login success, redirecting...");
          router.replace("/(tabs)");
        },
        onError: (err) => {
          console.error("Login error:", err);
          showModal("Login failed: Invalid credentials");
        },
      },
    );
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contentContainer}>
        <AnimatedView direction="down" delay={100}>
          <Text style={styles.text}>Login</Text>
        </AnimatedView>
        <AnimatedView direction="down" delay={200}>
          <Icon name={"Login"} size={300} style={styles.icon} />
        </AnimatedView>

        <AnimatedView direction="up" delay={300}>
          <InputField
            iconName={"envelope"}
            isPassword={false}
            placeholder="Enter you Email"
            value={email}
            onChangeText={setEmail}
          ></InputField>
        </AnimatedView>
        <AnimatedView direction="up" delay={400}>
          <InputField
            iconName={"lock"}
            isPassword={true}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter you Password "
          ></InputField>
        </AnimatedView>
        <AnimatedView direction="up" delay={500}>
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

          <Pressable
            style={[styles.button, isPending && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={isPending}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, pressed && { opacity: 0.6 }]}>
                {isPending ? "Logging in..." : "Login"}
              </Text>
            )}
          </Pressable>
        </AnimatedView>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Colors.back_ground_color,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
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
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
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
