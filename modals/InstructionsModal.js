
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
  Modal,
  ScrollView
} from 'react-native';
import Colors  from '../constants/Colors';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

let TouchableCmp = TouchableOpacity;

const InstructionsModal = props => {

    const [showInstructionsModal, setInstructionsModal] = useState(true);

  return (
    <Modal animationType={'slide'} transparent={true} visible={showInstructionsModal}>
        <View style={{height: '100%', 
        width: '100%',  
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.LighterBlack, 
        opacity: 0.8,
        position: 'absolute'}}/>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{ height: '70%', width: '90%', borderRadius: 20, backgroundColor: Colors.LighterBlack, shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3,}}>
          <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center',}}>
          <Text style ={{color:  Colors.DarkWhite, textAlign: 'center', fontSize: 40, fontFamily: 'norwester', }}>Instructions</Text>
          </View>
          <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30,}}>
            <ScrollView>
          <Text style ={{color: Colors.DarkWhite, textAlign: 'center', fontSize: 20, fontFamily: 'norwester', marginTop: 5,}}>
            {props.instructionText}
            </Text>
            </ScrollView>
            </View>
            <View style={{flex: 0.2, justifyContent: 'flex-end'}}>
        <TouchableCmp style={{width: '100%', height: '80%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: 'center'}} 
        onPress={() => setInstructionsModal(!showInstructionsModal)}>
          <Text style ={{color: Colors.DarkWhite, textAlign: 'center', fontSize: 30, fontFamily: 'norwester'}}>Start</Text>
          </TouchableCmp>
          </View>
        </View>
        </View>
      </Modal>
  );
};

export default InstructionsModal;

const styles = StyleSheet.create({
   
  });
