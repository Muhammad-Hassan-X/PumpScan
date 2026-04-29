import Colors from "@/constants/colors";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import api from "@/lib/api";
import Animated, { FadeInDown } from "react-native-reanimated";

const ProfileScreen = () => {
  const { user, token, logout } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userId = user?.id || "me";
      const response = await api.get(`/profile/${userId}`);
      if (response.data.success) {
        setProfile(response.data.data);
        setNewName(response.data.data.full_name || "");
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleUpdateProfile = async () => {
    if (!newName.trim()) return;
    try {
      setUpdating(true);
      const response = await api.put(`/profile/${user?.id || "me"}`, { 
        full_name: newName.trim() 
      });
      if (response.data.success) {
        setProfile((prev: any) => ({ ...prev, full_name: newName }));
        setIsEditModalVisible(false);
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (err) {
        console.error("Failed to update profile:", err);
        Alert.alert("Error", "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };


  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Account Profile</Text>
          <TouchableOpacity onPress={() => setIsEditModalVisible(true)} style={styles.editBtn}>
            <Ionicons name="create-outline" size={20} color={Colors.active_color} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.active_color}
            style={{ marginTop: 50 }}
          />
        ) : (
          <View style={styles.profileCard}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons
                name="person-sharp"
                size={40}
                color={Colors.sub_heading}
              />
            </View>
            <Text style={styles.userName}>
              {profile?.full_name || "PumpScan User"}
            </Text>
            <Text style={styles.userRole}>{profile?.role || "user"}</Text>

            <View style={styles.statsContainer}>
              <Animated.View entering={FadeInDown.delay(100)} style={styles.statBox}>
                <Text style={styles.statNumber}>{profile?.total_scans || 0}</Text>
                <Text style={styles.statLabel}>Total Scans</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200)} style={styles.statBox}>
                <Text style={styles.statNumber}>{profile?.watchlist_count || 0}</Text>
                <Text style={styles.statLabel}>Watchlist</Text>
              </Animated.View>
            </View>

            <View style={{ marginTop: 20, width: "100%" }}>
              <View style={styles.infoRow}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={Colors.sub_heading}
                />
                <Text style={styles.infoText}>
                  {user?.email || "No email provided"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color={Colors.sub_heading}
                />
                <Text style={styles.infoText}>Account Status: Active</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons name="lock-closed-outline" size={22} color={Colors.heading} />
            <Text style={styles.settingsText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={22} color={Colors.sub_heading} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons name="notifications-outline" size={22} color={Colors.heading} />
            <Text style={styles.settingsText}>Notification Preferences</Text>
            <Ionicons name="chevron-forward" size={22} color={Colors.sub_heading} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons name="help-circle-outline" size={22} color={Colors.heading} />
            <Text style={styles.settingsText}>Support</Text>
            <Ionicons name="chevron-forward" size={22} color={Colors.sub_heading} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#dc2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View entering={FadeInDown} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Display Name</Text>
            <TextInput
              style={styles.modalInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter full name"
              placeholderTextColor="#666"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                style={[styles.modalBtn, styles.cancelBtn]}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdateProfile}
                style={[styles.modalBtn, styles.saveBtn]}
                disabled={updating}
              >
                {updating ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Text style={styles.saveBtnText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    padding: 20,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Ubuntu-Bold",
    color: Colors.heading,
  },
  editBtn: {
    padding: 8,
    backgroundColor: "#1c1c1e",
    borderRadius: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    padding: 25,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 25,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.heading,
    fontFamily: "Ubuntu-Bold",
  },
  userRole: {
    fontSize: 14,
    color: Colors.active_color,
    textTransform: "uppercase",
    fontWeight: "600",
    marginTop: 5,
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontFamily: "Ubuntu-Bold",
    color: Colors.active_color,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.sub_heading,
    fontFamily: "Ubuntu-Regular",
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  infoText: {
    color: Colors.sub_heading,
    fontSize: 15,
    marginLeft: 10,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  settingsText: {
    flex: 1,
    color: Colors.heading,
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#dc262622",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#dc2626aa",
    marginBottom: 20,
  },
  logoutText: {
    color: "#dc2626",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#333",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Ubuntu-Bold",
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: "#2c2c2e",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#444",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  modalBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 80,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#333",
  },
  saveBtn: {
    backgroundColor: Colors.active_color,
  },
  cancelBtnText: {
    color: "#fff",
    fontFamily: "Ubuntu-Medium",
  },
  saveBtnText: {
    color: "#000",
    fontFamily: "Ubuntu-Bold",
  },
});

export default ProfileScreen;
