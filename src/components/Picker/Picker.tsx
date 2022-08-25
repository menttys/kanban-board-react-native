import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '@app/components/Icon';

export const PickerComponent = () => {
  const { search_tag_container, search_tag_text, icon_container } = styles;

  return (
    <>
      <View style={search_tag_container}>
        <Text style={search_tag_text}>Tag</Text>
        <View style={icon_container}>
          <Icon name="Chevron" size="sm" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  search_tag_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  icon_container: {
    marginLeft: 4,
    marginTop: 4,
  },
  search_tag_text: {
    fontSize: 18,
  },
});
