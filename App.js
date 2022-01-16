
import React, {useEffect, useState}from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform
} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import SwallNavigator from './navigation/SwallNavigator';
import SplashScreen from  "react-native-splash-screen";
import Purchases from "react-native-purchases";
import DeviceInfo from 'react-native-device-info';
import { ENTITLEMENT_ID, IOS_API_KEY } from './constants';




const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'norwester' : require('./assets/fonts/NorwesterRegular.ttf')
  });
};


export default function App(){

  


  useEffect(()=> {
    Purchases.setDebugLogsEnabled(true);

    if (Platform.OS === 'ios') {
     Purchases.setup(IOS_API_KEY)
     console.log(IOS_API_KEY)
    }
  }, []);


  let deviceId = DeviceInfo.getUniqueId();
  //console.log(deviceId)

  useEffect(() => {
    SplashScreen.hide();
  });
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return <SwallNavigator/>
};
