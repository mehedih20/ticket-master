import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const BottomTabs = createBottomTabNavigator();

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-white dark:bg-gray-800">
      {/* <BottomTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#2563eb",
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#1f2937" : "white",
            height: 55,
            paddingBottom: 10,
            marginHorizontal: 5,
            marginBottom: insets.bottom,
            shadowColor: "transparent",
            shadowOpacity: 0,
          },
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#1f2937" : "white",
          },
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 11,
          },
        }}
      ></BottomTabs.Navigator> */}
    </View>
  );
};

export default BottomNavigation;
