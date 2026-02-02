import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

interface AddressBadgeProps {
  address: string;
  image: string;
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const AddressBadge: React.FC<AddressBadgeProps> = ({ address, image }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(address);
  };

  return (
    <TouchableOpacity onPress={copyToClipboard}>
      <View style={styles.container}>
        {/* Left Icon */}
        <View style={styles.iconWrapper}>
          <Image
            source={{
              uri: image,
            }}
            style={{ width: 18, height: 18, borderRadius: 9 }}
          />
        </View>

        {/* Address */}
        <Text style={styles.addressText}>{shortenAddress(address)}</Text>

        {/* Copy Button */}
        <Ionicons name="copy-outline" size={16} color="#b5b5b5" />
      </View>
    </TouchableOpacity>
  );
};

export default AddressBadge;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  iconWrapper: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  addressText: {
    color: "#fff",
    fontSize: 13,
    marginRight: 6,
  },
});
