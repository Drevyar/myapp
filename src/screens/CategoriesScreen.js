import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';

/** Map category names to Ionicons icon names. */
const CATEGORY_ICONS = {
  Laptops: 'laptop-outline',
  Accessories: 'headset-outline',
  Chargers: 'battery-charging-outline',
};
const DEFAULT_ICON = 'pricetag-outline';

export default function CategoriesScreen() {
  const { products, loading, error } = useProducts();

  const categories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const cat = p.category || 'Uncategorized';
      if (!map[cat]) {
        map[cat] = 0;
      }
      map[cat] += 1;
    });

    return Object.entries(map)
      .map(([name, count]) => ({
        name,
        icon: CATEGORY_ICONS[name] || DEFAULT_ICON,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  if (loading && products.length === 0) {
    return (
      <View style={styles.screen}>
        <Header title="Categories" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.statusText}>Loading categories...</Text>
        </View>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.screen}>
        <Header title="Categories" />
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.textSecondary} />
          <Text style={styles.statusText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Categories" />
      <ScrollView contentContainerStyle={styles.content}>
        {categories.length === 0 ? (
          <View style={styles.centered}>
            <Ionicons name="grid-outline" size={48} color={colors.textSecondary} />
            <Text style={styles.statusText}>No categories yet</Text>
          </View>
        ) : (
          categories.map((cat, index) => (
            <TouchableOpacity key={index} style={styles.card} activeOpacity={0.7}>
              <View style={styles.iconCircle}>
                <Ionicons name={cat.icon} size={26} color={colors.card} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{cat.name}</Text>
                <Text style={styles.cardCount}>
                  {cat.count} {cat.count === 1 ? 'product' : 'products'}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    paddingTop: 60,
  },
  statusText: {
    marginTop: 12,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardCount: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
