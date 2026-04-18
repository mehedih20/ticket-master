import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Easing,
  withTiming,
  withRepeat,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useColorScheme } from "nativewind";
import Svg, { Path } from "react-native-svg";
import { useAppDispatch } from "../../../redux/hooks";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { toggleTheme } from "../../../redux/features/theme/themeSlice";

const { width } = Dimensions.get("window");

const HeroSection = () => {
  const { colorScheme } = useColorScheme();
  const translateX = useSharedValue(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-width, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // smoother sine-like wave
  const wavePath = `
    M0 30
    C ${width * 0.25} 0, ${width * 0.75} 60, ${width} 30
    C ${width * 1.25} 0, ${width * 1.75} 60, ${width * 2} 30
    V 100 H 0 Z
  `;

  return (
    <View className="bg-blue-500 dark:bg-gray-900 min-h-[290px]">
      <SafeAreaView
        edges={["top"]}
        className="flex-1 pb-20 px-5 relative overflow-hidden"
      >
        <View className="relative pt-16">
          <TouchableOpacity
            onPress={() => dispatch(toggleTheme())}
            className="absolute top-2 right-3 border border-blue-100 dark:border-gray-200 p-1 rounded-xl"
          >
            <Text className="dark:text-yellow-300 text-blue-100">
              <AntDesign name="moon" size={20} />
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white text-3xl font-bold text-center">
          #1 Platform for Saudi Jobs
        </Text>

        <Text className="text-blue-100 text-center mt-2">
          Apply for jobs with verified employers
        </Text>

        <View className="bg-white dark:bg-gray-800 border border-blue-300 dark:border-gray-500 mt-5 flex-row items-center rounded-full overflow-hidden h-11 z-10 gap-2">
          <TextInput
            placeholder="Search Job"
            className="flex-1 px-4 dark:text-white text-gray-700"
            placeholderTextColor={colorScheme === "dark" ? "#d1d5db" : "gray"}
          />
          <TouchableOpacity className="bg-blue-500 dark:bg-gray-700 m-1 w-[40px] h-[30px] rounded-full items-center justify-center">
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Wave wrapper */}
        <View className="absolute bottom-0 left-0 right-0 h-[50px] overflow-hidden">
          {/* First wave */}
          <Animated.View style={[animatedStyle, { position: "absolute" }]}>
            <Svg width={width * 2} height={50}>
              <Path
                d={wavePath}
                fill={colorScheme === "dark" ? "#1f2937" : "#f3f4f6"}
              />
            </Svg>
          </Animated.View>

          {/* Second wave (duplicate for seamless loop) */}
          <Animated.View
            style={[animatedStyle, { position: "absolute", left: width * 2 }]}
          >
            <Svg width={width * 2} height={50}>
              <Path
                d={wavePath}
                fill={colorScheme === "dark" ? "#1f2937" : "#f3f4f6"}
              />
            </Svg>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HeroSection;
