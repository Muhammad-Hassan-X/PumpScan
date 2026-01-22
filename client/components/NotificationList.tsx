import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { NotificationData } from "@/data/token";

const NotificationList = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      {/* ICON */}
      <View style={styles.iconWrapper}>
        <Ionicons name="notifications-sharp" size={22} color={Colors.heading} />
      </View>

      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, item.unread && { fontFamily: font.Bold }]}>
          {item.title}
        </Text>

        <Text style={styles.message}>{item.message}</Text>
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.right}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread && <View style={styles.dot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={NotificationData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 10 }}
    />
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.back_ground_color,
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: Colors.dark,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    color: Colors.heading,
    fontSize: 15,
    fontFamily: font.Bold,
  },
  message: {
    color: Colors.sub_heading,
    fontSize: 13,
    fontFamily: font.Regular,
    marginTop: 2,
  },
  right: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  time: {
    fontSize: 11,
    color: Colors.sub_heading,
    fontFamily: font.Regular,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3b82f6",
    marginTop: 6,
  },
});

export default NotificationList;
