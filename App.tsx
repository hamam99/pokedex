/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import {PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <SafeAreaView style={{flex: 1}}>
          <AppNavigation />
        </SafeAreaView>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
