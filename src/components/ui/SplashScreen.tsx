import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Animated } from "react-native";
import { useColorScheme } from "nativewind";

const SplashScreen = () => {
  const { colorScheme } = useColorScheme();
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-800">
      <View className="flex-1 justify-center items-center">
        <Animated.Image
          source={require("../../../assets/logo.png")}
          alt="App Logo"
          style={{
            width: 320,
            height: 250,
            resizeMode: "contain",
            borderRadius: 24,
            transform: [{ scale: scaleAnim }],
          }}
        />
      </View>

      <View className="flex-row justify-center items-center pb-6">
        <Text className="text-center dark:text-white ml-4">Developed by </Text>
        <Text className="text-blue-600 dark:text-blue-300 pr-2">
          Mehedi Hasan{" "}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
