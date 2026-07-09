import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function StatusBadge({ status }) {
  const isActive = status === 'Active';

  return (
    <View style={[styles.badge, isActive ? styles.active : styles.inactive]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  active: {
    backgroundColor: colors.primary,
  },
  inactive: {
    backgroundColor: colors.textSecondary,
  },
  text: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '700',
  },
});
