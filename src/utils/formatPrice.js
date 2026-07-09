/**
 * Formats a number as Thai Baht currency.
 * e.g. 25000 -> "฿25,000"
 */
export default function formatPrice(price) {
  const num = Number(price);
  if (isNaN(num)) return '฿0';
  return '฿' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}
