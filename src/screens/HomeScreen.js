import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';

export default function HomeScreen() {
  const { products, loading, error } = useProducts();

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const activeProducts = products.filter((p) => p.status === 'Active').length;

    return [
      {
        label: 'Total Products',
        value: totalProducts,
        icon: 'cube-outline',
        color: colors.primary,
      },
      {
        label: 'Total Stock',
        value: totalStock,
        icon: 'layers-outline',
        color: colors.primaryLight,
      },
      {
        label: 'Active Products',
        value: activeProducts,
        icon: 'checkmark-circle-outline',
        color: colors.primary,
      },
    ];
  }, [products]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Header title="Home" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Header title="Home" />
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.textSecondary} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Home" />
      <ScrollView contentContainerStyle={styles.content}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: stat.color }]}>
              <Ionicons name={stat.icon} size={24} color={colors.card} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardValue}>{stat.value}</Text>
              <Text style={styles.cardLabel}>{stat.label}</Text>
            </View>
          </View>
        ))}
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
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: colors.textSecondary,
  },
  errorText: {
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
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
