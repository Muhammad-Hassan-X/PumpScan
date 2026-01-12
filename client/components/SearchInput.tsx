import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Colors from "@/constants/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import font from "@/constants/fonts";

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
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
        <SimpleLineIcons name="magnifier" size={20} color={Colors.heading} />
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
  wrapper: {
    flexDirection: "row",

    padding: 10,
    borderRadius: 10,
    color: Colors.sub_heading,
    margin: 10,
    alignItems: "center",
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#333",
    borderTopColor: "#333",
    shadowColor: Colors.dark,
  },
});

export default SearchInput;
