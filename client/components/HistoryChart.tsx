import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface HistoryChartProps {
  data: { timestamp: number; price: number }[];
}

export default function HistoryChart({ data }: HistoryChartProps) {
  const labelFont = useFont(require("../assets/fonts/Ubuntu-Medium.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const animatedText = useAnimatedProps(() => {
    return {
      text: state.y.price.value.value.toFixed(4),
    };
  });

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No price history available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartHeader}>
        <Text style={styles.title}>Price Statistics (7D)</Text>
        {isActive ? (
          <View style={styles.activeValueContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <Text style={styles.activeValue}>{state.y.price.value.value.toFixed(6)}</Text>
          </View>
        ) : (
          <Text style={styles.subtitle}>Scrub to see history</Text>
        )}
      </View>

      <View style={{ height: 220, width: "100%" }}>
        <CartesianChart
          data={data}
          xKey="timestamp"
          yKeys={["price"]}
          chartPressState={state}
          axisOptions={{
            font: labelFont,
            labelColor: Colors.sub_heading,
            lineColor: "#333",
            tickCount: 5,
            formatYLabel: (v) => `$${v.toFixed(2)}`,
            formatXLabel: (v) => "", // Keep it clean, only show value on press
          }}
        >
          {({ points }) => (
            <>
              <Line
                points={points.price}
                color={Colors.active_color}
                strokeWidth={3}
                animate={{ type: "timing", duration: 500 }}
              />
              {isActive && (
                <Circle
                  cx={state.x.position}
                  cy={state.y.price.position}
                  r={8}
                  color={Colors.active_color}
                />
              )}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1e",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  chartHeader: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: Colors.heading,
    fontSize: 18,
    fontFamily: font.Bold,
  },
  subtitle: {
    color: Colors.sub_heading,
    fontSize: 12,
    fontFamily: font.Regular,
  },
  activeValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dollarSign: {
    color: Colors.active_color,
    fontSize: 14,
    fontFamily: font.Bold,
    marginRight: 2,
  },
  activeValue: {
    color: Colors.active_color,
    fontSize: 18,
    fontFamily: font.Bold,
  },
  emptyContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
    borderRadius: 15,
    marginTop: 20,
  },
  emptyText: {
    color: Colors.sub_heading,
    fontFamily: font.Regular,
  },
});
