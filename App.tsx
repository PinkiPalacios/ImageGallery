/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {ReactNode, useEffect} from 'react';
import {auth} from './src/api/auth';
import {getImages} from './src/api/images';
import {RootNavigator} from './src/navigation';
import {ContextProvider} from './src/store/useStores';
import StoreModel from './src/store';
import {ActivityIndicator} from 'react-native';

const store = StoreModel.create({});

const App: () => ReactNode = () => {
  return (
    <ContextProvider value={store}>
      <RootNavigator />
    </ContextProvider>
  );
};

export default App;
