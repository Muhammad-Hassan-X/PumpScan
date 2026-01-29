import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import HeartIcon from "@/components/Hearticon";
import { PieChart } from "react-native-gifted-charts";

const TokenReport = () => {
  const data = [
    { value: 10, color: "#FF6384", label: "Poor" },
    { value: 20, color: "#36A2EB", label: "Okay" },
    { value: 30, color: "#FFCE56", label: "Good" },
    { value: 40, color: "#4BC0C0", label: "Excellent" },
  ];

  const renderDot = (color: string) => (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 8,
      }}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.wapper}>
        <Text style={styles.headingtxt}>Token Report</Text>
        <HeartIcon liked={true} size={30} />
      </View>

      {/* Chart */}
      <View style={styles.chartWrapper}>
        <PieChart
          data={data}
          donut
          semiCircle
          radius={100}
          innerRadius={70}
          showGradient
          innerCircleColor={Colors.back_ground_color}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerLabelText}>Total</Text>
              <Text style={styles.centerLabelValue}>100%</Text>
            </View>
          )}
        />
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            {renderDot("#4BC0C0")}
            <Text style={styles.legendText}>Excellent 40%</Text>
          </View>

          <View style={styles.legendItem}>
            {renderDot("#FFCE56")}
            <Text style={styles.legendText}>Good 30%</Text>
          </View>
        </View>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            {renderDot("#36A2EB")}
            <Text style={styles.legendText}>Okay 20%</Text>
          </View>

          <View style={styles.legendItem}>
            {renderDot("#FF6384")}
            <Text style={styles.legendText}>Poor 10%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TokenReport;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  wapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headingtxt: {
    color: Colors.heading,
    fontFamily: font.Bold,
    fontSize: 16,
  },

  chartWrapper: {
    height: 220, // 🔴 REQUIRED
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  centerLabel: {
    alignItems: "center",
    marginTop: -10,
  },

  centerLabelText: {
    fontSize: 14,
    color: Colors.heading,
    fontFamily: font.Medium,
  },

  centerLabelValue: {
    fontSize: 20,
    color: Colors.heading,
    fontFamily: font.Bold,
  },

  legend: {
    marginTop: 10,
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    width: 140,
  },

  legendText: {
    color: Colors.heading,
    fontSize: 13,
    fontFamily: font.Medium,
  },
});
