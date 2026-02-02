import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";

// Mock search history data
const searchHistory = [
  {
    id: "1",
    query: "Bitcoin",
    subtitle: "Last searched 2 min ago",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=023",
  },
  {
    id: "2",
    query: "Ethereum",
    subtitle: "Last searched 1 hr ago",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023",
  },
  {
    id: "3",
    query: "Solana",
    subtitle: "Last searched yesterday",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png?v=023",
  },
  {
    id: "4",
    query: "Cardano",
    subtitle: "Last searched 2 days ago",
    image: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=023",
  },
];

const HistoryScreen = () => {
  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        {/* IMAGE */}
        <Image source={{ uri: item.image }} style={styles.image} />

        {/* TEXT */}
        <View style={styles.textWrapper}>
          <Text style={styles.query}>{item.query}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>

        {/* RIGHT ARROW */}
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Search History</Text>

      {/* History List */}
      <FlatList
        data={searchHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontFamily: font.Bold,
    color: Colors.heading,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: Colors.dark,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  query: {
    fontSize: 16,
    fontFamily: font.Bold,
    color: Colors.heading,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: font.Regular,
    color: Colors.sub_heading,
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: Colors.sub_heading,
    marginLeft: 10,
  },
});

export default HistoryScreen;
