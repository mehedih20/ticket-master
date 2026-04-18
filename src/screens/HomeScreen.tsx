import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Platform,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { TicketmasterEvent } from "../types/eventListType";
import { toggleTheme } from "../redux/features/theme/themeSlice";
import { useGetEventsQuery } from "../redux/features/events/eventsApi";
import SearchBar from "../components/ui/home/SearchBar";
import EventCard from "../components/shared/EventCard";
import { useAppDispatch } from "../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const HomeScreen = ({ navigation }: any) => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const { colorScheme } = useColorScheme();
  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching, refetch } = useGetEventsQuery({
    keyword: debouncedKeyword,
    page,
  });

  const events = data?._embedded?.events || [];
  const totalPages = data?.page?.totalPages || 0;

  const loadMore = () => {
    if (!isFetching && page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = () => {
    setPage(0);
    refetch();
  };

  const renderFooter = () => {
    if (!isFetching) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View className="flex-1 justify-center items-center pt-20">
        <Text className="text-gray-500 dark:text-gray-400 text-lg w-full text-center">
          No events found.
        </Text>
      </View>
    );
  };

  // Simple debounce implementation
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(0); // Reset page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => dispatch(toggleTheme())}
          className="w-[35px] h-[35px] bg-gray-200 dark:bg-yellow-100 mr-4 rounded-full items-center justify-center pl-0.5"
        >
          <Ionicons name="moon" color="black" size={20} />
        </TouchableOpacity>
      ),
    });
  }, [colorScheme]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-blue-50 dark:bg-gray-900"
    >
      <SearchBar
        placeholder="Search by city, artist, or event..."
        value={keyword}
        onSearch={setKeyword}
      />

      {isLoading && page === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item: TicketmasterEvent, index) =>
            `${item.id}-${index}`
          }
          renderItem={({ item }) => <EventCard event={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{
            paddingBottom: 20,
            gap: 12,
            paddingHorizontal: 12,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && page === 0}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
