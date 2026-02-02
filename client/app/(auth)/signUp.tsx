import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import InputField from "@/components/InputField";
import Icon from "@/components/Icons";
import { useRouter } from "expo-router";
import { useSignup } from "@/hooks/useSignup";
import { useModal } from "@/context/ModalContext";
import AnimatedView from "@/components/AnimatedView";

const SignUp = () => {
  const router = useRouter();
  const { showModal } = useModal();
  const { mutate: signupMutate, isPending } = useSignup();

  // ✅ LOCAL STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signup button pressed for:", email);
    if (!name || !email || !password) {
      showModal("Please fill in all fields");
      return;
    }

    signupMutate(
      { name, email, password },
      {
        onSuccess: () => {
          console.log("Signup success, redirecting...");
          router.replace("/(tabs)");
        },
        onError: (err) => {
          console.error("Signup error:", err);
          showModal("Signup failed: Please check your details");
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
          <Text style={styles.text}>Sign Up</Text>
        </AnimatedView>
        <AnimatedView direction="down" delay={200}>
          <Icon name={"Search"} size={300} style={styles.icon} />
        </AnimatedView>

        <AnimatedView direction="up" delay={300}>
          <InputField
            iconName={"user"}
            isPassword={false}
            placeholder="Enter user name"
            value={name}
            onChangeText={setName}
          />
        </AnimatedView>

        <AnimatedView direction="up" delay={400}>
          <InputField
            iconName={"envelope"}
            isPassword={false}
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
          />
        </AnimatedView>

        <AnimatedView direction="up" delay={500}>
          <InputField
            iconName={"lock"}
            isPassword={true}
            placeholder="Enter your Password"
            value={password}
            onChangeText={setPassword}
          />
        </AnimatedView>

        <AnimatedView direction="up" delay={600}>
          <View style={styles.textContainer}>
            <Text style={styles.accountLink}>
              Already have an account?{" "}
              <Pressable onPress={() => router.push("login")}>
                {({ pressed }) => (
                  <Text style={[styles.loginLink, pressed && { opacity: 0.6 }]}>
                    Login
                  </Text>
                )}
              </Pressable>
            </Text>
          </View>

          <Pressable
            onPress={handleSignup}
            style={[styles.button, isPending && { opacity: 0.7 }]}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>
              {isPending ? "Creating account..." : "Sign Up"}
            </Text>
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
    height: 180,
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

export default SignUp;
