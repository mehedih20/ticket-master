import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { jobImageApi } from "../../../constants/apiUrls";
import { TJob } from "../../../types/jobType";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { convertMoney } from "../../../utils/convertMoney";
import { formatDate } from "../../../utils/fomatDate";
import { formatMoney } from "../../../utils/formatMoney";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type TProps = {
  job: TJob;
};

type RootStackParamList = {
  JobDetailsScreen: { job: TJob };
};

const JobCard = ({ job }: TProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow-lg border border-gray-300 dark:border-blue-900 mb-3 h-[280px]">
      {/* Title */}
      <Text
        numberOfLines={1}
        className="text-gray-800 dark:text-gray-200 font-semibold text-center mb-2"
      >
        {job?.job_title}
      </Text>

      {/* Company Info */}
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: `${jobImageApi}/${job?.company?.image}` }}
          className="w-[35px] h-[35px] border border-gray-300 dark:border-gray-500 rounded-full"
          resizeMode="contain"
        />

        <Text className="text-gray-700 dark:text-gray-300 mt-1 flex-1">
          {job.company_name || "Company"}
        </Text>
      </View>

      {/* Compensation */}
      <View className="bg-blue-100 dark:bg-blue-500/40 p-2 rounded-md mt-3 mb-2">
        <Text className="text-xs font-semibold mt-2 mb-1 dark:text-white">
          Salary: SAR {formatMoney(job.max_salary)}{" "}
          {job?.min_salary && `- ${formatMoney(job.min_salary)}`} ( ৳
          {formatMoney(convertMoney(job.max_salary))}
          {job?.min_salary &&
            ` - ৳${formatMoney(convertMoney(job.min_salary))}`}{" "}
          approx.)
        </Text>

        {job?.food_amount && (
          <Text className="text-xs font-semibold my-1 dark:text-white">
            Food Allowance: SAR {formatMoney(job.food_amount)} ( ৳
            {formatMoney(convertMoney(job.food_amount))} approx.)
          </Text>
        )}
      </View>

      {/* Types */}
      <View className="flex-row gap-3 my-2">
        <View className="flex-row items-center gap-1 border border-gray-300 dark:border-gray-900 dark:bg-blue-200/30 p-1 rounded-md">
          <Text className="text-blue-700 dark:text-blue-500">
            <FontAwesome5 name="briefcase" />
          </Text>
          <Text className="uppercase text-xs dark:text-gray-100">
            {job?.type} {""}
          </Text>
        </View>

        <View className="flex-row items-center gap-1 border border-gray-300 dark:border-gray-900 dark:bg-blue-200/30 p-1 rounded-md">
          <Text className="text-blue-700 dark:text-blue-500">
            <FontAwesome5 name="globe" />
          </Text>
          <Text className="uppercase text-xs dark:text-gray-100">
            {job?.country.name} {""}
          </Text>
        </View>
      </View>

      <View className="mt-auto">
        {/* Deadline */}
        <View className="flex-row items-center gap-1">
          <Text className="text-red-400">
            <FontAwesome name="clock-o" size={16} />
          </Text>
          <Text className="text-sm text-gray-800 dark:text-white">
            Deadline: {job?.expiry && formatDate(job?.expiry)}
          </Text>
        </View>

        {/* Actions */}
        <View className="flex-row mt-3">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobDetailsScreen", {
                job,
              })
            }
            className="flex-1 border border-blue-500 dark:border-blue-300 px-3 py-2 rounded-md mr-2"
          >
            <Text className="text-blue-500 dark:text-blue-300 text-sm font-semibold text-center">
              View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-blue-500 px-3 py-2 rounded-md">
            <Text className="text-white text-sm text-center font-semibold">
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default JobCard;
