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
  Alert,
  Button,
  Modal
} from 'react-native';
import Colors  from '../constants/Colors';

const PlayerScoreBoard = props => {
    let TouchableCmp = TouchableOpacity;
  
    return (
        <View style={{...styles.scoreboardContainer,...{borderColor: props.colorBorder,}}}>
          <Text style={{...styles.nameScoreText}}>{props.name.substring(0,2)}</Text>
          <View style={{backgroundColor: Colors.DarkWhite, height: '50%', width: '50%', borderRadius:100, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -10, right: 0 }}>
          <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', color: Colors.LighterBlack}}>{props.points}</Text>
          </View>
        </View>
    );
  };

  export default PlayerScoreBoard;

    const styles = StyleSheet.create({
    scoreboardContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: Colors.LighterBlack
    },
    nameScoreText: {
    fontFamily: 'norwester',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.DarkWhite
    }
    });