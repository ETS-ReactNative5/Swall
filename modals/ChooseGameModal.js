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
    Modal,
    ScrollView
  } from 'react-native';
  import Colors  from '../constants/Colors';

  let TouchableCmp = TouchableOpacity;

  const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ChooseGameModal = props => {

    return (
        <Modal animationType={'slide'} transparent={true} visible={props.modalShow}>
             <View style={styles.modalBackground}/>
        <View style={styles.modalBackView}>
        <View style={styles.modalGameView}>
          <TouchableCmp onPress={props.settingModal}>
        <Text style= {{...styles.modalXText,...{color: props.modalColor}}}>X</Text>
        </TouchableCmp>
        <View style={{...styles.modalImageContainer,...{backgroundColor: props.modalColor}}}>
            <Image style={styles.modalImage} source={props.modalImage}/>
        </View>
        <Text style={{...styles.modalTitleText,...{color: props.modalColor}}}>
            {props.modalTitle}</Text>
            <ScrollView>
        <Text style={styles.modalDescriptionText}>
            {props.modalDescription}</Text>
            </ScrollView>
        <View style = {{...styles.modalButtonView,...{backgroundColor: props.modalColor}}}>
        <TouchableCmp onPress={props.openModal}>
          <Text style ={styles.modalButtonText}>PLAY</Text>
          </TouchableCmp>
        </View>
        </View>
        </View>
        </Modal>
    );

};

export default ChooseGameModal;

const styles = StyleSheet.create({
    modalBackground: {
        height: '100%', 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: Colors.LighterBlack, 
        opacity: 0.6,
        position: 'absolute'
    },
    modalBackView: {
        flex: 1, 
        justifyContent:'center', 
        alignItems: 'center'
    },
    modalGameView:  {
        height: SCREEN_HEIGHT <=736 ? '70%' :'60%', 
        width: '80%', 
        backgroundColor: Colors.DarkWhite, 
        borderRadius: 20, 
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3,
     
    },
    modalXText: {
        fontSize: 35, 
        fontFamily: 'norwester', 
        position: 'absolute',  
        left: 15, 
        top: 15
    },
    modalImageContainer: {
        height: '30%', 
        width: '50%',  
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop:-75, 
        alignSelf: 'center', 
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3,
      
    },
    modalImage:{
        flex: 0.8,
        width: '80%',
        resizeMode: 'contain',
        tintColor: Colors.DarkWhite
    },
   
    modalDescriptionText: {
        fontFamily: 'norwester', 
        fontSize: SCREEN_HEIGHT <=736 ? 20 : 20, 
        color: Colors.LighterBlack, 
        textAlign: 'center', 
        justifyContent: 'center', 
        marginHorizontal: 20,  
        marginTop: 10,
    },
    modalButtonView: {
        height: 70, 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute', 
        bottom: 0, 
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20 
    },
    modalButtonText: {
        color: Colors.LighterBlack, 
        textAlign: 'center', 
        fontSize: 25, 
        fontFamily: 'norwester'
    },
    modalTitleText: {
        fontFamily: 'norwester', 
        fontSize: SCREEN_HEIGHT <=736 ? 35 : 50, 
        textAlign: 'center', 
        marginTop: 30,
        marginHorizontal: 5
    }
  });

