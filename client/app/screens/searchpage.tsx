import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import Icon from "@/components/Icons";
import Colors from "@/constants/colors";
import { router, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import font from "@/constants/fonts";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { API_URL } from "@/constants/api";


const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(searchText, 800);
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      searchToken(debouncedSearch.trim());
    } else {
      setResult(null);
      setError("");
    }
  }, [debouncedSearch]);

  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await api.get("/history");
      if (response.data.success) {
        setHistory(response.data.data || []);
      }
    } catch (e: any) {
      if (e?.response?.status === 401) {
        setHistory([]);
      } else {
        console.warn("Failed to fetch history:", e?.message);
      }
    } finally {
      setHistoryLoading(false);
    }
  };

  const searchToken = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/tokens?q=${encodeURIComponent(query)}`);
      
      if (response.data.success && response.data.data) {
        setResult(response.data.data.token);
        // Refresh history after search
        fetchHistory();
      } else {
        setError(response.data.message || "Token not found");
        setResult(null);
      }
    } catch (err: any) {
      console.error("Search Axios Error:", err.message);
      let message = "Failed to fetch token data.";
      if (err.message === "Network Error") {
        message = "Network Error: Could not connect to the server.";
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      }
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={28} color={Colors.heading} />
        </TouchableOpacity>
        <Text style={styles.text}>Search</Text>
      </View>
      <View style={styles.container}>
        <SearchInput onChange={setSearchText} value={searchText} />

        {loading ? (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={Colors.active_color} />
            <Text style={styles.stateText}>Analyzing token...</Text>
          </View>
        ) : error ? (
          <View style={styles.stateContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : result ? (
          <TouchableOpacity
            style={styles.resultCard}
            onPress={() => router.push(`/token/${result.address}`)}
            activeOpacity={0.7}
          >
            <View style={styles.resultRow}>
              <View>
                <Text style={styles.resultName}>
                  {result.name} ({result.symbol})
                </Text>
                <Text style={styles.resultAddress}>
                  {result.address.slice(0, 10)}...{result.address.slice(-10)}
                </Text>
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>Safety</Text>
                <Text
                  style={[
                    styles.scoreValue,
                    {
                      color:
                        result.risk_score >= 80
                          ? "#3BE9DE"
                          : result.risk_score >= 60
                            ? "#8F80F3"
                            : "#FF7F97",
                    },
                  ]}
                >
                  {result.risk_score || 0}%
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.heading} />
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1 }}>
            {searchText.length === 0 && history.length > 0 ? (
               <View style={{ marginTop: 20 }}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  {history.map((item, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={styles.historyItem}
                      onPress={() => {
                        setSearchText(item.token?.address || "");
                        searchToken(item.token?.address || "");
                      }}
                    >
                      <Ionicons name="time-outline" size={20} color={Colors.sub_heading} />
                      <Text style={styles.historyText}>{item.token?.name || "Unknown"} ({item.token?.symbol})</Text>
                      <Ionicons name="chevron-forward" size={18} color={Colors.sub_heading} style={{marginLeft: 'auto'}} />
                    </TouchableOpacity>
                  ))}
               </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Icon name={"Search"} size={350} style={styles.icon} />
                {searchText.length > 0 && (
                  <Text style={styles.stateText}>No results found.</Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};


export default SearchScreen;

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 10,
    gap: 20,
    marginBottom: 20,
  },
  text: {
    color: Colors.heading,
    fontSize: 28,
    fontFamily: font.Bold,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    padding: 10,
  },
  icon: {
    width: "100%",
    marginTop: 50,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  stateContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  stateText: {
    color: Colors.sub_heading,
    fontFamily: font.Medium,
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "#ff4444",
    fontFamily: font.Medium,
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.sub_heading,
  },
  resultName: {
    color: Colors.heading,
    fontSize: 18,
    fontFamily: font.Bold,
  },
  resultAddress: {
    color: Colors.sub_heading,
    fontSize: 12,
    fontFamily: font.Regular,
    marginTop: 5,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  scoreBadge: {
    backgroundColor: "#2c2c2e",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  scoreText: {
    color: Colors.sub_heading,
    fontSize: 10,
    fontFamily: font.Medium,
  },
  scoreValue: {
    fontSize: 14,
    fontFamily: font.Bold,
  },
  sectionTitle: {
    color: Colors.heading,
    fontSize: 18,
    fontFamily: font.Bold,
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2c2c2e",
    gap: 12,
  },
  historyText: {
    color: Colors.sub_heading,
    fontSize: 15,
    fontFamily: font.Medium,
  },
});

