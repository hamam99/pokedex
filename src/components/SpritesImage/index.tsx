import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const SpritesImage = ({url, label}: {url: string; label: string}) => {
  if (!url) {
    return <></>;
  }

  return (
    <View
      style={{
        width: 120,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#6a6a6a',
      }}>
      <FastImage
        style={{width: 100, height: 100}}
        source={{
          uri: url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text
        style={{
          paddingBottom: 2,
        }}>
        {label}
      </Text>
    </View>
  );
};

export default SpritesImage;
