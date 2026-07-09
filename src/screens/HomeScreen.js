import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import Header from '../components/Header';
import products from '../data/products';

export default function HomeScreen() {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const activeProducts = products.filter((p) => p.status === 'Active').length;

  const stats = [
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
