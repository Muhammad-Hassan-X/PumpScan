import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import NotificationList from "@/components/NotificationList";

const Notification = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={28} color={Colors.heading} />
        </TouchableOpacity>
        {/* CONTENT */}
        <Text style={styles.text}>Notifications</Text>
      </View>
      <NotificationList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    padding: 5,
  },
  backBtn: {
    color: Colors.heading,
  },
  text: {
    color: Colors.heading,
    fontSize: 28,
    fontFamily: font.Bold,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 10,

    gap: 20,
    marginBottom: 20,
  },
});

export default Notification;
