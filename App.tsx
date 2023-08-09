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
import {PaperProvider} from 'react-native-paper';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <PaperProvider>
        <SafeAreaView style={{flex: 1}}>
          <AppNavigation />
        </SafeAreaView>
      </PaperProvider>
    </RecoilRoot>
  );
}


export default App;
