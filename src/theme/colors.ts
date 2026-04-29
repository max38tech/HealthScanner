export const colors = {
  primary: '#4CAF50', // Leaf Green
  primaryLight: '#81C784',
  primaryDark: '#388E3C',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  score: {
    excellent: '#10B981', // Green
    good: '#84CC16',      // Light Green
    poor: '#F59E0B',      // Orange
    bad: '#EF4444',       // Red
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  }
};
