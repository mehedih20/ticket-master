export const convertMoney = (amount: number) => {
  const SAR_TO_BDT = 30;

  return Math.round(amount * SAR_TO_BDT);
};
