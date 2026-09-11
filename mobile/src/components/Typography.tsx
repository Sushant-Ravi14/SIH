import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface TypographyProps extends TextProps {
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'bodyLarge' | 'body' | 'small';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  color, 
  align = 'left',
  style, 
  children, 
  ...props 
}) => {
  const isHeading = ['hero', 'h1', 'h2', 'h3'].includes(variant);
  
  return (
    <Text 
      style={[
        {
          fontFamily: isHeading ? typography.headingFamily : typography.bodyFamily,
          fontSize: typography.sizes[variant],
          // @ts-ignore
          lineHeight: typography.sizes[variant] * (isHeading ? typography.lineHeights.heading : typography.lineHeights.body),
          color: color || (isHeading ? colors.primaryText : colors.secondaryText),
          textAlign: align,
          fontWeight: isHeading ? '700' : '400',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
