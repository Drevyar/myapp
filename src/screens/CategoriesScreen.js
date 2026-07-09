import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import Header from '../components/Header';

const categories = [
  { name: 'Laptops', icon: 'laptop-outline', count: 6 },
  { name: 'Accessories', icon: 'headset-outline', count: 0 },
  { name: 'Chargers', icon: 'battery-charging-outline', count: 0 },
];

export default function CategoriesScreen() {
  return (
    <View style={styles.screen}>
      <Header title="Categories" />
      <ScrollView contentContainerStyle={styles.content}>
        {categories.map((cat, index) => (
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
