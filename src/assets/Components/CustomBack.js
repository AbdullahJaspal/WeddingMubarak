import React from 'react';
import {Icon} from '@rneui/base';
import Theme from '../../Theme/Theme';

const Customback = ({onPress, marginBottom = 40}) => {
  return (
    <Icon
      name="leftcircle"
      type="ant-design"
      color={Theme.colors.primary}
      style={{
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom: marginBottom,
      }}
      size={30}
      onPress={onPress}
    />
  );
};

export default Customback;
