/**
 * Validates product data before sending to Supabase.
 * @param {Object} data - Product fields to validate.
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateProduct(data) {
  const errors = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Product name is required.');
  }

  const price = Number(data.price);
  if (isNaN(price) || price < 0) {
    errors.push('Price must be a valid number (0 or greater).');
  }

  const stock = Number(data.stock);
  if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
    errors.push('Stock must be a valid whole number (0 or greater).');
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.push('Category is required.');
  }

  return { valid: errors.length === 0, errors };
}
