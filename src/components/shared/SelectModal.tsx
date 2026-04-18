import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Option = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  data: Option[];
  visible: boolean;
  onSelect: (value: Option) => void;
  onClose: () => void;
};

const SelectModal = ({ visible, title, data, onSelect, onClose }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white dark:bg-gray-800 rounded-t-2xl py-4 max-h-[60%]">
          <SafeAreaView>
            {/* HEADER */}
            <View className="flex-row justify-between items-center mb-3 px-4">
              <Text className="text-lg dark:text-gray-400 font-bold">
                {title}
              </Text>

              <TouchableOpacity onPress={onClose}>
                <Text className="text-red-500 dark:text-red-300 font-semibold">
                  <AntDesign name="close-circle" size={20} />
                </Text>
              </TouchableOpacity>
            </View>

            {/* LIST */}
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 30,
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onSelect(item)}
                  className="py-3 border-b border-gray-200 dark:border-gray-600"
                >
                  <Text className="text-gray-800 dark:text-white">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

export default SelectModal;
