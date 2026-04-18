import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import JobCard from "../job/JobCard";

const JobList = ({ title, jobs }: any) => {
  const renderItem = React.useCallback(
    ({ item }: any) => (
      <View className="w-[290px] mr-3">
        <JobCard job={item} />
      </View>
    ),
    [],
  );

  if (jobs?.length === 0) {
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
      <Text className="font-bold mb-3 text-base dark:text-white">{title}</Text>

      <FlatList
        data={jobs}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderItem}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default React.memo(JobList);
