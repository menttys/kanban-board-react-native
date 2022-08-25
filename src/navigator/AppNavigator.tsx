import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Home from '@app/screens/home';
import AddCard from '@app/screens/addCard';

export enum AppNavigatorRoutes {
  HOME = 'Home',
  ADD_CARD = 'Add new card',
}

export type AppNavigatorParams = {
  [AppNavigatorRoutes.HOME]: undefined;
  [AppNavigatorRoutes.ADD_CARD]: {
    dispatch: any;
    state: any;
  };
};

export type AppNavigatorNavigationProp = NativeStackNavigationProp<
  AppNavigatorParams,
  AppNavigatorRoutes.HOME
>;

export type AppNavigatorScreenProp = NativeStackScreenProps<
  AppNavigatorParams,
  AppNavigatorRoutes.HOME
>;

const Stack = createNativeStackNavigator<AppNavigatorParams>();

/**
 * @author
 * @function @AppNavigator
 **/

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppNavigatorRoutes.HOME}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AppNavigatorRoutes.HOME} component={Home} />
      <Stack.Screen name={AppNavigatorRoutes.ADD_CARD} component={AddCard} />
    </Stack.Navigator>
  );
};
