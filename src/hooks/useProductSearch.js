/**
 * Custom hook that filters a product list by search query.
 * - If query is text, filters by product name (case-insensitive partial match).
 * - If query is numeric, matches products whose price is within 10% of the number.
 */
export default function useProductSearch(products, query) {
  if (!query || query.trim() === '') {
    return products;
  }

  const trimmed = query.trim();
  const asNumber = Number(trimmed);

  if (!isNaN(asNumber) && trimmed !== '') {
    // Numeric query — match products whose price is within 10% of the value
    const tolerance = asNumber * 0.1;
    return products.filter(
      (p) => Math.abs(p.price - asNumber) <= tolerance
    );
  }

  // Text query — case-insensitive partial match on name
  const lower = trimmed.toLowerCase();
  return products.filter((p) =>
    p.name.toLowerCase().includes(lower)
  );
}
