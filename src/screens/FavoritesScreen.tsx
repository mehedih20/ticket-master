import React from "react";
import { View, FlatList, Text } from "react-native";
import { useAppSelector } from "../redux/hooks";
import EventCard from "../components/shared/EventCard";
import { TicketmasterEvent } from "../types/eventListType";

const FavoritesScreen = () => {
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center pt-20 px-6">
      <Text className="text-gray-500 dark:text-gray-400 text-lg text-center font-medium">
        No favorite events yet.
      </Text>
      <Text className="text-gray-400 dark:text-gray-500 text-center mt-2">
        Tap the heart icon on an event to add it to your favorites.
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-blue-50 dark:bg-gray-900">
      <FlatList
        data={favorites}
        keyExtractor={(item: TicketmasterEvent) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: 12,
          paddingHorizontal: 12,
          gap: 12,
        }}
      />
    </View>
  );
};

export default FavoritesScreen;
