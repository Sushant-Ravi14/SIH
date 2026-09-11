import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = 'primary', 
  style, 
  textStyle,
  ...props 
}) => {
  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primaryText,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.buttonBackground,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return {
          color: colors.primaryText,
        };
      case 'primary':
      default:
        return {
          color: colors.buttonText,
        };
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, getContainerStyle(), style]} 
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[styles.text, getTextStyle(), textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // Minimalist, boxy look characteristic of editorial themes
    borderRadius: 0, 
  },
  text: {
    fontFamily: typography.bodyFamily,
    fontSize: typography.sizes.body,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
