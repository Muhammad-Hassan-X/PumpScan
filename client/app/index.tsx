import Loader from "@/components/Loader";
import "./global.css"
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-back_ground_color">
      <Text className="text-xl font-bold text-heading   ">
        Welcome to Nativewind!
      </Text>
      <Text className="bg-red-600 rounded-md">
        hi how are you
      </Text>


      <Loader/>

      
    </View>
  );
}