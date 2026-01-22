import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Colors from "@/constants/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import font from "@/constants/fonts";

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  onPress?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder || "Search tokens..."}
          placeholderTextColor={Colors.sub_heading}
        />
        <SimpleLineIcons name="magnifier" size={20} color={Colors.heading} style={styles.icon}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.back_ground_color,

    color: Colors.sub_heading,
    fontFamily: font.Regular,

    flex: 1,
    height: 50,
   
    paddingHorizontal: 10,
  },
  icon: {
    color: Colors.heading,
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: Colors.heading,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    marginRight: 10,
  },
  wrapper: {
    flexDirection: "row",

    padding: 3,
    borderRadius: 10,
    color: Colors.sub_heading,
    // margin: 10,
    alignItems: "center",
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#333",
    borderTopColor: "#333",
    shadowColor: Colors.dark,
  },
});

export default SearchInput;
