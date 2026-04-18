import React, { useEffect, useRef } from "react";
import { View, TextInput } from "react-native";

type Props = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
};

const OtpInputField: React.FC<Props> = ({ value, onChange, length = 4 }) => {
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    let newValue = value.split("");
    newValue[index] = text;
    const finalValue = newValue.join("").slice(0, length);

    onChange(finalValue);

    // Move forward
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!value[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste / autofill
  useEffect(() => {
    if (value.length === length) {
      inputs.current[length - 1]?.blur();
    }
  }, [value]);

  return (
    <View className="flex-row justify-center gap-3">
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          value={value[index] || ""}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          className="w-[50px] h-[55px] border border-gray-300 rounded-xl text-lg text-gray-800 bg-white"
          autoFocus={index === 0}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          importantForAutofill="yes"
        />
      ))}
    </View>
  );
};

export default OtpInputField;
