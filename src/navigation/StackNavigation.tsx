import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./BottomNavigation";
import { useColorScheme } from "nativewind";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1f2937" : "#ffffff",
        },
        headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
        headerTitleStyle: {
          color: colorScheme === "dark" ? "#ffffff" : "#000000",
        },
        headerLargeTitle: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="MainScreen"
        component={BottomNavigation}
        options={{
          headerShown: false,
          title: "Dashboard",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
