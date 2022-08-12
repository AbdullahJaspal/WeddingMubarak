import React, {useState, useRef} from 'react';
import Image from 'react-native-scalable-image';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const ScalableImage = ({source}) => {
  return <Image source={source} width={width} />;
};

export {ScalableImage};
