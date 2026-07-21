import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import GitHubProductsScreen from '../screens/GitHubProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: { focused: 'home', unfocused: 'home-outline' },
  Products: { focused: 'cube', unfocused: 'cube-outline' },
  Add: { focused: 'add-circle', unfocused: 'add-circle-outline' },
  Categories: { focused: 'grid', unfocused: 'grid-outline' },
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          const icons = TAB_ICONS[route.name];

          return (
            <Ionicons
              name={focused ? icons.focused : icons.unfocused}
              size={size}
              color={focused ? colors.primary : colors.textSecondary}
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Products"
        component={GitHubProductsScreen}
      />

      <Tab.Screen
        name="Add"
        component={AddProductScreen}
        options={{ tabBarLabel: 'Add' }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
      />
    </Tab.Navigator>
  );
}