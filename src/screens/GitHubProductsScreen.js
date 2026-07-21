import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import useProductSearch from '../hooks/useProductSearch';
import { fetchGithubProducts } from '../services/githubProductService';

const MemoizedProductCard = React.memo(ProductCard);

/**
 * Maps a raw GitHub JSON item into the shape expected by ProductCard.
 * Handles both raw GitHub field names and already-mapped fields gracefully.
 */
function mapToProductCard(item) {
  return {
    id: item.id,
    name: item.name,
    price: item.price ?? 0,
    stock: item.stock ?? 0,
    category: item.category,
    location: item.location ?? item.location_count ?? 0,
    status: item.status ?? item.badge_status ?? 'Active',
    image: item.image ?? item.image_url ?? '',
  };
}

export default function GitHubProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const filteredProducts = useProductSearch(products, query);

  const loadProducts = useCallback(async () => {
    try {
      setError(null);
      const githubData = await fetchGithubProducts();
      const mapped = githubData.map(mapToProductCard);
      setProducts(mapped);
    } catch (err) {
      console.log('GitHub Error:', err);
      setError('Failed to load products from GitHub');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    loadProducts();
  }, [loadProducts]);

  const renderItem = useCallback(
    ({ item }) => <MemoizedProductCard product={item} />,
    []
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  // --- Loading state (pixel-perfect match with ProductsScreen) ---
  if (loading && products.length === 0) {
    return (
      <View style={styles.screen}>
        <Header title="Products" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.statusText}>Loading products...</Text>
        </View>
      </View>
    );
  }

  // --- Error state ---
  if (error && products.length === 0) {
    return (
      <View style={styles.screen}>
        <Header title="Products" />
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.textSecondary} />
          <Text style={styles.statusText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- Main content (identical layout to ProductsScreen) ---
  return (
    <View style={styles.screen}>
      <Header title="Products" />

      {/* Search + action row */}
      <SearchBar value={query} onChangeText={setQuery} />

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation?.navigate('Add')}
        >
          <Ionicons name="add" size={18} color={colors.card} />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={16} color={colors.textSecondary} />
          <Text style={styles.filterText}>Filter</Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Product list */}
      <FlatList
        data={filteredProducts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={48}
              color={colors.textSecondary}
            />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  statusText: {
    marginTop: 12,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginHorizontal: 6,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
});