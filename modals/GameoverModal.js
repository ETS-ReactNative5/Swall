import React from 'react';
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

let TouchableCmp = TouchableOpacity;

const GameoverModal = props => {

    return(
        <Modal animationType={'slide'} transparent={true} visible={props.showGameover}>
        <View style={{height: '100%', 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: Colors.LighterBlack, 
        opacity: 0.8,
        position: 'absolute'}}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <View style={{ height: '30%', width: '90%', backgroundColor: 'white', borderRadius: 20, backgroundColor: Colors.DarkWhite,  shadowColor: 'black', justifyContent: 'center', alignItems: 'center',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3,}}>
          <View style={{flex:0.7, alignItems:'center', justifyContent: 'center'}}>
          <Text style ={{color: Colors.LighterBlack, textAlign: 'center', fontSize: 40, fontFamily: 'norwester', alignSelf: 'center'}}>Game Over!</Text>
          </View>
          <View style = {{flex:0.3, width: '100%', justifyContent:'flex-end',}}>
          <TouchableCmp style={{height:'100%', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,justifyContent: 'center'}} 
          onPress={props.leave}>
          <Text style ={{color: Colors.LighterBlack, textAlign: 'center', fontSize: 30, fontFamily: 'norwester', opacity: 0.8}}>Leave</Text>
          </TouchableCmp>
          </View>
        </View>
        </View>
      </Modal>
      )
};

export default GameoverModal;