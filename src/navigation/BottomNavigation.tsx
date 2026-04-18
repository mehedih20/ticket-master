import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-white dark:bg-gray-800">
      <BottomTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#6b7280",
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#1f2937" : "white",
            height: 55,
            paddingBottom: 10,
            marginHorizontal: 5,
            marginBottom: insets.bottom,
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
          },
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#1f2937" : "white",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 11,
          },
        }}
      >
        <BottomTabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            title: "Explore Events",
          }}
        />
        <BottomTabs.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
            title: "Saved Events",
          }}
        />
      </BottomTabs.Navigator>
    </View>
  );
};

export default BottomNavigation;
