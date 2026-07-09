import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import StatusBadge from './StatusBadge';
import formatPrice from '../utils/formatPrice';

export default function ProductCard({ product, onPress }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = product.image && product.image.trim().length > 0 && !imgError;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(product)}
      activeOpacity={0.7}
    >
      {/* Product image or placeholder */}
      <View style={styles.imagePlaceholder}>
        {hasImage ? (
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <Ionicons name="laptop-outline" size={32} color={colors.textSecondary} />
        )}
      </View>

      {/* Product info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.detail}>
          Stock: {product.stock}  •  {product.category}
        </Text>
        <Text style={styles.detail}>
          {product.location} {product.location === 1 ? 'store' : 'stores'}
        </Text>
      </View>

      {/* Right side: badge + chevron */}
      <View style={styles.rightSection}>
        <StatusBadge status={product.status} />
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textSecondary}
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryLight,
    marginBottom: 4,
  },
  detail: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
  },
  chevron: {
    marginTop: 8,
  },
});
