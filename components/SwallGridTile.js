import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableNativeFeedback,
    Image, 
    Dimensions,
    Alert
} from 'react-native';
import Colors from '../constants/Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwallGridTile = props => {
    let TouchableCmp = TouchableOpacity;

    return (
        <View style={{...styles.gridItem,...{backgroundColor: Colors.DarkWhite}}}>
        <TouchableCmp style={{flex:1}} onPress={props.onSelect} >
            <View style={styles.container}>
                <View style={{...styles.imageView,...{backgroundColor: props.color}}}>
                    <Image style={styles.imageContainer} source={props.image}/>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {props.title}
                </Text>
                <View style={{...styles.buttonView,...{backgroundColor: props.color}}}>
                <Text style={styles.buttonText}> Play</Text>
                </View>
            </View>
        </TouchableCmp>
        </View>

    );


};

export default SwallGridTile;

const styles = StyleSheet.create({
    gridItem: {
      height: SCREEN_HEIGHT <=736 ? 160 :175,
      width: '45%',
      marginVertical: 25,
      marginHorizontal: 10,
      borderRadius: 30,
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 3,
     
    },
    container: {
      flex: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageView: {
        height: '45%',
        width: '45%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -140,
        shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
    },
    title: {
      fontFamily: 'norwester',
      color: Colors.LighterBlack,
      position: 'absolute',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
      textTransform: 'uppercase'
    },
    imageContainer: {
     flex: 0.7,
     resizeMode: 'contain',
      tintColor: Colors.DarkWhite
    },
    infoContainer: {
      width: 30,
      height: 30,
      alignSelf: 'flex-end',
      backgroundColor: 'transparent',
    },
    buttonView: {
        height: 45,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText: {
        fontFamily: 'norwester',
      color: Colors.LighterBlack,
      position: 'absolute',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
      textTransform: 'uppercase'
    }
  });