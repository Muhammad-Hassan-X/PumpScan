import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "expo-router";

const WatchlistScreen = () => {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const response = await api.get("/watch-list");
      if (response.data.success) {
        setWatchlist(response.data.data || []);
      }
    } catch (e: any) {
      if (e?.response?.status === 401) {
        setWatchlist([]);
      } else {
        console.warn("Failed to fetch watchlist:", e?.message);
      }
    } finally {
      setLoading(false);
    }
  };


  const renderItem = ({ item, index }: any) => {
    const tokenInfo = item.tokens; // ⭐ Map from the join
    const riskColor = tokenInfo?.risk_score >= 80 ? "#3BE9DE" : tokenInfo?.risk_score >= 60 ? "#8F80F3" : "#FF7F97";

    return (
      <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => router.push(`/token/${item.token_address}`)}
        >
          <Image
            source={{ uri: tokenInfo?.image || "https://cryptologos.cc/logos/bitcoin-btc-logo.png" }}
            style={styles.image}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.name}>{tokenInfo?.name || "Unknown Token"}</Text>
            <Text style={styles.symbol}>{tokenInfo?.symbol?.toUpperCase() || "???"}</Text>
          </View>

          <View style={styles.scoreContainer}>
             <Text style={styles.scoreLabel}>Safety</Text>
             <Text style={[styles.scoreValue, { color: riskColor }]}>{tokenInfo?.risk_score || "0"}%</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Watchlist</Text>
      {loading ? (
        <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={Colors.active_color} />
        </View>
      ) : watchlist.length === 0 ? (
        <View style={styles.stateContainer}>
            <Text style={styles.emptyText}>Your watchlist is empty.</Text>
            <TouchableOpacity style={styles.searchBtn} onPress={() => router.push("/screens/searchpage")}>
                <Text style={styles.searchBtnText}>Explore Tokens</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          onRefresh={fetchWatchlist}
          refreshing={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontFamily: font.Bold,
    color: Colors.heading,
    marginBottom: 20,
  },
  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
  },
  emptyText: {
    color: Colors.sub_heading,
    fontFamily: font.Medium,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: Colors.active_color,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  searchBtnText: {
    color: "#000",
    fontFamily: font.Bold,
    fontSize: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 15,
  },
  textWrapper: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: font.Bold,
    color: Colors.heading,
  },
  symbol: {
    fontSize: 12,
    fontFamily: font.Regular,
    color: Colors.sub_heading,
    marginTop: 2,
  },
  scoreContainer: {
    alignItems: "center",
    backgroundColor: "#2c2c2e",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  scoreLabel: {
    fontSize: 10,
    color: Colors.sub_heading,
    fontFamily: font.Medium,
  },
  scoreValue: {
    fontSize: 14,
    fontFamily: font.Bold,
  },
});

export default WatchlistScreen;
