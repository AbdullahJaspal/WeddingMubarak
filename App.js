import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainNav from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persister} from './src/redux/store';
import {SafeAreaView} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import StripeScreen from './src/screens/Home/StripeScreen/StripeScreen';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <NavigationContainer>
          <StripeProvider
            publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
          >
            <SafeAreaView style={{flex: 1}}>
              <MainNav />
            </SafeAreaView>
          </StripeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
