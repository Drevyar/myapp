import { supabase } from '../config/supabase';

const TABLE = 'products';

/**
 * Wraps a Supabase query and normalises the result to { data, error }.
 * Converts Supabase error objects to user-friendly strings.
 */
async function handleQuery(queryPromise) {
  try {
    const { data, error } = await queryPromise;
    if (error) {
      return { data: null, error: friendlyError(error) };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred. Please try again.' };
  }
}

/**
 * Maps Supabase error codes to user-friendly messages.
 */
function friendlyError(error) {
  const code = error?.code;
  const map = {
    '23505': 'A product with this information already exists.',
    '23503': 'Referenced record not found.',
    '23514': 'Invalid data. Please check price and stock values.',
    '42P01': 'Products table not found. Please run the schema SQL.',
    'PGRST116': 'Product not found.',
  };
  return map[code] || error?.message || 'Something went wrong. Please try again.';
}

/** Fetch all products ordered by newest first. */
export async function getProducts() {
  return handleQuery(
    supabase.from(TABLE).select('*').order('id', { ascending: false })
  );
}

/** Fetch a single product by ID. */
export async function getProductById(id) {
  return handleQuery(
    supabase.from(TABLE).select('*').eq('id', id).single()
  );
}

/** Create a new product. Returns the inserted row. */
export async function createProduct(product) {
  return handleQuery(
    supabase.from(TABLE).insert(product).select().single()
  );
}

/** Update an existing product by ID. Returns the updated row. */
export async function updateProduct(id, updates) {
  return handleQuery(
    supabase.from(TABLE).update(updates).eq('id', id).select().single()
  );
}

/** Delete a product by ID. */
export async function deleteProduct(id) {
  return handleQuery(
    supabase.from(TABLE).delete().eq('id', id)
  );
}

/** Search products by name (case-insensitive partial match). */
export async function searchProducts(query) {
  return handleQuery(
    supabase
      .from(TABLE)
      .select('*')
      .ilike('name', `%${query}%`)
      .order('id', { ascending: false })
  );
}
