-- ============================================================
-- Products table schema for Supabase (PostgreSQL)
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  price      NUMERIC     NOT NULL DEFAULT 0,
  stock      BIGINT      NOT NULL DEFAULT 0,
  category   TEXT        NOT NULL DEFAULT '',
  location   BIGINT      NOT NULL DEFAULT 0,
  status     TEXT        NOT NULL DEFAULT 'Active',
  image      TEXT        DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_status   ON products (status);
CREATE INDEX IF NOT EXISTS idx_products_name     ON products (name);
