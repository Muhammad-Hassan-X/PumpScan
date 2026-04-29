import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * ⭐ Dynamic API URL Resolver
 *
 * Android Emulator : always uses 10.0.2.2 (host loopback via virtual adapter,
 *                    bypasses Windows Firewall — no rule needed for port 8080).
 * iOS Simulator    : localhost
 * Physical Device  : LAN IP extracted from Metro's hostUri (e.g. 192.168.x.x)
 *
 * WHY not use the LAN IP for the emulator?
 * Metro (port 8081) opens its port via Expo's tooling which adds a firewall
 * exception automatically. The backend (port 8080) does NOT get that treatment,
 * so outbound connections from the emulator to 192.168.x.x:8080 are blocked
 * by Windows Firewall. 10.0.2.2 routes through the virtual loopback adapter
 * and is never subject to the host firewall.
 */

const getApiUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const lanHost = debuggerHost?.split(':').shift() || 'localhost';

  if (Platform.OS === 'android') {
    // Always use the Android emulator loopback for the backend server.
    // Change this to `http://${lanHost}:8080/api/v1` ONLY when testing
    // on a physical Android device connected over Wi-Fi.
    return 'http://10.0.2.2:8080/api/v1';
  }

  // iOS simulator / web — localhost works fine here
  return `http://${lanHost}:8080/api/v1`;
};

export const API_URL = getApiUrl();
export const BASE_URL = API_URL.replace('/api/v1', '');

console.log('🚀 [System] API URL configured to:', API_URL);
