import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type TProps = {
  control: any;
  errors: any;
  name: string;
  label: string;
  keyboardType?: "phone-pad" | "default";
  placeholder: string;
  secure?: boolean;
  rules?: any;
  required?: boolean;
};

const InputField = ({
  control,
  errors,
  name,
  label,
  placeholder,
  keyboardType,
  secure,
  rules,
  required,
}: TProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View className="mb-4">
      <Text className="text-gray-700 dark:text-white mb-1.5">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View className="border border-gray-400 rounded-xl flex-row items-center dark:bg-gray-700 px-3">
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              keyboardType={keyboardType || "default"}
              secureTextEntry={secure && !showPassword}
              className="flex-1 py-3 text-gray-700 dark:text-white"
              placeholderTextColor={
                colorScheme === "dark" ? "#d1d5db" : "#6b7280"
              }
            />

            {secure && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colorScheme === "dark" ? "#d1d5db" : "#6b7280"}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {errors[name] && (
        <Text className="text-red-500 dark:text-red-300 text-xs mt-1">
          {(errors as any)?.[name]?.message}
        </Text>
      )}
    </View>
  );
};

export default InputField;
