import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";
import { TicketmasterEvent } from "../types/eventListType";
import { getLeafletHtml } from "../constants/getLeafletHtml";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TicketmasterEventResponse } from "../types/eventDetailsType";
import { toggleFavorite } from "../redux/features/favorites/favoritesSlice";
import { useGetEventDetailsQuery } from "../redux/features/events/eventsApi";

const { width } = Dimensions.get("window");

const EventDetailScreen = ({ navigation, route }: any) => {
  const [isOffline, setIsOffline] = useState(false);
  const { event: initialEvent } = route.params as {
    event: TicketmasterEvent;
  };
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetEventDetailsQuery({
    id: initialEvent.id,
  });

  const event = data as TicketmasterEventResponse | undefined;

  const isFavorite = favorites.some((fav) => fav.id === event?.id);

  const venue = event?._embedded?.venues?.[0];
  const attraction = event?._embedded?.attractions || [];

  const imageUrl = useMemo(() => {
    return (
      event?.images?.find((img) => img.ratio === "16_9")?.url ||
      event?.images?.[0]?.url
    );
  }, [event]);

  const latitude = venue?.location?.latitude
    ? parseFloat(venue.location.latitude)
    : null;

  const longitude = venue?.location?.longitude
    ? parseFloat(venue.location.longitude)
    : null;

  const openTicket = async () => {
    if (!event?.url) return;
    await Linking.openURL(event.url);
  };

  const openMaps = async () => {
    if (!latitude || !longitude) return;

    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    await Linking.openURL(url);
  };

  useEffect(() => {
    navigation.setOptions({
      title: initialEvent?.name || "Event Details",
      headerRight: () => (
        <TouchableOpacity
          className="mr-3"
          onPress={() => dispatch(toggleFavorite(initialEvent))}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#ef4444" : "#111827"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFavorite, initialEvent]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline =
        state.isConnected === false || state.isInternetReachable === false;

      setIsOffline(offline);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading && !data) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        {isOffline && (
          <View className="bg-red-500 px-4 py-2">
            <Text className="text-white text-center font-semibold">
              No Internet Connection
            </Text>
          </View>
        )}

        {/* Cover */}
        <Image
          source={{ uri: imageUrl }}
          style={{
            width,
            height: width * 0.6,
          }}
          resizeMode="cover"
        />

        <View className="p-4">
          {/* Title */}
          <Text className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {event?.name}
          </Text>

          {/* Categories */}
          <View className="flex-row flex-wrap mt-3 mb-5">
            {event?.classifications?.[0]?.segment?.name && (
              <View className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-blue-700 text-xs font-semibold">
                  {event?.classifications[0].segment.name}
                </Text>
              </View>
            )}

            {event?.classifications?.[0]?.genre?.name && (
              <View className="bg-purple-100 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-purple-700 text-xs font-semibold">
                  {event?.classifications[0].genre.name}
                </Text>
              </View>
            )}

            {event?.classifications?.[0]?.subGenre?.name && (
              <View className="bg-green-100 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-green-700 text-xs font-semibold">
                  {event?.classifications[0].subGenre.name}
                </Text>
              </View>
            )}
          </View>

          {/* Date */}
          <View className="flex-row mb-2">
            <Ionicons name="calendar-outline" size={20} color="#2563eb" />
            <View className="ml-3">
              <Text className="font-semibold text-gray-900 dark:text-white">
                {event?.dates?.start?.localDate}
              </Text>
              <Text className="text-gray-500">
                {event?.dates?.start?.localTime}
              </Text>
            </View>
          </View>

          {/* Venue */}
          {venue && (
            <View className="flex-row mb-5">
              <Ionicons name="location-outline" size={20} color="#ef4444" />
              <View className="ml-3 flex-1">
                <Text className="font-semibold text-gray-900 dark:text-white">
                  {venue.name}
                </Text>

                <Text className="text-gray-500">
                  {[
                    venue.address?.line1,
                    venue.city?.name,
                    venue.state?.stateCode,
                    venue.country?.countryCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </View>
            </View>
          )}

          {/* Teams / Artists */}
          {attraction.length > 0 && (
            <View className="mb-5">
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Participants
              </Text>

              {attraction.map((item, index) => (
                <Text
                  key={index}
                  className="text-gray-600 dark:text-gray-300 mb-1"
                >
                  • {item?.name}
                </Text>
              ))}
            </View>
          )}

          {/* Description */}
          {(event?.info || event?.pleaseNote) && (
            <View className="mb-6">
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                About
              </Text>

              {event.info && (
                <Text className="text-gray-600 dark:text-gray-300 leading-6">
                  {event.info}
                </Text>
              )}

              {event.pleaseNote && (
                <View className="mt-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                  <Text className="text-yellow-800 text-sm">
                    {event.pleaseNote}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Ticket Info */}
          {event?.ticketLimit?.info && (
            <View className="mb-5">
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Ticket Limit
              </Text>

              <Text className="text-gray-600 dark:text-gray-300">
                {event.ticketLimit.info}
              </Text>
            </View>
          )}

          {/* Seatmap */}
          {event?.seatmap?.staticUrl && (
            <View className="mb-6">
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Seat Map
              </Text>

              <Image
                source={{
                  uri: event.seatmap.staticUrl,
                }}
                style={{
                  width: "100%",
                  height: 220,
                }}
                resizeMode="contain"
              />
            </View>
          )}

          {/* FREE MAP */}
          {typeof latitude === "number" && typeof longitude === "number" && (
            <View className="mb-8">
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Location
              </Text>

              <View className="h-56 rounded-2xl overflow-hidden">
                <WebView
                  style={{ height: 250, borderRadius: 20 }}
                  source={{
                    html: getLeafletHtml(latitude!, longitude!),
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={openMaps}
                className="bg-gray-100 mt-3 p-3 rounded-xl"
              >
                <Text className="text-center font-semibold">Open in Maps</Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="h-24" />
        </View>
      </ScrollView>

      {/* Buy Ticket Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-600">
        <TouchableOpacity
          onPress={openTicket}
          className="bg-blue-600 dark:bg-blue-700 py-4 rounded-2xl"
        >
          <Text className="text-center text-white font-bold text-base">
            Buy Tickets
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventDetailScreen;
