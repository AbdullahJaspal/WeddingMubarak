import React from 'react';
import {View, Text} from 'react-native';
import {Header} from '../../../assets/Components/Header';

const HelpInformation = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header
        title="Help and Information"
        leftOnpress={() => navigation.goBack()}
      />
    </View>
  );
};

export default HelpInformation;
