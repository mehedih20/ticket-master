import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "../../navigation/StackNavigation";
import { useAppSelector } from "../../redux/hooks";
import { Modal, Text, View } from "react-native";
import SplashScreen from "../ui/SplashScreen";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";

const MainLayout = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 1000);

    const runUpdateFlow = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          setIsUpdating(true);

          await Updates.fetchUpdateAsync();

          // small delay for UX smoothness
          setTimeout(async () => {
            await Updates.reloadAsync();
          }, 1000);
        }
      } catch (e) {
        console.log("Update flow error:", e);
      }
    };

    runUpdateFlow();
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <View className="flex-1">
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      {!isUpdating && (
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      )}

      {/* OTA Updating Modal */}
      <Modal visible={isUpdating} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl items-center">
            <Text className="text-lg font-semibold mb-2">Updating App... </Text>
            <Text className="text-gray-500">Downloading latest updates</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MainLayout;
