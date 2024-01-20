import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';
import store from './redux/store';

EStyleSheet.build({});

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
