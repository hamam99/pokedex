import {View, Text} from 'react-native';
import React from 'react';

const Name = ({name}: {name: string}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {name}
      </Text>
    </View>
  );
};

export default React.memo(Name);
