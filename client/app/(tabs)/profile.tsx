import Colors from "@/constants/colors";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Mock Data
const portfolio = {
  totalValue: 12540.75,
  profitLoss: {
    today: 2.5,
    week: -1.2,
    month: 5.8,
  },
};

const tokens = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    quantity: 0.25,
    value: 12500,
    profitLoss: 3.5,
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=023",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    quantity: 1.5,
    value: 3600,
    profitLoss: -1.2,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023",
  },
  {
    id: "3",
    name: "Cardano",
    symbol: "ADA",
    quantity: 500,
    value: 750,
    profitLoss: 2.1,
    image: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=023",
  },
];

const screenWidth = Dimensions.get("window").width;

const CryptoPortfolio = () => {
  const renderToken = ({ item }: any) => (
    <View style={styles.tokenCard}>
      {/* Token Icon */}
      <Image source={{ uri: item.image }} style={styles.tokenImage} />

      {/* Token Info */}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.tokenName}>{item.name}</Text>
        <Text style={styles.tokenSymbol}>{item.symbol}</Text>
        <Text style={styles.tokenQuantity}>Qty: {item.quantity}</Text>
      </View>

      {/* Token Value */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.tokenValue}>${item.value.toLocaleString()}</Text>
        <Text
          style={[
            styles.tokenPL,
            { color: item.profitLoss >= 0 ? "#16a34a" : "#dc2626" },
          ]}
        >
          {item.profitLoss >= 0 ? "+" : ""}
          {item.profitLoss}%
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Portfolio Value Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio Value</Text>
        <Text style={styles.totalValue}>
          ${portfolio.totalValue.toLocaleString()}
        </Text>

        <View style={styles.profitLossRow}>
          <View style={styles.profitLossItem}>
            <Text style={styles.profitLossLabel}>Today</Text>
            <Text
              style={[
                styles.profitLossValue,
                {
                  color:
                    portfolio.profitLoss.today >= 0 ? "#16a34a" : "#dc2626",
                },
              ]}
            >
              {portfolio.profitLoss.today >= 0 ? "+" : ""}
              {portfolio.profitLoss.today}%
            </Text>
          </View>
          <View style={styles.profitLossItem}>
            <Text style={styles.profitLossLabel}>This Week</Text>
            <Text
              style={[
                styles.profitLossValue,
                {
                  color: portfolio.profitLoss.week >= 0 ? "#16a34a" : "#dc2626",
                },
              ]}
            >
              {portfolio.profitLoss.week >= 0 ? "+" : ""}
              {portfolio.profitLoss.week}%
            </Text>
          </View>
          <View style={styles.profitLossItem}>
            <Text style={styles.profitLossLabel}>This Month</Text>
            <Text
              style={[
                styles.profitLossValue,
                {
                  color:
                    portfolio.profitLoss.month >= 0 ? "#16a34a" : "#dc2626",
                },
              ]}
            >
              {portfolio.profitLoss.month >= 0 ? "+" : ""}
              {portfolio.profitLoss.month}%
            </Text>
          </View>
        </View>
      </View>

      {/* Performance Over Time Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Over Time</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={{ color: "#aaa" }}>📈 Chart Placeholder</Text>
        </View>
      </View>

      {/* Token List Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Tokens</Text>
        <FlatList
          data={tokens}
          keyExtractor={(item) => item.id}
          renderItem={renderToken}
          scrollEnabled={false} // ScrollView handles scrolling
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Token</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#333" }]}>
          <Text style={styles.buttonText}>Edit Token</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color, // Dark mode background
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
  },
  profitLossRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profitLossItem: {
    alignItems: "center",
  },
  profitLossLabel: {
    fontSize: 12,
    color: "#aaa",
  },
  profitLossValue: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  chartPlaceholder: {
    height: 120,
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  tokenCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  tokenImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  tokenName: {
    color: Colors.heading,
    fontSize: 14,
    fontWeight: "700",
  },
  tokenSymbol: {
    color: Colors.sub_heading,
    fontSize: 11,
    marginTop: 1,
  },
  tokenQuantity: {
    color: Colors.sub_heading,
    fontSize: 12,
    marginTop: 2,
  },
  tokenValue: {
    color: Colors.heading,
    fontSize: 14,
    fontWeight: "700",
  },
  tokenPL: {
    fontSize: 12,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.active_color,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: Colors.heading,
    fontWeight: "700",
  },
});

export default CryptoPortfolio;
