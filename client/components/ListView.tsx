import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { formatNumber } from "@/utils/formateNumber";
import MarketCap from "./MarketCap";
import api from "@/lib/api";

const ListView = () => {
  const router = useRouter();
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTrendingTokens();
  }, []);

  const fetchTrendingTokens = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tokens/trending");
      if (response.data && Array.isArray(response.data)) {
        setTokens(response.data);
      } else if (response.data.success && response.data.data) {
        const rawData = response.data.data;
        // Handle both flat array and nested success/data object (compat with old server version)
        const finalData = Array.isArray(rawData) ? rawData : (rawData?.data || []);
        setTokens(finalData);
      }
    } catch (err) {
      console.error("Failed to fetch trending tokens:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  const onRefresh = () => {
    setRefreshing(true);
    fetchTrendingTokens();
  };

  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(500)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/token/[id]",
            params: { id: item.id },
          })
        }
      >
        {/* TOKEN IMAGE */}
        <Image source={{ uri: item.image }} style={styles.image} />

        {/* NAME & SYMBOL */}
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
        </View>

        {/* PRICE & CHANGE */}
        <View style={styles.priceWrapper}>
          <Text style={styles.priceContainer}>
            <Text style={styles.price}>
              ${formatNumber(item.current_price)}
            </Text>
            <Text style={styles.pair}> / USDT</Text>
          </Text>
          <Text
            style={[
              styles.change,
              {
                color:
                  item.price_change_percentage_24h >= 0 ? "#16a34a" : "#dc2626",
              },
            ]}
          >
            {item.price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.active_color} />
        <Text style={styles.loaderText}>Fetching real-time data...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tokens}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 10, paddingBottom: 30 }}
      ListHeaderComponent={<MarketCap />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.active_color} />
      }
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.back_ground_color,
  },
  loaderText: {
    color: Colors.sub_heading,
    marginTop: 10,
    fontFamily: "Ubuntu-Medium",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.back_ground_color,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  image: {
    width: 38,
    height: 38,
    marginRight: 12,
    borderRadius: 19,
  },
  nameWrapper: {
    flex: 1,
  },
  name: {
    color: Colors.heading,
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Ubuntu-Bold",
  },
  symbol: {
    color: Colors.sub_heading,
    fontSize: 12,
    fontFamily: "Ubuntu-Regular",
    marginTop: 2,
  },
  priceWrapper: {
    alignItems: "flex-end",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  price: {
    color: Colors.heading,
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Ubuntu-Bold",
  },
  pair: {
    fontSize: 12,
    color: Colors.sub_heading,
    marginBottom: 2,
    fontFamily: "Ubuntu-Regular",
  },
  change: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: "Ubuntu-Medium",
  },
});

export default ListView;
