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
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

let TouchableCmp = TouchableOpacity;

const ScoreBoardModal = props => {

    return (
      <Modal animationType={'slide'} transparent={true} visible={props.showScoreBoard}>
          <View style={{height: '100%', 
          width: '100%', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: Colors.primaryColor, 
          opacity: 0.6,
          position: 'absolute'}}/>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <View style={{ height: '60%', width: '90%', backgroundColor: 'white', borderRadius: 20, backgroundColor: 'black',  shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 20,
          elevation: 3,}}>
            <View style={{flex:0.2, alignItems:'center', justifyContent: 'center'}}>
            <Text style ={{color: 'white', textAlign: 'center', fontSize: 40, fontFamily: 'norwester', alignSelf: 'center'}}>Scoreboard</Text>
            </View>
            <View style={{flex:0.6, paddingHorizontal: 10,}}>
          {props.getFlatlist}
          </View>
          <View style = {{flex:0.2, width: '100%', justifyContent: 'flex-end' }}>
          <TouchableCmp style={{ height: '80%', width: '100%',backgroundColor: Colors.primaryColor, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: 'center'}} onPress={props.setScoreBoard}>
            <Text style ={{color: Colors.secondaryColor, textAlign: 'center', fontSize: 30, fontFamily: 'norwester'}}>Close</Text>
            </TouchableCmp>
          </View>
          </View>
          </View>
        </Modal>
    );
  };

  export default ScoreBoardModal;

const styles = StyleSheet.create({
   
  });