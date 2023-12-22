import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import Inbox from '../screens/Home/Inbox';
import ProfileSettings from '../screens/Home/ProfileSettings';
import Chat from '../screens/Home/Chat';
import Premium from '../screens/Home/Premium';
import Matches from '../screens/Home/Matches';
import {moderateScale} from '../Theme/Dimensions';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../Theme/Theme';
import MembershipScreen from '../screens/Home/membershipScreen/membershipScreen';
import {useSelector} from 'react-redux';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  const IconRenderItem = ({
    path,
    focused,
    tag,
    width = '100%',
    height = 25,
  }) => {
    const styles = StyleSheet.create({
      textStyle: {
        fontSize: moderateScale(11),
        fontFamily: Theme.fontFamily.Poppins_Medium,
        color: '#A3A3A6',
      },
      imageStyle: {
        resizeMode: 'contain',
        width: '100%',
        height: moderateScale(25),
        marginBottom: 5,
      },
      mainContainer: {
        width: Dimensions.get('window').width / 5,
        height: moderateScale(60),
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    return (
      <View style={styles.mainContainer}>
        <Image
          source={path}
          resizeMode={'contain'}
          style={[
            styles.imageStyle,
            {
              width: width,
              height: height,
            },
          ]}
        />
        {focused === true ? (
          <GradientText style={styles.textStyle}>{tag}</GradientText>
        ) : (
          <Text style={styles.textStyle}>{tag}</Text>
        )}
      </View>
    );
  };

  const GradientText = props => {
    return (
      <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
          colors={[Theme.colors.primary, Theme.colors.primary]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text {...props} style={[props.style, {opacity: 0}]} />
        </LinearGradient>
      </MaskedView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopLeftRadius: moderateScale(15),
          borderTopRightRadius: moderateScale(15),
          position: 'absolute',
          height: moderateScale(60),
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <IconRenderItem
                tag={'Home'}
                focused={focused}
                height={25}
                width={'100%'}
                path={
                  focused
                    ? require('../assets/images/homeS.png')
                    : require('../assets/images/home.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <IconRenderItem
                tag={'Inbox'}
                focused={focused}
                height={20}
                width={'80%'}
                path={
                  focused
                    ? require('../assets/images/inboxS.png')
                    : require('../assets/images/inbox.png')
                }
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Matches"
        component={Matches}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <IconRenderItem
                tag={'Matches'}
                focused={focused}
                path={
                  focused
                    ? require('../assets/images/matchesS.png')
                    : require('../assets/images/matches.png')
                }
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <IconRenderItem
                tag={'Chat'}
                focused={focused}
                path={
                  focused
                    ? require('../assets/images/exploreS.png')
                    : require('../assets/images/explore.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Premium"
        component={MembershipScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <IconRenderItem
                tag={'Go Premium'}
                focused={focused}
                path={
                  focused
                    ? require('../assets/images/premiummS.png')
                    : require('../assets/images/premiumm.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileSettings}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <IconRenderItem
                tag={'Profile'}
                focused={focused}
                path={
                  focused
                    ? require('../assets/images/profileS.png')
                    : require('../assets/images/profile.png')
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
