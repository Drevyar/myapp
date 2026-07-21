import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import StatusBadge from "./StatusBadge";
import formatPrice from "../utils/formatPrice";

export default function ProductCard({ product, onPress }) {
  const [imgError, setImgError] = useState(false);

  const image = product.image || product.image_url || "";

  const status = product.status || product.badge_status || "Active";

  const location =
    product.location_text ||
    `${product.location || product.location_count || 0} ${
      (product.location || product.location_count || 0) === 1
        ? "store"
        : "stores"
    }`;

  const stock =
    product.stock_text || `${product.stock || 0} in stock`;

  const hasImage = image.trim().length > 0 && !imgError;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onPress?.(product)}
    >
      <View style={styles.imagePlaceholder}>
        {hasImage ? (
          <Image
            source={{ uri: image }}
            style={styles.productImage}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <Ionicons
            name="laptop-outline"
            size={32}
            color={colors.textSecondary}
          />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>

        {product.price != null && (
          <Text style={styles.price}>
            {formatPrice(product.price)}
          </Text>
        )}

        <Text style={styles.detail}>
          Stock: {stock}
        </Text>

        <Text style={styles.detail}>
          Category: {product.category}
        </Text>

        <Text style={styles.detail}>
          Location: {location}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <StatusBadge status={status} />

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
    flexDirection: "row",
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryLight,
    marginBottom: 4,
  },
  detail: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 64,
  },
  chevron: {
    marginTop: 8,
  },
});