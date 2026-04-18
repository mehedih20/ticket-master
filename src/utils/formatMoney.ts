export const formatMoney = (amount: number) => {
  if (!amount && amount !== 0) return "";
  return Number(amount).toLocaleString("en-IN"); // works well for BDT style commas
};
