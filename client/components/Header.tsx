import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import {router} from 'expo-router';
export default function Header() {
  const name = "hassan";
  return (
    <View className="" style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/icons/avatar.png")}
          style={{ height: 50, width: 50, borderRadius: 30 }}
        />

        <Text className=" font-bold font-ubuntuBold" style={styles.text}>
          {name}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        {/* Notification Icon */}
        <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push('screens/notification')}>
          <Ionicons name="notifications-outline" style={styles.icon} />

          {/* Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>

        {/* Search Icon */}
        <TouchableOpacity style={styles.iconWrapper}  onPress={() => router.push('screens/searchpage')}>
          <Ionicons name="search-outline" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.back_ground_color,
  },
  text: {
    color: Colors.heading,
    padding: 10,
    fontSize: 25,
  },
  icon: {
    color: Colors.heading,
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: Colors.heading,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },

  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrapper: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "red",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
