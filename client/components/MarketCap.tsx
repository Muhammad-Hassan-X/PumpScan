import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/colors";
import AnimatedCounter from "./Counter";
import cs from "@/styles";
import HomePichart from "./HomePichart";
import font from "@/constants/fonts";
import api from "@/lib/api";

const MarketCap = () => {
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await api.get("/tokens/global");
        if (response.data.success) {
          const rawData = response.data.data;
          // Handle both flat and nested responses (compat with old server version)
          const finalData = rawData?.data || rawData;
          setGlobalData(finalData);
        }
      } catch (error) {
        console.error("Failed to fetch global data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGlobalData();
  }, []);
  
  return (
    <>
      <View style={cs.container}>
        <View style={styles.wapper}>
          <View>
            <Text style={styles.headingText}>Total Market Cap </Text>

            {loading ? (
               <ActivityIndicator size="small" color={Colors.active_color} style={{ marginTop: 10 }} />
            ) : (
              <AnimatedCounter
                value={globalData?.total_market_cap || 2560000000000}
                duration={2000}
                style={styles.counter}
              />
            )}
          </View>

          <View>
            <HomePichart />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.tokenText}>Top 50 Tokens</Text>
      </View>
    </>
  );
};


export default MarketCap;

const styles = StyleSheet.create({
  headingText: {
    color: Colors.heading,
    fontFamily: font.Bold,
    marginBottom: 5,
    fontSize: 15,
  },
  tokenText: {
    color: Colors.heading,
    fontFamily: "Ubuntu-Bold",
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
  },

  counter: {
    fontSize: 48,
    marginTop: 10,
    color: Colors.heading,
    fontFamily: "Ubuntu-Bold",
  },
  wapper: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
