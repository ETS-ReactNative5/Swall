import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  ImageBackground,
  Image, 
  Dimensions,
  Alert,
  Modal
} from 'react-native';
import Colors  from '../constants/Colors';
import {LinearGradient} from 'expo-linear-gradient'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

let TouchableCmp = TouchableOpacity;

var backText = "Are you sure?\nAll game progess will be lost."
const BackModal = props => {

    return (
        <Modal animationType={'slide'} transparent={true} visible={props.showBack}>
            <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.LighterBlack, opacity: 0.6,position: 'absolute'}}/>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <View style={styles.leavemodalsize}>
              <View style={{flex:0.3, alignItems:'center', justifyContent: 'center'}}>
              <Text style ={{color: Colors.LighterBlack, textAlign: 'center', fontSize: 40, fontFamily: 'norwester', alignSelf: 'center'}}>Leaving?</Text>
              </View>
              <View style={{flex:0.4, alignItems:'center', justifyContent: 'center'}}>
              <Text style ={{color: Colors.LighterBlack, textAlign: 'center', fontSize: 20, fontFamily: 'norwester', alignSelf: 'center', marginHorizontal: 10, opacity: 0.6}}>{backText}</Text>
              </View>
            <View style = {{flex:0.3, flexDirection: 'row', width: '100%', justifyContent: 'flex-end', }}>
            <TouchableCmp style={{ flex: 1,  borderBottomLeftRadius: 20, justifyContent: 'center', alignItems: 'center'}} onPress={props.leave}>
              <Text style ={{color: Colors.LighterBlack, textAlign: 'center', fontSize: 25, fontFamily: 'norwester'}}>Leave</Text>
              </TouchableCmp>
              <TouchableCmp style={{ flex: 1, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: 'center'}} onPress={props.stay}>
              <Text style ={{color: Colors.LighterBlack, textAlign: 'center', fontSize: 25, fontFamily: 'norwester',}}>Stay</Text>
              </TouchableCmp>
            </View>
            </View>
            </View>
          </Modal>
      );

};



export default BackModal;

const styles = StyleSheet.create({

  leavemodalsize:
  {
    height: SCREEN_HEIGHT <=736 ? '40%' : '30%', 
    width: '80%', 
    backgroundColor: 'white', 
    borderRadius: 20, 
    backgroundColor: Colors.DarkWhite,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 3,
  }
   
  });