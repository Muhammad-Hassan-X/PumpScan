import Colors from "@/constants/colors";
import { Stack } from "expo-router";

export default function AuthLayout() {


  
  return (

    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: { backgroundColor: Colors.back_ground_color },
        
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
