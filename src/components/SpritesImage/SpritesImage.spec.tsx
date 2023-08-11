import React from 'react';
import {render} from '@testing-library/react-native';
import SpritesImage from '.';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');
describe('SpritesImage', () => {
  it('SpritesImage - without label and url', () => {
    const MockUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png';
    const MockLabel = 'Back';
    const {root} = render(
      <NavigationContainer>
        <SpritesImage label={MockLabel} url={MockUrl} />
      </NavigationContainer>,
    );
    expect(root).toBeTruthy();
  });
});
