import React from 'react';
import {View, Text} from 'react-native';
import {Header} from '../../../assets/Components/Header';

const FeedBack = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header
        title="Feedback and Review"
        leftOnpress={() => navigation.goBack()}
      />
    </View>
  );
};

export default FeedBack;
