import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { toggleFavorite } from "../../redux/features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TicketmasterEvent } from "../../types/eventListType";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type TProps = {
  event: TicketmasterEvent;
};

const { width } = Dimensions.get("window");

const EventCard = ({ event }: TProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((fav) => fav.id === event.id);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(event));
  };

  const handlePress = () => {
    navigation.navigate("EventDetail", { event });
  };

  const imageUrl =
    event.images?.find((img) => img.ratio === "16_9")?.url ||
    event.images?.[0]?.url;

  const venue = event._embedded?.venues?.[0];
  const date = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-300 dark:border-gray-700"
    >
      <View>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: width * 0.5 }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={handleFavoriteToggle}
          className="absolute top-3 right-3 bg-white/80 dark:bg-black/60 p-2 rounded-full"
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#ef4444" : "#6b7280"}
          />
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text
          className="text-lg font-bold text-gray-900 dark:text-white mb-1"
          numberOfLines={2}
        >
          {event.name}
        </Text>

        <View className="flex-row items-center mt-2">
          <Ionicons
            name="calendar-outline"
            size={16}
            color="#6b7280"
            className="mr-1"
          />
          <Text className="text-gray-600 dark:text-gray-400 text-sm ml-1">
            {date} {time && `• ${time}`}
          </Text>
        </View>

        {venue && (
          <View className="flex-row items-center mt-2">
            <Ionicons
              name="location-outline"
              size={16}
              color="#6b7280"
              className="mr-1"
            />
            <Text
              className="text-gray-600 dark:text-gray-400 text-sm ml-1 flex-1"
              numberOfLines={1}
            >
              {venue.name}, {venue.city?.name}
            </Text>
          </View>
        )}

        {event.classifications?.[0]?.segment?.name && (
          <View className="mt-3 bg-blue-100 dark:bg-blue-900/30 self-start px-2 py-1 rounded-md">
            <Text className="text-xs text-blue-700 dark:text-blue-400 font-medium">
              {event.classifications[0].segment.name}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
