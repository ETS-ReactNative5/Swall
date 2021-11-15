import React, {Component, useEffect, useState, useRef} from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, Alert, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Dimensions} from 'react-native';
import { KINGSCARDS } from '../data/kings-data';
import Swiper from 'react-native-deck-swiper';
import Colors from '../constants/Colors';
import InstructionsModal from '../modals/InstructionsModal';
import BackModal from '../modals/BackModal';
import GameoverModal from '../modals/GameoverModal.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

let TouchableCmp = TouchableOpacity;

const KingsScreen = props => { 

    const nameArray =props.route.params.playersList;

    ///// setting up back modal /////////////
  const [showBackModal, setBackModal] = useState(false);
  const GetBackModal = () => {
    return (
      <BackModal
      showBack = {showBackModal}
      stay ={showBack}
      leave ={leave}/>
    );
  };
  const showBack = () => {setBackModal(!showBackModal)};
  const leave = () => { setBackModal(!showBackModal)
    props.navigation.navigate('GamesScreen')};

  useEffect(() =>{
    props.navigation.setParams({getbackmodal: showBack})
  },[]);
 ////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////// if 1st card is a king then count it //////////////
  useEffect(() =>{
    if(KINGSCARDS[0].title === 'KING'){
      setKingCounter (kingCounter+1);
     }
  },[]);
  ////////////////////////////////////////////////////////////////////////////////////
   ///// Create state to count cards ////////////////////////
  var [cardCounter, setCardCounter] = useState(52);
   ///// Create state to count king cards ////////////////////////
  var [kingCounter, setKingCounter] = useState(0);
   ///// Get player list created in previous screen ////////////////////////
  var playerNames = nameArray.map((item => item.name))
  const [name, setName] = useState(0);
  var player;
  var nextName;
  //// Get the index number of the cards //////////////////////////
  const [index, setIndex] = useState(0);
  const onSwiped = () => {
    setIndex(index + 1) % KINGSCARDS.length;
    
  }
  /////////////////////////////////////////////////////////////////
  ///////// get next name on player list  ///////////////////
  if(nameArray.length !== 0){
    if(name == playerNames.length ){
      setName(0)
    }
    player  = playerNames[name];
    nextName = () => {
      if (name < playerNames.length){
        setName(name+1);
      }
    };
  }
  ///////////////////////////////////////////////////////////////////////////
  ///////// constructor to set the card/king count and change the name when card is swiped /////////
const countCards = (idx) => {
  if(cardCounter >1) {
  setCardCounter(cardCounter -1);
  if(nameArray.length !==0 ){
  nextName();
  }
  if(KINGSCARDS[idx+ 1].title === 'KING'){
   setKingCounter (kingCounter+1);
  }
  if (kingCounter ==3 && KINGSCARDS[idx+1].title === 'KING' ) {
    showGameover();
  }
}};
////////////////////////////////////////////////////////////////////////////
///// Setting up game over modal /////////////////////////////////////////////////////////////////
const [showGameOverModal,setGameOverShowModal] = useState(false);
const showGameover = () => {setGameOverShowModal(!showGameOverModal)};
const gameleave = () => { setGameOverShowModal(!showGameOverModal)
   props.navigation.navigate({
  routeName: 'GamesScreen'
})}

const StartGameOverModal =  () => {
    return(
     <GameoverModal
     showGameover={showGameOverModal}
     leave = {gameleave}
     />
    )
};
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////disable buttons for one seconds //////////////////////
const [buttonDisabled, setButtonDisabled] = useState(false);
  const useSwiper =  useRef(null);
  
  const handleOnSwipedRight = () => {useSwiper.current.swipeRight() 
    setButtonDisabled(true)
    setTimeout(() => {setButtonDisabled(false)}, 1000)}
/////////////////////////////////////////////////////////////////////////////////////////////
////// constructor to create card view ///////////////////
const RenderCardItem = (kingCard) => { 
  return (
    <View style={styles.cardSize}>
      <View style={{flex: 0.15, width: '90%', borderBottomColor: Colors.Gold, borderBottomWidth: 2, borderRadius: 10, alignSelf: 'center',alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.cardtitletext} numberOfLines={2} >{kingCard.title} </Text>
        <View style={{position: 'absolute', right: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.cardnumbertext}> {kingCard.number} </Text>
      </View>
      <View style={{position: 'absolute', left: 10, alignItems:'center', justifyContent: 'center'}}>
      <Image source={kingCard.imageIcon} style={styles.cardimages} />
      </View>
      </View>
      <View style={{flex: 0.15, alignItems: 'center', justifyContent: 'center',}}>
        <Text style={styles.cardsubtitletext} numberOfLines={2}>
          {kingCard.subTitle}
        </Text>
      </View>
      <View style={{flex: 0.7, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10,}}>
        <Text style={styles.cardquestiontext}> {kingCard.description}</Text>
        <View style={{position: 'absolute', bottom: 10, left: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.cardnumbertext}> {kingCard.number} </Text>
        </View>
        <View style={{position: 'absolute', right: 10, bottom: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={kingCard.imageIcon} style={styles.cardimages} />
        </View>
        </View>
    </View>
  );
};
/////////////////////////////////////////////////////////////////////////
    //////// Returns the Kings screen //////////////////////////
    return (
      <View style={styles.screenBack} >
        <InstructionsModal
        instructionText = {"1. To start the game a cup/glass must be placed in the middle of the table.\n\n2. Each player must then take their drink and pour a little bit of their drink into the cup.\n\n3. In turns each player will draw a card and based on which card you get complete what the card says.\n\n4. If you get a King card follow what the card says but beware of the 4th King..."}
        instructionColor={Colors.Gold}
        />
        <StartGameOverModal/>
        <GetBackModal/>
        <View style={styles.screenTopView}>
          <View style={{flex:0.2, justifyContent: 'flex-end'}}>
          <TouchableCmp onPress={() => setBackModal(!showBackModal)} style={{height: '50%', width: '35%', marginLeft: 30}}> 
          <Image style={{tintColor: Colors.LighterBlack, height:'100%', width: '100%', resizeMode: 'contain'}} source={require('../images/icons/backArrow.png')}/>
          </TouchableCmp>
          </View> 
          <View style={{flex:0.6, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text style={{fontFamily: 'norwester', fontSize: 30, textAlign: 'center', color: Colors.LighterBlack}}>
          King's Cup
          </Text>
          </View> 
          <View style={{flex:0.2, alignItems: 'center', justifyContent: 'flex-end'}}></View> 
        </View>
        <View style={styles.swiperContainer}>
        <Swiper
          cards={KINGSCARDS}
          cardIndex={index}
          ref={useSwiper}
          renderCard={kingCard => RenderCardItem(kingCard)}
          onSwiped= {onSwiped}
          onSwipedRight={() => countCards(index)}
          onSwipedLeft={() => countCards(index)}
          stackSize= {5}
          stackScale={10}
          verticalSwipe={false}
          stackSeparation={20}
          disableTopSwipe
          disableBottomSwipe
          backgroundColor= 'transparent'
          animateCardOpacity
        />
        </View>
        <View style={styles.screenBottom}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../images/kingsIcons/backIcons/kingIcon.png')} style={{height: '30%', width: '20%', tintColor: Colors.LighterBlack}}/>
            <Text style={{color: Colors.LighterBlack, fontSize: 30, fontFamily: 'norwester', textAlign: 'center', marginLeft: 5,}}>{kingCounter}</Text>
          </View>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableCmp onPress={() => handleOnSwipedRight()} disabled={buttonDisabled} style = {styles.nextButtonView}>
        <Text style={{fontFamily: 'norwester', textAlign: 'center', fontSize: 30, color: Colors.LighterBlack}}>Next</Text>
      </TouchableCmp>
          </View>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: Colors.LighterBlack, fontSize: 30, fontFamily: 'norwester', textAlign: 'center', marginRight: 5,}}>{cardCounter}</Text>
            <Image source={require('../images/kingsIcons/cardDeckIcon.png')} style={{height: '30%', width: '20%', tintColor: Colors.LighterBlack}}/>
          </View>
        </View>  
      </View>
    );

};

export default KingsScreen;

const styles = StyleSheet.create({
    screenBack: {
      flex: 1,
      backgroundColor: Colors.Gold,
    },
    screenTopView: {
      flex: 0.1, 
      flexDirection: 'row'
    },
    infoButton: {
      height: 25,
      width: 25,
      opacity: 0.6,
      marginRight: 20,
      tintColor: 'white'
    },
    swiperContainer:{
      flex: 0.7
     },
     screenBottom: {
      flex: 0.15, 
      flexDirection: 'row',
      
    },
    cardSize: {
      backgroundColor: Colors.LighterBlack, 
      flex: SCREEN_HEIGHT <=736 ? 0.75 : 0.65, 
      borderRadius: 10, 
      shadowColor: 'black', 
      shadowOpacity: 0.26, 
      shadowOffset: { width: 0, height: 2 }, 
      shadowRadius: 10, 
      elevation: 3
    },
    cardtitletext: {
      fontSize: SCREEN_HEIGHT <=736 ? 30 : 40,
      fontFamily: 'norwester',
      textAlign: 'center', 
       color: Colors.Gold
    },
    cardsubtitletext: {
      fontSize: SCREEN_HEIGHT <=736 ? 25 : 30,
      fontFamily: 'norwester',
      textAlign: 'center', color: Colors.DarkWhite
    },
    cardquestiontext: {
      fontFamily: 'norwester',
      fontSize: SCREEN_HEIGHT <=736 ? 20: 25, 
      textAlign: 'center',
      marginHorizontal: 15,
      color: Colors.DarkWhite, 
    },
    cardimages: {
      height: SCREEN_HEIGHT <=736 ? 30 : 40, 
      width: SCREEN_HEIGHT <=736 ? 30 : 40, 
      tintColor: Colors.Gold
    },
    cardnumbertext: {
      textAlign: 'center',
       fontSize: SCREEN_HEIGHT <=736 ? 30: 36, 
       fontFamily: 'norwester', 
       color: Colors.Gold
    },
    nextButtonView: {
      borderWidth: 5, 
      borderColor: Colors.LighterBlack, 
      width: '100%', height: '70%', 
      borderRadius: 20, 
      alignItems: 'center', 
      justifyContent: 'center', 
      shadowColor: 'black', 
      shadowOpacity: 0.26, 
      shadowOffset: { width: 0, height: 2 }, 
      shadowRadius: 10, 
      elevation: 3
    }
    
  });