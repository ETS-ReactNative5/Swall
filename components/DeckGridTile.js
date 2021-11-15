import React, {useState}from 'react';
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
  Switch
} from 'react-native';
import Colors  from '../constants/Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DeckGridTile = props => {
    let TouchableCmp = TouchableOpacity;
  
    const [toggle, setToggle] = useState(false);
    const [bought, setBought] = useState(true);
   
  
    const openInfo = () => {
      Alert.alert(
        props.title,
        props.description)
    };
  
    if(props.isbought === true ){
    
    return (
      <View style={toggle === true ?{...styles.gridItem,...{backgroundColor: props.gameColor}} :{...styles.gridItem,...{backgroundColor: Colors.DarkWhite}}}>
        <TouchableCmp style={{ flex: 1 }} onPress={props.onPress}>
          <View style={styles.container}>
          <View style={styles.imageView}>
          <Image style={toggle === true ? {...styles.imageContainer,...{tintColor: Colors.DarkWhite}}:{...styles.imageContainer,...{tintColor: props.gameColor}}} source={props.image}/>
          </View>
            <Text style={styles.title} numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={styles.decksizeTitle}>
              {props.decksize} cards
            </Text>
            </View>
        </TouchableCmp>
        <View style={toggle === true ? {...styles.buttonView,...{backgroundColor: props.gameColor}} :styles.buttonView}>
              <Switch
              trackColor={{false: 'gray', true: Colors.DarkWhite}}
               onValueChange={() => setToggle(!toggle) }
               onChange={props.onDeck}
               value={toggle}/>
            </View>
        </View>
    );
  }
  
  else{
    return (
      <View style={toggle === true ?{...styles.gridItem,...{backgroundColor: props.gameColor}} :{...styles.gridItem,...{backgroundColor: Colors.DarkWhite}}}>
        <TouchableCmp style={{ flex: 1 }} onPress={props.onPress}>
          <View style={styles.container}>
          <View style={styles.imageView}>
          <Image style={toggle === true ? {...styles.imageContainer,...{tintColor: Colors.DarkWhite}}:{...styles.imageContainer,...{tintColor: props.gameColor}}} source={props.image}/>
          </View>
            <Text style={styles.title} numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={styles.decksizeTitle}>
              {props.decksize} cards
            </Text>
            </View>
        </TouchableCmp>
        <TouchableCmp style={styles.lockView} onPress={props.onPress}>
              <Image source={require('../images/icons/padlockIcon.png')} style={{height: '60%', width: '40%', resizeMode: 'contain'}}/>
            </TouchableCmp>
        </View>
    );
  }
  };
  
  export default DeckGridTile;

  const styles = StyleSheet.create({
    gridItem: {
      height: 175,
      width: '45%',
      marginVertical: 15,
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
      alignItems: 'center',
    },
    imageView: {
        height: '45%',
        width: '45%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    title: {
      fontFamily: 'norwester',
      color: Colors.LighterBlack,
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 10,
      textTransform: 'uppercase'
    },
    decksizeTitle :{
      fontFamily: 'norwester',
      color: Colors.LighterBlack,
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 12,
      opacity: 0.6,
      marginTop: 5,
      textTransform: 'uppercase'
    },
    imageContainer: {
      flex: 0.9,
      resizeMode: 'contain'
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
        alignItems: 'center',
    },
    lockView: {
      height: 45,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
  },
    buttonText: {
        fontFamily: 'norwester',
      color: Colors.LighterBlack,
      position: 'absolute',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
      textTransform: 'uppercase'
    },

    });
