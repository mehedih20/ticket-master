import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React from "react";
import { companyImageApi } from "../../../constants/apiUrls";

const CompanyList = ({ companies }: any) => {
  if (companies?.length === 0) {
    return (
      <View className="py-10 justify-center items-center">
        <Text className="text-gray-400">
          <ActivityIndicator size="small" />
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 my-1">
      <Text className="font-bold text-base dark:text-white">
        Popular Companies
      </Text>

      <FlatList
        data={companies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View className="bg-white dark:bg-gray-600 flex-row px-3 border border-gray-300 dark:border-gray-500 py-3 rounded-xl shadow-md mr-3 gap-2">
            <Image
              source={{ uri: `${companyImageApi}/${item?.image}` }}
              className="w-[40px] h-[40px] rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300"
              resizeMode="cover"
            />

            <View>
              <Text className="font-medium text-sm dark:text-gray-100">
                {item.name}
              </Text>

              <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                {item.jobs_count} Jobs {""}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CompanyList;
