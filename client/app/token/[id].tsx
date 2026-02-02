import { View, Text, StyleSheet, TouchableOpacity , ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HeartIcon from "@/components/Hearticon";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { router } from "expo-router";
import { PieChart } from "react-native-gifted-charts";
import { formatNumber } from "@/utils/formateNumber";
import AddressBadge from "@/components/AddressBadge";
import SocialsRow from "@/components/SocialsRow";

import Animated, { FadeInDown } from "react-native-reanimated";

const TokenReport = () => {
  const pieData = [
    {
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "white" }}>Excellent: 47%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#8F80F3")}
            <Text style={{ color: "white" }}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "white" }}>Good: 40%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF7F97")}
            <Text style={{ color: "white" }}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={28} color={Colors.heading} />
        </TouchableOpacity>

        <Text style={styles.text}>Token Report</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.pageWrapper}>
          {/* HEADER */}

          {/* CONTENT */}
          <View style={styles.container}>
            <Text style={styles.headingTxt}>Total Score</Text>

            <HeartIcon size={30} />
          </View>
          <View style={{ padding: 20, alignItems: "center" }}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={Colors.back_ground_color}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={styles.pieChartTxt}>47%</Text>
                  </View>
                );
              }}
            />
            {renderLegendComponent()}
          </View>
          {/* Market Cap Card */}
          <View style={styles.card}>
            <Text style={styles.marketCapTxt}>Market Cap</Text>
            <View>
              <Text style={styles.marketCapSubTxt}>
                ${formatNumber(100000000)}
              </Text>
            </View>
          </View>
          {/* Detail's of coin  */}
          <View style={styles.deaitlsContainer}>
            <View style={styles.deaitlsWapper}>
              <Text style={styles.marketCapTxt}>Volume (24h)</Text>
              <Text style={styles.marketCapSubTxt}>
                ${formatNumber(100000000)}
              </Text>
            </View>
            <View style={styles.deaitlsWapper}>
              <Text style={styles.marketCapTxt}>Mkt cap (24h)</Text>
              <Text style={styles.marketCapSubTxt}>48%</Text>
            </View>
          </View>
          {/* address section  */}
          <View style={styles.Container}>
            <Text style={styles.soicalText}>Address</Text>
            <AddressBadge
              address="FvwEAh...CgxN5Z"
              image={
                "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
              }
            />
          </View>
          {/* social section  */}
          <View style={styles.Container}>
            <Text style={styles.soicalText}>Social</Text>
            <SocialsRow />
          </View>
          {/* Exchange listing */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.soicalText}>Listed Exchanges</Text>

            <View style={styles.table}>
              {/* Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableText, styles.headerText]}>
                  Exchange
                </Text>
                <Text style={[styles.tableText, styles.headerText]}>Pair</Text>
              </View>

              {/* Rows */}
              <Animated.View
                entering={FadeInDown.delay(100).duration(500)}
                style={styles.tableRow}
              >
                <Text style={styles.tableText}>Binance</Text>
                <Text style={styles.tableText}>BTC / USDT</Text>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(200).duration(500)}
                style={styles.tableRow}
              >
                <Text style={styles.tableText}>Coinbase</Text>
                <Text style={styles.tableText}>BTC / USD</Text>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(300).duration(500)}
                style={styles.tableRow}
              >
                <Text style={styles.tableText}>Kraken</Text>
                <Text style={styles.tableText}>BTC / USD</Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.sub_heading,
    borderRadius: 10,
    overflow: "hidden",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.sub_heading,
  },

  tableHeader: {
    backgroundColor: "#1c1c1e",
  },

  tableText: {
    color: Colors.heading,
    fontSize: 14,
    fontFamily: font.Medium,
  },

  headerText: {
    fontFamily: font.Bold,
    fontSize: 13,
    color: Colors.sub_heading,
  },

  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  soicalText: {
    color: Colors.heading,
    fontSize: 20,
    fontFamily: font.Bold,
  },
  deaitlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  deaitlsWapper: {
    borderWidth: 1,
    borderColor: Colors.sub_heading,
    padding: 20,
    borderRadius: 10,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  marketCapTxt: {
    color: Colors.sub_heading,
    fontSize: 14,
    fontFamily: font.Medium,
  },
  marketCapSubTxt: {
    color: Colors.heading,
    fontSize: 20,
    fontFamily: font.Bold,
    marginTop: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.sub_heading,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pieChartTxt: {
    fontSize: 22,
    color: Colors.heading,
    fontFamily: font.Bold,
  },
  wrapper: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.back_ground_color,
  },

  pageWrapper: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },

  text: {
    color: Colors.heading,
    fontSize: 28,
    fontFamily: font.Bold,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headingTxt: {
    color: Colors.heading,
    fontSize: 20,
    fontFamily: font.Bold,
  },
});

export default TokenReport;
