import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

const NotificationList = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/alerts");
      if (response.data.success) {
        setAlerts(response.data.data || []);
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setAlerts([]);
      } else {
        console.warn("Failed to fetch alerts:", error?.message);
      }
    } finally {
      setLoading(false);
    }
  };


  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor:
                item.alert_type === "PRICE_UP"
                  ? "#16a34a22"
                  : item.alert_type === "PRICE_DOWN"
                    ? "#dc262622"
                    : "#3b82f622",
            },
          ]}
        >
          <Ionicons
            name={
              item.alert_type === "PRICE_UP"
                ? "trending-up-sharp"
                : item.alert_type === "PRICE_DOWN"
                  ? "trending-down-sharp"
                  : "alert-circle-sharp"
            }
            size={22}
            color={
              item.alert_type === "PRICE_UP"
                ? "#16a34a"
                : item.alert_type === "PRICE_DOWN"
                  ? "#dc2626"
                  : "#3b82f6"
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.title, !item.is_read && { fontFamily: font.Bold }]}
          >
            {item.alert_type.replace("_", " ")}
          </Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.time}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
          {!item.is_read && <View style={styles.dot} />}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.active_color}
        style={{ marginTop: 50 }}
      />
    );
  }

  if (alerts.length === 0) {
    return (
      <Text
        style={{
          color: Colors.sub_heading,
          textAlign: "center",
          marginTop: 50,
          fontFamily: font.Medium,
        }}
      >
        No alerts found.
      </Text>
    );
  }

  return (
    <FlatList
      data={alerts}
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
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
