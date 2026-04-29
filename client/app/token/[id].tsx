import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import HeartIcon from "@/components/Hearticon";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { router, useLocalSearchParams } from "expo-router";
import { PieChart } from "react-native-gifted-charts";
import { formatNumber } from "@/utils/formateNumber";
import AddressBadge from "@/components/AddressBadge";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import HistoryChart from "@/components/HistoryChart";
import SocialsRow from "@/components/SocialsRow";


const TokenReport = () => {
  const { id } = useLocalSearchParams();
  const tokenHeader = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState<any>(null);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTokenData();
      if (tokenHeader) {
        checkWatchlistStatus();
      }
    }
  }, [id, tokenHeader]);


  const fetchTokenData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tokens?q=${encodeURIComponent(id as string)}`);
      if (response.data.success && response.data.data) {
        setTokenData(response.data.data);
      }
    } catch (error: any) {
      console.error("Token Fetch Axios Error:", error.message);
      if (error.response?.data?.message) {
        console.error("Backend Error:", error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };


  const checkWatchlistStatus = async () => {
    try {
      const response = await api.get("/watch-list");
      if (response.data.success) {
        const found = response.data.data.some((item: any) => 
          item.token_id === id || (item.tokens && item.tokens.address === id)
        );
        setIsWatched(found);
      }
    } catch (e: any) {
      // 401 = session expired / not logged in — expected, handle silently
      if (e?.response?.status === 401) {
        setIsWatched(false);
      } else {
        console.warn("Failed to check watchlist status:", e?.message);
      }
    }
  };


  const toggleWatchlist = async () => {
    if (!tokenHeader) {
      Alert.alert("Sign In Needed", "You must be logged in to save tokens to your watchlist.");
      return;
    }
    if (!tokenData?.token?.id) return;

    try {
      if (isWatched) {
        await api.delete(`/watch-list?id=${tokenData.token.id}`);
        setIsWatched(false);
        Alert.alert("Success", "Removed from watchlist");
      } else {
        await api.post("/watch-list", { token_id: tokenData.token.id });
        setIsWatched(true);
        Alert.alert("Success", "Added to watchlist!");
      }
    } catch (e: any) {
      if (e?.response?.status === 401) {
        Alert.alert("Session Expired", "Please sign in again to use your watchlist.");
      } else {
        console.warn("Toggle watchlist failed:", e?.message);
        Alert.alert("Error", "Action failed. Please try again.");
      }
    }
  };


  if (loading || !tokenData) {
    return (
      <View
        style={[
          styles.wrapper,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.active_color} />
      </View>
    );
  }

  const { token, safetyReport, coinGecko } = tokenData;
  const score = safetyReport?.score || 0;

  const pieData = [
    {
      value: score,
      color: score >= 80 ? "#3BE9DE" : score >= 60 ? "#8F80F3" : "#FF7F97",
      gradientCenterColor:
        score >= 80 ? "#006DFF" : score >= 60 ? "#BDB2FA" : "#FFA5BA",
      focused: true,
    },
    { value: 100 - score, color: "#1c1c1e" },
  ];

  return (
    <View style={styles.wrapper}>
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={28} color={Colors.heading} />
        </TouchableOpacity>
        <Text style={styles.text}>{token.name} Report</Text>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.pageWrapper}>
          
          {/* Top Section: Safety Score & Watchlist */}
          <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.container}>
            <View>
              <Text style={styles.headingTxt}>Safety Score</Text>
              <Text
                style={[
                  styles.marketCapSubTxt,
                  {
                    marginTop: 10,
                    fontSize: 20,
                    color:
                      score >= 80
                        ? "#3BE9DE"
                        : score >= 60
                          ? "#8F80F3"
                          : "#FF7F97",
                  },
                ]}
              >
                {safetyReport?.label || "Unknown"}
              </Text>
            </View>
            <TouchableOpacity onPress={toggleWatchlist} style={styles.iconContainer}>
              <HeartIcon size={30} fill={isWatched} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <HistoryChart data={coinGecko?.priceHistory || []} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.chartContainer}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={85}
              innerRadius={58}
              innerCircleColor={Colors.back_ground_color}
              centerLabelComponent={() => (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.pieChartTxt}>{score}/100</Text>
                </View>
              )}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.reportCard}>
            <Text style={styles.headingTxt}>Quality Breakdown</Text>
            
            <View style={styles.reportRow}>
              <View style={[styles.iconBox, { backgroundColor: "#8F80F320" }]}>
                <Ionicons name="shield-checkmark" size={18} color="#8F80F3" />
              </View>
              <Text style={styles.reportLabel}>Security:</Text>
              <Text style={styles.reportValue}>{safetyReport.report.security?.reason || "Safe"} ({safetyReport.report.security?.score}/30)</Text>
            </View>

            <View style={styles.reportRow}>
              <View style={[styles.iconBox, { backgroundColor: "#3BE9DE20" }]}>
                <Ionicons name="water" size={18} color="#3BE9DE" />
              </View>
              <Text style={styles.reportLabel}>Liquidity:</Text>
              <Text style={styles.reportValue}>Checked ({safetyReport.report.liquidity?.score}/20)</Text>
            </View>

            <View style={styles.reportRow}>
              <View style={[styles.iconBox, { backgroundColor: "#FFD70020" }]}>
                <Ionicons name="list" size={18} color="#FFD700" />
              </View>
              <Text style={styles.reportLabel}>Listings:</Text>
              <Text style={styles.reportValue}>{coinGecko?.exchanges?.length || 0} Exchanges ({safetyReport.report.exchanges?.score}/15)</Text>
            </View>

            <View style={styles.reportRow}>
              <View style={[styles.iconBox, { backgroundColor: "#FF7F9720" }]}>
                <Ionicons name="time" size={18} color="#FF7F97" />
              </View>
              <Text style={styles.reportLabel}>Maturity:</Text>
              <Text style={styles.reportValue}>{safetyReport.report.ageAndVolatility?.isNew ? "New Pair" : "Established"} ({safetyReport.report.ageAndVolatility?.score}/20)</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="globe-outline" size={20} color={Colors.sub_heading} />
              <Text style={styles.marketCapTxt}>Market Cap</Text>
            </View>
            <Text style={styles.marketCapSubTxt}>
              ${token.marketCapUsd ? formatNumber(token.marketCapUsd) : "N/A"}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(700).duration(500)} style={styles.deaitlsContainer}>
            <View style={styles.deaitlsWapper}>
              <View style={styles.cardHeader}>
                <Ionicons name="bar-chart-outline" size={18} color={Colors.sub_heading} />
                <Text style={styles.marketCapTxt}>Volume (24h)</Text>
              </View>
              <Text style={styles.marketCapSubTxt}>
                ${token.volume24h ? formatNumber(token.volume24h) : "N/A"}
              </Text>
            </View>
            <View style={styles.deaitlsWapper}>
              <View style={styles.cardHeader}>
                <Ionicons name="pricetag-outline" size={18} color={Colors.sub_heading} />
                <Text style={styles.marketCapTxt}>Price</Text>
              </View>
              <Text style={styles.marketCapSubTxt}>
                ${token.priceUsd ? Number(token.priceUsd).toFixed(6) : "N/A"}
              </Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(500)} style={styles.deaitlsContainer}>
            <View style={styles.deaitlsWapper}>
              <View style={styles.cardHeader}>
                <Ionicons name="water-outline" size={18} color={Colors.sub_heading} />
                <Text style={styles.marketCapTxt}>Liquidity</Text>
              </View>
              <Text style={styles.marketCapSubTxt}>
                ${token.liquidityUsd ? formatNumber(token.liquidityUsd) : "N/A"}
              </Text>
            </View>
            <View style={styles.deaitlsWapper}>
              <View style={styles.cardHeader}>
                <Ionicons name={token.priceChange24h > 0 ? "trending-up-outline" : "trending-down-outline"} size={18} color={token.priceChange24h > 0 ? "#3BE9DE" : "#FF7F97"} />
                <Text style={styles.marketCapTxt}>24h Change</Text>
              </View>
              <Text
                style={[
                  styles.marketCapSubTxt,
                  { color: token.priceChange24h > 0 ? "#3BE9DE" : "#FF7F97" },
                ]}
              >
                {token.priceChange24h
                  ? (token.priceChange24h > 0 ? "+" : "") +
                    token.priceChange24h.toFixed(2) +
                    "%"
                  : "N/A"}
              </Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(900).duration(500)} style={styles.Container}>
            <Text style={styles.soicalText}>Token Linkage</Text>
            <SocialsRow socials={coinGecko?.socials} websites={coinGecko?.websites} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1000).duration(500)} style={styles.Container}>
            <Text style={styles.soicalText}>Address</Text>
            {token.address && (
              <AddressBadge
                address={
                  token.address.slice(0, 8) + "..." + token.address.slice(-8)
                }
                image={token.image || "https://cryptologos.cc/logos/bitcoin-btc-logo.png"}
              />
            )}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1100).duration(500)} style={{ marginTop: 25 }}>
            <Text style={styles.soicalText}>Listed Exchanges</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableText, styles.headerText]}>Exchange</Text>
                <Text style={[styles.tableText, styles.headerText]}>Pair</Text>
              </View>
              {coinGecko?.exchanges?.map((ex: any, idx: number) => (
                <View
                  key={idx}
                  style={styles.tableRow}
                >
                  <Text style={styles.tableText}>{ex.exchange}</Text>
                  <Text style={styles.tableText}>{ex.pair}</Text>
                </View>
              ))}
              {(!coinGecko?.exchanges || coinGecko.exchanges.length === 0) && (
                <View style={styles.tableRow}>
                  <Text style={styles.tableText}>No major exchanges found</Text>
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#2A2A2E",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#161618",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2E",
  },
  tableHeader: {
    backgroundColor: "#1C1C1E",
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
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  Container: {
    marginTop: 25,
    gap: 12,
  },
  soicalText: {
    color: Colors.heading,
    fontSize: 20,
    fontFamily: font.Bold,
    marginBottom: 4,
  },
  deaitlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  deaitlsWapper: {
    backgroundColor: "#161618",
    borderWidth: 1,
    borderColor: "#2A2A2E",
    padding: 18,
    borderRadius: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  marketCapTxt: {
    color: Colors.sub_heading,
    fontSize: 13,
    fontFamily: font.Medium,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  marketCapSubTxt: {
    color: Colors.heading,
    fontSize: 19,
    fontFamily: font.Bold,
  },
  card: {
    backgroundColor: "#161618",
    borderWidth: 1,
    borderColor: "#2A2A2E",
    padding: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 16,
  },
  chartContainer: {
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: "#161618",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A2E",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  pieChartTxt: {
    fontSize: 24,
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
    gap: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    color: Colors.heading,
    fontSize: 22,
    fontFamily: font.Bold,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#161618",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A2E",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "#1C1C1E",
    padding: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#2A2A2E",
  },
  headingTxt: {
    color: Colors.heading,
    fontSize: 18,
    fontFamily: font.Bold,
    marginBottom: 6,
  },
  reportCard: {
    backgroundColor: "#161618",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#2A2A2E",
  },
  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  reportLabel: {
    color: Colors.heading,
    fontFamily: font.Bold,
    fontSize: 15,
    width: 80,
  },
  reportValue: {
    color: Colors.sub_heading,
    fontFamily: font.Medium,
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
});

export default TokenReport;
