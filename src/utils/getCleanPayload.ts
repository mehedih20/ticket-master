export const getCleanPayload = (payload: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([_, value]) => value !== null && value !== undefined && value !== "",
    ),
  );
};
