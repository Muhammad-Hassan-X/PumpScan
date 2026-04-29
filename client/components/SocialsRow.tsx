import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

interface SocialsRowProps {
  socials?: {
    twitter?: string | null;
    telegram?: string | null;
    discord?: string | null;
    reddit?: string | null;
    github?: string | null;
  };
  websites?: string[];
}

const SocialsRow = ({ socials, websites }: SocialsRowProps) => {
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (e) {
      console.error("Failed to open link:", e);
    }
  };

  const hasSocials = socials && (socials.twitter || socials.telegram || socials.discord || socials.reddit || socials.github);
  const hasWebsite = websites && websites.length > 0;

  if (!hasSocials && !hasWebsite) {
    return (
      <View style={styles.container}>
        <Text style={styles.noSocials}>No social links found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconsRow}>
        {hasWebsite && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => openLink(websites![0])}
          >
            <Ionicons name="globe-outline" size={16} color="#fff" />
          </TouchableOpacity>
        )}

        {socials?.twitter && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => openLink(socials.twitter!)}
          >
            <Ionicons name="logo-twitter" size={16} color="#1DA1F2" />
          </TouchableOpacity>
        )}

        {socials?.telegram && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => openLink(socials.telegram!)}
          >
            <Ionicons name="paper-plane-sharp" size={16} color="#0088cc" />
          </TouchableOpacity>
        )}

        {socials?.discord && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => openLink(socials.discord!)}
          >
            <Ionicons name="logo-discord" size={16} color="#5865F2" />
          </TouchableOpacity>
        )}

        {socials?.reddit && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => openLink(socials.reddit!)}
          >
            <FontAwesome name="reddit-alien" size={16} color="#ff4500" />
          </TouchableOpacity>
        )}

        {socials?.github && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => openLink(socials.github!)}
          >
            <FontAwesome name="github" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SocialsRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  iconsRow: {
    flexDirection: "row",
    gap: 12,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1c1c1e",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  noSocials: {
    color: "#8e8e93",
    fontSize: 14,
    fontFamily: "Ubuntu-Regular",
  },
});
