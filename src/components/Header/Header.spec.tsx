import React from 'react';
import {render} from '@testing-library/react-native';
import Header from '.';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');
describe('Header', () => {
  it('Header - with title and withhBack', () => {
    const {root} = render(
      <NavigationContainer>
        <Header title="Test" withBack={false} />
      </NavigationContainer>,
    );
    expect(root).toBeTruthy();
  });

  it('Header - without title and withBack', () => {
    const {root} = render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>,
    );
    expect(root).toBeTruthy();
  });
});
