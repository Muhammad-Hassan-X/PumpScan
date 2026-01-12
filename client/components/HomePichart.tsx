import Colors from "@/constants/colors";
import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { BarChart } from "react-native-gifted-charts";
import { LineChart } from "react-native-gifted-charts";

const HomePichart = () => {
//   const barData = [
//     { value: 250, label: "Btc" },
//     { value: 500, label: "T", frontColor: "#177AD5" },
//     { value: 745, label: "W", frontColor: "#177AD5" },
//     { value: 320, label: "T" },
//     { value: 600, label: "F", frontColor: "#177AD5" },
//     { value: 256, label: "S" },
//     { value: 300, label: "S" },
//   ];
  const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
  return (
    <View>
      return <LineChart data={data} />;
      {/* <BarChart
        barWidth={5}
        noOfSections={3}
        hideRules
        topLabelTextStyle={{ color: "white", fontSize: 10 }}
        xAxisLabelTextStyle={{ color: "#aaa" }}
        hideYAxisText
        horizontal
        rtl
        barBorderRadius={4}
        frontColor={Colors.heading}
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        style={styles.chart}
      /> */}
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
