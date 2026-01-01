import { View } from "react-native";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#242424" }}>
      {children}
    </View>
  );
}
