import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme/colors';

interface ScoreBadgeProps {
  score: number;
  size?: 'small' | 'large';
}

export const getScoreColor = (score: number) => {
  if (score >= 75) return colors.score.excellent;
  if (score >= 50) return colors.score.good;
  if (score >= 25) return colors.score.poor;
  return colors.score.bad;
};

export const getScoreLabel = (score: number) => {
  if (score >= 75) return 'Excellent';
  if (score >= 50) return 'Good';
  if (score >= 25) return 'Poor';
  return 'Bad';
};

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, size = 'small' }) => {
  const color = getScoreColor(score);
  const isLarge = size === 'large';
  
  return (
    <View style={[styles.container, { backgroundColor: color }, isLarge && styles.containerLarge]}>
      <Text style={[styles.scoreText, isLarge && styles.scoreTextLarge]}>
        {score}
      </Text>
      <Text style={styles.scoreMax}>/100</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  containerLarge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  scoreText: {
    color: colors.surface,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  scoreTextLarge: {
    fontSize: typography.sizes.xxl,
  },
  scoreMax: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: typography.sizes.xs,
    marginLeft: 2,
    fontWeight: typography.weights.medium,
  }
});
