import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';

export default function AddProductScreen({ navigation }) {
  const { addProduct } = useProducts();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const hasValidImage = imageUrl.trim().length > 0 && !imageLoadFailed;

  const handleImageUrlChange = (text) => {
    setImageUrl(text);
    setImageLoadFailed(false); // reset error state when URL changes
  };

  const handleSave = () => {
    const productData = {
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      location: Number(location),
      status: isActive ? 'Active' : 'Inactive',
      image: imageUrl.trim() || '',
    };

    addProduct(productData);

    Alert.alert('Product Saved', `"${name}" has been added.`, [
      {
        text: 'OK',
        onPress: () => navigation?.goBack(),
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <Header title="Add Product" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Image preview */}
        <Text style={styles.label}>Product Image</Text>
        <View style={styles.imagePreview}>
          {hasValidImage ? (
            <Image
              source={{ uri: imageUrl.trim() }}
              style={styles.previewImage}
              resizeMode="cover"
              onError={() => setImageLoadFailed(true)}
            />
          ) : (
            <Ionicons name="image-outline" size={40} color={colors.textSecondary} />
          )}
        </View>

        {/* Image URL input */}
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={handleImageUrlChange}
          placeholder="https://example.com/image.jpg"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />

        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter product name"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Price (฿)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Stock</Text>
        <TextInput
          style={styles.input}
          value={stock}
          onChangeText={setStock}
          placeholder="Enter stock quantity"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Store Location (number of stores)</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter number of stores"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
        />

        <View style={styles.toggleRow}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              {isActive ? 'Active' : 'Inactive'}
            </Text>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{
                false: colors.border,
                true: colors.primaryLight,
              }}
              thumbColor={isActive ? colors.primary : colors.textSecondary}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Product</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 4,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  saveButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '700',
  },
});