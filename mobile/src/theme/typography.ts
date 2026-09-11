import { Platform } from 'react-native';

export const typography = {
  // Use a serif or elegant bold sans-serif for headings.
  headingFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
  bodyFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  
  sizes: {
    hero: 42,
    h1: 32,
    h2: 24,
    h3: 20,
    bodyLarge: 18,
    body: 16,
    small: 14,
  },
  
  lineHeights: {
    heading: 1.2,
    body: 1.5,
  }
};
