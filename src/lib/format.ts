/**
 * Format numbers with comma separators (e.g. 12000 -> 12,000)
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};
