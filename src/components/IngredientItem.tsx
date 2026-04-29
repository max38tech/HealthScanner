import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react-native';
import { Ingredient } from '../api/scannerService';
import { colors, spacing, typography } from '../theme/colors';

interface IngredientItemProps {
  ingredient: Ingredient;
}

export const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient }) => {
  const getIcon = () => {
    switch (ingredient.safety) {
      case 'warning':
        return <AlertCircle color={colors.error} size={20} />;
      case 'caution':
        return <AlertTriangle color={colors.warning} size={20} />;
      case 'safe':
        return <CheckCircle color={colors.success} size={20} />;
    }
  };

  const getBackgroundColor = () => {
    switch (ingredient.safety) {
      case 'warning':
        return '#FEE2E2'; // light red
      case 'caution':
        return '#FEF3C7'; // light yellow
      case 'safe':
        return '#D1FAE5'; // light green
    }
  };

  return (
    <View style={[styles.container, { borderLeftColor: ingredient.safety === 'warning' ? colors.error : ingredient.safety === 'caution' ? colors.warning : colors.success }]}>
      <View style={[styles.iconContainer, { backgroundColor: getBackgroundColor() }]}>
        {getIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{ingredient.name}</Text>
        {ingredient.description && (
          <Text style={styles.description}>{ingredient.description}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.textLight,
    marginTop: 2,
  }
});
