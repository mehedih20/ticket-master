import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React from "react";
import { imdustryImageApi } from "../../../constants/apiUrls";

type TProps = {
  industries: any;
};

const IndustryList = ({ industries }: TProps) => {
  if (industries?.length === 0) {
    return (
      <View className="py-10 justify-center items-center">
        <Text className="text-gray-400">
          <ActivityIndicator size="small" />
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 mt-4">
      <Text className="font-bold text-base dark:text-white">
        Popular Industries
      </Text>

      <FlatList
        data={industries}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View className="bg-white dark:bg-gray-600 flex-row items-start border border-gray-300 dark:border-gray-500 w-[150px] px-3 py-3 h-[75px] rounded-xl flex-1 shadow-md gap-2">
            {/* <Image/> */}
            <Image
              source={{ uri: `${imdustryImageApi}/${item?.image}` }}
              className="w-[35px] h-[35px] bg-blue-100 dark:bg-gray-700 rounded-lg"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text
                lineBreakMode="tail"
                numberOfLines={2}
                className="font-semibold text-sm dark:text-gray-100"
              >
                {item.name}
              </Text>

              <Text className="text-gray-500 dark:text-gray-300 text-xs mt-1">
                {item.jobs_count} Jobs
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default IndustryList;
