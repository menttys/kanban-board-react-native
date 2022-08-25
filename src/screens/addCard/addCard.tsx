import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AppNavigatorNavigationProp } from '@app/navigator/AppNavigator';
import Button from '@app/components/Button';
import Input from '@app/components/Input';
import { TICKET_ACTIONS } from '@app/reducer';

/**
 * @function @AddCard
 **/

export const AddCard = () => {
  const { goBack } = useNavigation<AppNavigatorNavigationProp>();
  const route = useRoute();

  const {
    container,
    form_container,
    button_wrapper,
    header_container,
    header_arrow,
    header_text,
  } = styles;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tag: '',
      card_title: '',
      card_description: '',
      card_link: '',
    },
  });

  const onSubmit = (data: any) => {
    // @ts-ignore
    route.params.dispatch({
      type: TICKET_ACTIONS.ADD,
      payload: {
        tag: data.tag,
        cardTitle: data.card_title,
        cardDescription: data.card_description,
        link: data.card_link,
      },
    });
    goBack();
  };
  const onCancel = () => goBack();

  return (
    <View style={container}>
      <View style={header_container}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={header_arrow}> ← </Text>
        </TouchableOpacity>
        <Text style={header_text}>Add new card...</Text>
      </View>
      <View style={form_container}>
        <Input
          control={control}
          label="Tag"
          name="tag"
          placeholder="Type to add tag"
          error={errors.tag}
        />
        <Input
          control={control}
          label="Card title"
          name="card_title"
          placeholder="Type to add card title"
          error={errors.card_title}
        />
        <Input
          control={control}
          label="Card description"
          name="card_description"
          placeholder="Type to add card description"
          error={errors.card_description}
        />
        <Input
          control={control}
          label="Link"
          name="card_link"
          placeholder="Paste link url"
          error={errors.card_link}
        />
        <View style={button_wrapper}>
          <Button
            onPress={handleSubmit(onSubmit)}
            title="Add new card"
            bg="#007b00"
          />
          <Button
            onPress={handleSubmit(onCancel)}
            title="Cancel"
            bg="#ccd9d8"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fcfdfc', flex: 1 },
  form_container: {
    flex: 1,
    padding: 24,
    alignItems: 'flex-start',
    backgroundColor: '#fcfdfc',
  },
  button_wrapper: {
    width: '100%',
    marginTop: 16,
  },
  header_container: {
    marginBottom: 20,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fcfdfc',
    shadowColor: '#888',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },
  header_arrow: {
    fontSize: 32,
  },
  header_text: {
    fontSize: 20,
  },
});
