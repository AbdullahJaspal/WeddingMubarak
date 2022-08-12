import React from 'react';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import {ImageBackground, View, StyleSheet, Dimensions} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');

const CustomActivity = ({show, color}) => {
  return show === true ? (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.backBlurr,
          {
            backgroundColor: color ? Theme.colors.reverseGradient[0] : 'white',
          },
        ]}
      />
      <View style={styles.subContainer}>
        <View style={styles.rowContainer}>
          <BarIndicator
            color={color ? color : Theme.colors.reverseGradient[0]}
            size={(width / 100) * 20}
          />
          <View>
            <Animatable.Text
              animation={'shake'}
              iterationCount={1}
              style={{
                color: color ? color : Theme.colors.reverseGradient[0],
                fontFamily: Theme.fontFamily.Poppins_BoldItalic,
                fontSize: (width / 100) * 5,
              }}>
              Processing...
            </Animatable.Text>
            <Animatable.Text
              animation={'flash'}
              iterationCount="infinite"
              style={{
                color: color ? color : Theme.colors.reverseGradient[0],
                fontFamily: Theme.fontFamily.Poppins_MediumItalic,
                fontSize: (width / 100) * 4,
                textAlign: 'center',
              }}>
              Please wait...
            </Animatable.Text>
          </View>
          <BarIndicator
            color={color ? color : Theme.colors.reverseGradient[0]}
            size={(width / 100) * 20}
          />
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backBlurr: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {CustomActivity};
