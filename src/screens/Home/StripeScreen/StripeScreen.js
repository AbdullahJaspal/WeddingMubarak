import React, {useEffect, useState} from 'react';
import {useConfirmPayment, CardField} from '@stripe/stripe-react-native';
import {ScrollView, View, Image, Text} from 'react-native';
import {Header} from '../../../assets/Components/Header';
import {CustomButton} from '../../../assets/Components/CustomButton';
import {
  getKeys,
  like_premiumSuccess,
  premiumSuccess,
} from '../../../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {CustomActivity} from '../../../assets/Components/CustomActivity';
import ShowSnackBar from '../../../assets/Components/ShowSnackBar';
import {CreditCardInput} from 'react-native-credit-card-input-fullpage';
import {HomeHeader} from '../../../assets/Components/HomeHeader';

const StripeScreen = ({navigation, route}) => {
  const {item, pricee, screen} = route.params;
  const {userData} = useSelector(state => state.auth);
  const {confirmPayment, loading} = useConfirmPayment();

  const [publishableKey, setPublishableKey] = useState('');
  const [card, setCard] = useState();
  const [name, setName] = useState('');
  const [activity, setActivity] = useState();
  // const {confirmPayment} = useStripe();
  const dispatch = useDispatch();
  useEffect(() => {
    setActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');

    dispatch(getKeys(formdata, success, error));
  }, []);
  const success = val => {
    setActivity(false);
    setPublishableKey(val.stripe_details.public_key);
  };
  const error = val => {
    setActivity(false);
    console.log(val);
  };

  const fetchPaymentIntentClientSecret = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    let response;
    await fetch(
      `https://api.WeddingMubarik.com/gateway/stripe.php?amount=${pricee}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => (response = result))
      .catch(error => console.log('error', error));
    const clientSecret = await response;
    return clientSecret;
  };

  const handlePayPress = async () => {
    console.log('///////card/////');
    console.log(card);
    // if (!card) {
    //   ShowSnackBar('Enter all fields.', 'red');
    //   return;
    // }
    setActivity(true);
    // Fetch the intent client secret from the backend.
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        card: card,
        billing_details: {
          name: name,
        },
      },
    });
    if (error) {
      setActivity(false);
      console.log('Payment confirmation error', error);
      ShowSnackBar(error.message, 'red');
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
      var formdata = new FormData();
      formdata.append('__api_key__', 'secret key');
      formdata.append('user_uid', userData.uid);
      formdata.append('package_uid', item.package_uid);
      formdata.append('like_package_uid', item.package_uid);
      console.log(formdata);
      screen === 'premium'
        ? dispatch(premiumSuccess(formdata, successSubs, errorSubs))
        : dispatch(like_premiumSuccess(formdata, successSubs, errorSubs));
    }
  };

  const successSubs = val => {
    setActivity(false);
    ShowSnackBar('Payment Successfull', 'green');
    navigation.navigate('BottomTab');
    console.log(val);
  };
  const errorSubs = val => {
    setActivity(false);
    ShowSnackBar('Something went wrong try again', 'green');
    console.log(val);
  };

  return (
    <StripeProvider
      publishableKey={publishableKey}
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <ScrollView>
        <View style={{flex: 1}}>
          <HomeHeader search={false} />

          <Text
            style={{
              fontSize: 25,
              marginLeft: 10,
              fontWeight: 'bold',
              marginVertical: 30,
              color: 'black',
            }}>
            Add a Card
          </Text>
          <Image
            style={{
              width: '80%',
              height: 200,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../../../assets/images/credit.png')}></Image>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
              expiration: 'MM/YY',
            }}
            cardStyle={{
              backgroundColor: 'white',
              textColor: 'black',
              placeholderColor: '#98A1B3',
            }}
            style={{
              width: '95%',
              height: 50,
              marginVertical: 30,
              alignSelf: 'center',
            }}
            onCardChange={cardDetails => {
              console.log('cardDetails', cardDetails);
              setCard(cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
          <View
            style={{
              height: 30,
            }}></View>
          {/* <TextInput
          style={{
            width: '95%',
            alignItems: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
            height: 40,
            color: 'black',
          }}
          value={name}
          placeholder="Name of Card Holder"
          onChangeText={val => {
            setName(val);
          }}
          placeholderTextColor={'#7F7F82'}></TextInput> */}
          {/* <CardForm
          postalCodeEnabled={false}
          onFormComplete={cardDetails => {
            console.log('card details', cardDetails);
            setCard(cardDetails);

            console.log();
          }}
          style={{height: 200}}
          // cardStyle={{
          //   // backgroundColor: '#FFFFFF',
          // }}
          cardStyle={{
            backgroundColor:
              Appearance.getColorScheme() == 'dark' ? '#000000' : '#ffffff',
            textColor: '#000000',
          }}
        /> */}
          {/* <CreditCardInput
          onChange={val => {
            console.log(val);
          }}
        /> */}

          {/* <CreditCardInput
            onChange={val => {
              console.log(val);
              val.valid && setCard(val.values);

              const ll = {
                brand:
                  val.status.number === 'valid'
                    ? val.values.type.replace(
                        /^./,
                        val.values.type[0].toUpperCase(),
                      )
                    : '',
                complete:
                  val.status.number === 'valid' &&
                  val.status.expiry === 'valid' &&
                  val.status.cvc === 'valid'
                    ? true
                    : false,
                expiryMonth: parseInt(val.values.expiry.substring(0, 2)),
                expiryYear: parseInt(val.values.expiry.substring(3, 5)),
                last4: val.values.number.substring(15, 19),
                validCVC: val.status.cvc === 'valid' ? 'Valid' : 'Invalid',
                validExpiryDate:
                  val.status.expiry === 'valid' ? 'Valid' : 'Invalid',
                validNumber:
                  val.status.number === 'valid' ? 'Valid' : 'Invalid',
                cvc: val.values.cvc,
              };
              setName(val.values.name);
              val.status.number === 'valid' &&
              val.status.expiry === 'valid' &&
              val.status.cvc === 'valid'
                ? setCard(ll)
                : setCard(null);
            }}
            autoFocus={true}
            labelStyle={{color: 'black'}}
            requiresName={true}
            requiresPostalCode={true}
          /> */}
          <View style={{height: 30}}></View>
          <CustomButton
            tag={`Confirm Payment ($ ${pricee})`}
            // onPress={handlePayPress}
            disable={loading}
          />
        </View>
      </ScrollView>
      <CustomActivity show={activity} />
    </StripeProvider>
  );
};
export default StripeScreen;
