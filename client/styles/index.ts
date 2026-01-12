import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    padding: 10,
    flexDirection: "row",
  },
  icon: {
    color: Colors.heading,
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: Colors.heading,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  input: {
    color: Colors.sub_heading,
    fontFamily: font.Regular,
    flex: 1,
  },
});

export default styles;
