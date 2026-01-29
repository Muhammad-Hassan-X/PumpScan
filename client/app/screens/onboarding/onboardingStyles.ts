import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { StyleSheet } from "react-native";

const OnboardingStyles = StyleSheet.create({
  btnText: {
    color: Colors.sub_heading,
    fontSize: 16,
    fontFamily: font.Bold,
  },
  pagination: {
    marginTop: 30,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginTop: 50,  
  },
  button: {
    backgroundColor: Colors.active_color,

    padding: 12,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "100%",
    height: 300, 
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    justifyContent: "space-between", // push content to top and buttons to bottom
    alignItems: "center",
    paddingVertical: 20,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.heading,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.sub_heading,
    textAlign: "center",
    lineHeight: 22,
  },
});

export default OnboardingStyles;
