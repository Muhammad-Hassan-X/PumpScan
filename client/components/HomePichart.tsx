import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { BarChart } from "react-native-gifted-charts";
import { LineChart } from "react-native-gifted-charts";

const HomePichart = () => {
  const pieData = [
    {
      value: 47,
      color: Colors.tintColor,
      // focused: true,
      text: "47%",
    },
    {
      value: 40,
      color: Colors.blue,
      text: "40%",
    },
    {
      value: 16,
      color: Colors.white,
      text: "16%",
    },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97", text: "3%" },
  ];
  const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
  return (
    <View style={{ paddingVertical: 20, alignItems: "center" }}>
      <PieChart
        data={pieData}
        donut
        showGradient
        sectionAutoFocus
        // focusOnPress
        semiCircle
        radius={70}
        innerRadius={55}
        innerCircleColor={Colors.back_ground_color}
        centerLabelComponent={() => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 22,
                  color: Colors.heading,
                  fontFamily: font.Bold,
                }}
              >
                BTC{" "}
                <Text style={{ fontSize: 12, color: Colors.sub_heading }}>
                  4%
                </Text>
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  chart: {
    width: "25%",
    height: "25%",
  },
});

export default HomePichart;
