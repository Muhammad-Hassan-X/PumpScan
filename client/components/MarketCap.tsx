import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import AnimatedCounter from "./Counter";
import cs from "@/styles";
const MarketCap = () => {
  return (
    <>
      <View style={cs.container}>
        <View style={styles.wapper}>
          <View>
            <Text className="text-heading font-ubuntuMedium">
              Total Market Cap{" "}
            </Text>

            <AnimatedCounter
              value={2560000000000}
              duration={2000}
              style={styles.counter}
            />
          </View>

          <View>
            <Text className="text-heading">pi chart</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.tokenText}>Top 10 Tokens</Text>
      </View>
    </>
  );
};

export default MarketCap;

const styles = StyleSheet.create({
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
    flex:1, 
    justifyContent: "space-between",
    alignItems: "center",
  },
});
