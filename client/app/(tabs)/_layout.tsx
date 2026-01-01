import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { StatusBar } from "expo-status-bar";

const Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false, 
          tabBarStyle: {
            backgroundColor: "#242424",
            position: "absolute",
            bottom: 40,
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            height: 63,
            marginHorizontal: 120,
            paddingHorizontal: 10,
            paddingVertical: 8,
            paddingBottom: 8,
            borderRadius: 40,
            borderWidth: 1,
            borderTopWidth: 1,
            borderColor: "#333",
            borderTopColor: "#333",
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#999",
          tabBarActiveTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View
                 style={{
                  width: 40, // <= perfect size for your screenshot
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop:20,
                  backgroundColor: focused ? "#6444fe" : "transparent",
                }}
              >
                <SimpleLineIcons name="pie-chart" size={20} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  width: 40, // <= perfect size for your screenshot
                  height: 40,
                  marginTop:20,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "#6444fe" : "transparent",
                }}
              >
                <Ionicons name="alarm-outline" size={25} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  width: 40, // <= perfect size for your screenshot
                  height: 40,
                  marginTop:20,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "#6444fe" : "transparent",
                }}
              >
                <FontAwesome name="user-o" size={20} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
};

export default Layout;
