// src/components/common/Input.tsx
import React from 'react';
import {TextInput, View, Text, StyleSheet, TextInputProps} from 'react-native';
import {FONTS} from '../../constant';
import {useTheme} from '../providers/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  touched,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const isError = error && touched;
  const {theme, isDark, toggleTheme} = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isError && styles.errorInput,
          {
            backgroundColor: 'transparent',
            borderColor: theme.BUTTON_HEADER,
          },
        ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            // leftIcon && styles.inputWithLeftIcon,
            // rightIcon && styles.inputWithRightIcon,
            style,
            {
              color: theme.BUTTON_HEADER,
              fontFamily: 'LotaGrotesque-Regular',
            },
          ]}
          placeholderTextColor={theme.BUTTON_HEADER}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {isError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#484848',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderWidth: 1,

    borderRadius: 10,
    minHeight: 56,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIcon: {
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: '#FF5A5F',
  },
  errorText: {
    color: '#FF5A5F',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
