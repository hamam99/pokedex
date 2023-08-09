import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

type IHeader = {
  title: string;
  withBack?: boolean;
};
const Header = ({title, withBack = false}: IHeader) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 8,
      }}>
      {withBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" size={18} color="black" />
        </TouchableOpacity>
      )}
      <Text style={{color: 'black'}}>{title}</Text>
    </View>
  );
};

export default Header;
