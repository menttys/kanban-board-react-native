import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

type ButtonType = {
  onPress: any;
  title: string;
  bg: string;
};

export const Button = ({ onPress, title, bg }: ButtonType) => {
  const { button, button_container, button_title } = styles;
  return (
    <View style={button_container}>
      <TouchableOpacity onPress={onPress}>
        <View style={{ ...button, backgroundColor: bg, width: '100%' }}>
          <Text style={button_title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button_container: {
    width: '100%',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 8,
  },
  button_title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
