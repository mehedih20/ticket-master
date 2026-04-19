import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
import NetInfo from "@react-native-community/netinfo";
import { useAppDispatch } from "../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { toast } from "sonner-native";

const HomeScreen = ({ navigation }: any) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { colorScheme } = useColorScheme();
  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching, refetch, isError, error } =
    useGetEventsQuery(
      {
        keyword: debouncedKeyword,
        page,
      },
      { skip: isOffline },
    );

  const events = data?._embedded?.events || [];
  const totalPages = data?.page?.totalPages || 0;

  const loadMore = () => {
    if (!isFetching && page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = () => {
    if (isOffline) {
      toast.error("You are offline. Can't refresh!");
      return;
    }
    setPage(0);
    refetch();
  };

  const onPressRetry = () => {
    if (isOffline) {
      toast.error("Still offline");
      return;
    }
    refetch();
  };

  const getErrorMessage = () => {
    if (!error) return "Something went wrong";

    if ("status" in error) {
      if (error.status === "FETCH_ERROR") {
        return "No internet connection";
      }

      if (error.status === 404) {
        return "No events found";
      }

      if (error.status === 500) {
        return "Server error";
      }
    }

    return "Failed to load events";
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
      // Reset page on new search
      setPage(0);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  // Check internet connection state
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline =
        state.isConnected === false ||
        (state.isInternetReachable != null &&
          state.isInternetReachable === false);
      setIsOffline(offline);
    });

    return () => unsubscribe();
  }, []);

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

  const renderItem = useCallback(
    ({ item }: any) => <EventCard event={item} />,
    [],
  );

  if (isError && page === 0 && !isFetching) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-50 dark:bg-gray-900 px-6">
        <Ionicons name="cloud-offline-outline" size={70} color="gray" />

        <Text className="text-xl font-bold mt-4 text-gray-800 dark:text-white">
          Network Error
        </Text>

        <Text className="text-center mt-2 text-gray-500 dark:text-gray-400">
          {getErrorMessage()}
        </Text>

        <TouchableOpacity
          onPress={onPressRetry}
          className="mt-5 bg-blue-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-blue-50 dark:bg-gray-900"
    >
      {isOffline && (
        <View className="bg-red-500 px-4 py-2">
          <Text className="text-white text-center font-semibold">
            No Internet Connection
          </Text>
        </View>
      )}

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
          renderItem={renderItem}
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
