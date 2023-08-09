/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import AppNavigation from './src/navigation/AppNavigation';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigation />
      </SafeAreaView>
    </RecoilRoot>
  );
}


export default App;
