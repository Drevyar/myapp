import { createClient } from '@supabase/supabase-js';

const url = 'https://nfxolwuuysytxeassvgo.supabase.co';
const key = 'sb_publishable_U6qarGz9JEFUw-jrYD52Xg_iqaqMM1a';
const supabase = createClient(url, key);

async function runDiagnostics() {
  console.log('=== Supabase / GraphQL Integration Diagnostics ===\n');

  // 1. Fetch one row to see active columns and their values
  console.log('--- 1. Fetching a single row from products ---');
  const { data: selectData, error: selectError } = await supabase
    .from('products')
    .select('*')
    .limit(1);

  if (selectError) {
    console.log('SELECT error:', selectError.message);
  } else {
    console.log('SELECT success! Row data:', JSON.stringify(selectData[0], null, 2));
  }

  // 2. Type Probing by deliberately triggering PG errors
  console.log('\n--- 2. Probing Column Types & Constraints ---');

  async function testInsert(label, payload) {
    const { error } = await supabase.from('products').insert(payload);
    if (error) {
      console.log(`❌ ${label}:`);
      console.log(`   Code: ${error.code}`);
      console.log(`   Message: ${error.message}`);
      return error;
    } else {
      console.log(`✅ ${label}: Success`);
      return null;
    }
  }

  // Probing ID type
  await testInsert('ID as integer', { name: 'Test ID', price: 10, id: 1 });
  await testInsert('ID as invalid UUID', { name: 'Test ID', price: 10, id: 'invalid-uuid' });

  // Probing created_at type
  await testInsert('created_at as invalid date', { name: 'Test Date', price: 10, created_at: 'invalid-date' });

  // Probing price constraints
  await testInsert('price as negative value', { name: 'Test Price', price: -5 });
  await testInsert('price as non-numeric', { name: 'Test Price', price: 'not-a-number' });

  // Probing stock type & constraints
  await testInsert('stock as negative value', { name: 'Test Stock', price: 10, stock: -5 });
  await testInsert('stock as decimal', { name: 'Test Stock', price: 10, stock: 1.5 });
  await testInsert('stock as non-numeric', { name: 'Test Stock', price: 10, stock: 'not-a-number' });

  // Probing category type
  await testInsert('category as integer', { name: 'Test Category', price: 10, category: 123 });
  await testInsert('category as text', { name: 'Test Category', price: 10, category: 'Laptops' });

  // Probing location type
  await testInsert('location as non-numeric', { name: 'Test Location', price: 10, location: 'not-a-number' });
  await testInsert('location as decimal', { name: 'Test Location', price: 10, location: 1.5 });

  // Probing status type
  await testInsert('status as invalid value', { name: 'Test Status', price: 10, status: 'Invalid' });

  // 3. Primary Key Constraint Verification
  console.log('\n--- 3. Primary Key Verification ---');
  const testUuid = '00000000-0000-0000-0000-000000000009';
  
  // Clean up any left over test row
  await supabase.from('products').delete().eq('id', testUuid);

  // Insert first row with testUuid
  console.log('Inserting first row with explicit ID...');
  const res1 = await testInsert('First insert with UUID', {
    id: testUuid,
    name: 'PK Test Product 1',
    price: 100,
    stock: 5,
    category: 'Laptops',
    location: 1,
    status: 'Active'
  });

  if (!res1) {
    // Attempt second insert with same testUuid
    console.log('Attempting second insert with the duplicate ID...');
    await testInsert('Second insert with duplicate UUID', {
      id: testUuid,
      name: 'PK Test Product 2',
      price: 200,
      stock: 5,
      category: 'Laptops',
      location: 1,
      status: 'Active'
    });

    // Clean up
    await supabase.from('products').delete().eq('id', testUuid);
    console.log('Cleaned up primary key test rows.');
  }
}

runDiagnostics();
