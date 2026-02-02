import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { formatNumber } from "@/utils/formateNumber";
import TokenData from "@/data/token";
import MarketCap from "./MarketCap";

const ListView = () => {
  const router = useRouter();

  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/crypto/${item.id}`)}
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
              }, // green / red
            ]}
          >
            {item.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <FlatList
      data={TokenData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 10, paddingBottom: 30 }}
      ListHeaderComponent={<MarketCap />}
    />
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.back_ground_color,
    paddingVertical: 8, // reduced padding
    paddingHorizontal: 12,
    marginBottom: 8, // reduced spacing
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: Colors.dark,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3, // smaller shadow
  },
  image: {
    width: 36, // slightly smaller
    height: 36,
    marginRight: 10,
  },
  nameWrapper: {
    flex: 1,
  },
  name: {
    color: Colors.heading,
    fontSize: 14, // smaller font
    fontWeight: "600",
    fontFamily: "Ubuntu-Bold",
  },
  symbol: {
    color: Colors.sub_heading,
    fontSize: 11, // smaller font
    fontFamily: "Ubuntu-Regular",
    marginTop: 1,
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
    fontSize: 18, // reduced font
    fontWeight: "600",
    fontFamily: "Ubuntu-Bold",
  },
  pair: {
    fontSize: 12,
    color: Colors.sub_heading,
    marginBottom: 2,
    fontFamily: "Ubuntu-Regular",
  },
  change: {
    fontSize: 11,
    marginTop: 2,
  },
});

export default ListView;
