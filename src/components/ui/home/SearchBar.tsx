import React from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface SearchBarProps extends TextInputProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, ...props }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-row items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl px-4 h-[50px] shadow-lg m-3">
      <Ionicons
        name="search"
        size={20}
        color={isDark ? "#9ca3af" : "#6b7280"}
      />
      <TextInput
        className="flex-1 ml-2 text-base text-gray-900 dark:text-white"
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        onChangeText={onSearch}
        {...props}
      />
    </View>
  );
};

export default SearchBar;
