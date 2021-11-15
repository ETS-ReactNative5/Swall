import React, {useState, useRef, useEffect} from 'react';
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
    Animated,
    Easing
  } from 'react-native';
  import Colors  from '../constants/Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

let TouchableCmp = TouchableOpacity;

const BuyDecksModal = props => {

    const buyAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
        Animated.timing(buyAnimation, {
            duration: 1000,
            toValue: 3,
            ease: Easing.bounce,
            useNativeDriver: true
          })
        ).start();
      });

      return(
        <Modal animationType={'slide'} transparent={true} visible={props.showBuy}>
        <View style={{height: '100%', 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: Colors.LighterBlack, 
        position: 'absolute'}}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <TouchableCmp onPress={props.close} style={styles.xView}>
        <Image style={{tintColor: Colors.DarkWhite, height: '100%', width: '100%', resizeMode: 'contain'}} source={require('../images/icons/cancelIcon.png')} />
        </TouchableCmp>
        <Image source={require('../images/icons/SwallLogo.png')} style={styles.logoSize}/>
        <Text style={styles.description}>Unlock All Decks For Only £2.99!  {'\n'}  This Includes:</Text>
        <View style={styles.gameContainers}>
        <View style={styles.gameImageContainer}>
        <Image source={require('../images/gamesIcons/swallIcon.png')} style={{...styles.gameImageSize,...{ tintColor: Colors.Turqiose}}}/>
        </View>
        <View style={styles.gameTitleContainer}>
        <Text style={{...styles.titleText,...{color: Colors.Turqiose}}}>Swall</Text>
        <Text style={styles.subtitleText}> + 2 Decks, 440 Cards</Text>
        </View>
        </View>
        <View style={styles.gameContainers}>
        <View style={styles.gameImageContainer}>
        <Image source={require('../images/gamesIcons/neverIcon.png')} style={{...styles.gameImageSize,...{ tintColor: Colors.Purple}}}/>
        </View>
        <View style={styles.gameTitleContainer}>
        <Text style={{...styles.titleText,...{color: Colors.Purple}}}>Never Have I Ever</Text>
        <Text style={styles.subtitleText}>+ 5 Decks, 440 Cards</Text>
        </View>
        </View>
        <View style={styles.gameContainers}>
        <View style={styles.gameImageContainer}>
        <Image source={require('../images/gamesIcons/fiveSecondsIcon.png')} style={{...styles.gameImageSize,...{ tintColor: Colors.Red}}}/>
        </View>
        <View style={styles.gameTitleContainer}>
        <Text style={{...styles.titleText,...{color: Colors.Red}}}>5 Seconds</Text>
        <Text style={styles.subtitleText}>+ 4 Decks, 320 Cards</Text>
        </View>
        </View>
        <View style={styles.gameContainers}>
        <View style={styles.gameImageContainer}>
        <Image source={require('../images/gamesIcons/mostLikelyIcon.png')} style={{...styles.gameImageSize,...{ tintColor: Colors.Lime}}}/>
        </View>
        <View style={styles.gameTitleContainer}>
        <Text style={{...styles.titleText,...{color: Colors.Lime}}}>Most Likely To</Text>
        <Text style={styles.subtitleText}> + 3 Decks, 175 Cards</Text>
        </View>
        </View>
        <Animated.View style={{...styles.buyButton,...{transform: [{translateY: buyAnimation.interpolate({inputRange:[0, .5, 1, 1.5, 2, 2.5, 3], outputRange:[0, -15, 0, 15, 0, -15, 0]})}]}}}>
        <TouchableCmp style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.buyTextView}>
            <Text style={styles.buyTextTitle}>Buy Now</Text>
            <Text style={styles.buySubtextTitle}>Additional 14 decks for £2.99!</Text>
        </View>
        <View style={styles.buyImageView}>
            <Image style={styles.buyImage} source={require('../images/icons/cartIcon.png')}/>
        </View>
        </TouchableCmp>
        </Animated.View>
        </View>
      </Modal>
      )

};

export default BuyDecksModal;

const styles = StyleSheet.create({
    logoSize: {
        height: SCREEN_HEIGHT <=736 ? 125 :150,
        width:  SCREEN_HEIGHT <=736 ? 125 :150,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: -50
    },
    gameContainers: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT <=736 ? 50 : 70,
    width: '60%',
    },
    xView: {
        position: 'absolute', 
        right: 50, 
        top: SCREEN_HEIGHT <=736 ?  50 :100,
        height: 25, 
        width: 25,
       
    },
    description:{
        fontSize:  20, 
        fontFamily: 'norwester',
        textAlign: 'center',
        color: Colors.DarkWhite,
        marginHorizontal: 30,
        marginBottom: 10,
    },
    gameImageContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameTitleContainer: {
    flex: 0.7,
    justifyContent: 'center',
    },
    gameImageSize: {
        height: '70%',
        width: '70%',
        resizeMode: 'contain'
    },
    titleText:{
        fontFamily: 'norwester',
        fontSize: 20,
    },
    subtitleText:{
        fontFamily: 'norwester',
        fontSize: 15,
        color: Colors.DarkWhite,
        marginTop: 5
    },
    buyButton: {
        height: SCREEN_HEIGHT <=736 ? 80 :100,
        width: '70%',
        borderRadius: 20,
        backgroundColor: Colors.Turqiose,
        position: 'absolute',
        bottom:SCREEN_HEIGHT <=736 ? 50 : 100 || SCREEN_HEIGHT >736 ? 80 : 100,
        flexDirection: 'row'
    },
    buyTextView:{
        flex: 0.7,
        justifyContent: 'center',
        padding: 10,
    },
    buyImageView: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyTextTitle: {
        fontFamily: 'norwester',
        fontSize: SCREEN_HEIGHT <=736 ? 30 : 35,
        color: Colors.DarkWhite,
    },
    buySubtextTitle: {
        fontFamily: 'norwester',
        fontSize: SCREEN_HEIGHT <=736 ? 15 : 15,
        color: Colors.DarkWhite,
    },
    buyImage:{
        resizeMode: 'contain',
        height: '60%',
        width: '60%',
        tintColor: Colors.DarkWhite
    }
      });