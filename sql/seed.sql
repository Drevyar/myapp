-- ============================================================
-- Seed data for the products table
-- ============================================================

INSERT INTO products (name, price, stock, category, location, status, image) VALUES
  ('MacBook Pro 14"',   62900, 15, 'Laptops',      3, 'Active',   'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=400'),
  ('MacBook Air M2',    42900, 22, 'Laptops',      5, 'Active',   'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=400'),
  ('Dell XPS 15',       48500, 10, 'Laptops',      2, 'Active',   ''),
  ('ThinkPad X1 Carbon', 55900,  8, 'Laptops',     4, 'Active',   ''),
  ('USB-C Hub 7-in-1',   1290, 50, 'Accessories',  6, 'Active',   ''),
  ('Wireless Mouse',      890, 35, 'Accessories',  4, 'Active',   ''),
  ('65W GaN Charger',    1490, 40, 'Chargers',     3, 'Active',   ''),
  ('100W USB-C Cable',    390, 60, 'Chargers',     5, 'Inactive', ''),
  ('HP Spectre x360',   52900,  0, 'Laptops',      1, 'Inactive', ''),
  ('Laptop Stand',       1890, 25, 'Accessories',  3, 'Active',   '');
