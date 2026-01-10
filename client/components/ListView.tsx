import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import { formatNumber } from "@/utils/formateNumber";
import TokenData from "@/data/token";
import MarketCap from "./MarketCap";

const ListView = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.priceContainer}>
          <Text style={styles.price}>$ {formatNumber(item.current_price)}</Text>

          <Text style={styles.pair}> / USDT</Text>
        </Text>
        <Text
          style={[
            styles.change,
            { color: item.price_change_percentage_24h >= 0 ? "green" : "red" },
          ]}
        >
          {item.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={TokenData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 10 }}
      ListHeaderComponent={<MarketCap />}
    />
  );
};

export default ListView;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.back_ground_color,
    padding: 12,

    marginBottom: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderTopWidth: 1,
            borderColor: "#333",
            borderTopColor: "#333",
            shadowColor: Colors.dark,

    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  name: {
    color: Colors.heading,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Ubuntu-Bold",
  },
  symbol: {
    color: Colors.sub_heading,
    fontSize: 12,
    fontFamily: "Ubuntu-Regular",
  },
  price: {
    color: Colors.heading,
    fontSize: 25,
    fontWeight: "600",
    fontFamily: "Ubuntu-Bold",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  change: {
    fontSize: 12,
  },
  pair: {
    fontSize: 16, // 🔽 Smaller pair text
    color: Colors.sub_heading,
    marginBottom: 4, // Align with price baseline
    fontFamily: "Ubuntu-Regular",
  },
});
