import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// import {initialState, reducer} from '@app/reducer';
import { AppNavigator } from '@app/navigator/AppNavigator';

const App = () => {
  // const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfdfc' }}>
      <StatusBar
        animated={true}
        barStyle="light-content"
        showHideTransition="fade"
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
