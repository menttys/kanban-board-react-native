import React from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

type InputComponentType = {
  control: any;
  label: string;
  name: string;
  placeholder: string;
  error: any;
};

export const Input = ({
  control,
  label,
  name,
  placeholder,
  error,
}: InputComponentType) => {
  const { input, label_style } = styles;
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        // @ts-ignore
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={{ ...label_style, color: error ? 'red' : 'black' }}>
              {label}
            </Text>
            <TextInput
              style={input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#9daeb8"
              autoCapitalize="none"
            />
          </>
        )}
        name={name}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label_style: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#f1f5f6',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
