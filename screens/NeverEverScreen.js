import React, {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import Colors from '../constants/Colors';
import Swiper from 'react-native-deck-swiper';
import InstructionsModal from '../modals/InstructionsModal';
import BackModal from '../modals/BackModal';
import GameoverModal from '../modals/GameoverModal';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
let TouchableCmp = TouchableOpacity;

   

const NeverEverScreen = props => {

    const gameId = props.route.params.gameId;
    const editionDecks =props.route.params.editionDecks;

  ///// setting up back modal /////////////

  const [showBackModal, setBackModal] = useState(false);
  const GetBackModal = () => {
  
    return (
      <BackModal
      showBack = {showBackModal}
      stay ={showBack}
      leave ={leave}
      
      />
    );
  }

  const showBack = () => {setBackModal(!showBackModal)};
  const leave = () => { setBackModal(!showBackModal)
    props.navigation.navigate('DecksScreen',{
        gameId: gameId
    })}

  useEffect(() =>{
    props.navigation.setParams({getbackmodal: showBack})
  },[])

    ///// Setting up game over modal ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [showGameOverModal,setGameOverShowModal] = useState(false);
    const showGameover = () => {setGameOverShowModal(!showGameOverModal)};
    const gameleave = () => { setGameOverShowModal(!showGameOverModal)
        props.navigation.navigate('GamesScreen')}
  
    const StartGameOverModal =  () => {
        return(
         <GameoverModal
         showGameover={showGameOverModal}
         leave = {gameleave}
         />
        )
    };
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


  //// Get the index number of the cards //////////////////////////
  const [index, setIndex] = useState(0);
  const onSwiped = () => {
    setIndex(index + 1) % editionDecks.length;
    if(index+ 1 == editionDecks.length){
      showGameover();
    }
    setCardCounter(cardCounter-1);
  }

  ////// constructor to create card view ///////////////////
  const RenderCardItem = (neverEverCard) => { 
    return (
      <View style={styles.cardSize}>
        <View style={{flex: 0.2,  width: '90%', borderBottomColor: Colors.Purple, borderBottomWidth: 2, borderRadius: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.cardtitletext} numberOfLines={1} >Never have i ever</Text>
        </View>
        <View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 30,}}>
        <Image source={require('../images/gamesIcons/neverIcon.png')} style={styles.cardImage}/>
          <Text style={styles.cardquestiontext}> {neverEverCard.question}</Text>
          <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', position: 'absolute', right: 20, bottom: 20, color: Colors.DarkWhite, opacity: 0.6}}>{cardCounter}/{deckLength}</Text>
          <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', position: 'absolute', left: 20, bottom: 20, color: Colors.DarkWhite, opacity: 0.6}}>{neverEverCard.deckTitle}</Text>
          </View>

      </View>
    );
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const useSwiper =  useRef(null);

  var deckLength = editionDecks.length;
  var [cardCounter, setCardCounter] = useState(deckLength);
  
  const handleOnSwipedRight = () => {useSwiper.current.swipeRight() 
    setButtonDisabled(true)
    setTimeout(() => {setButtonDisabled(false)}, 1000)
    
  }
 
  
  return(
    <View style={styles.screenBack}>
      <InstructionsModal
      instructionText = {"1. Read out the Never Have I Ever question to the group.\n\n2. If anyone in the group has done what the card says they drink, if not then don't drink.\n\n3. The last standing player wins."}

      />
      <GetBackModal/>
      <StartGameOverModal/>
      <View style={{flex: 0.1, flexDirection: 'row'}}>
        <View style={{flex:0.2, justifyContent: 'flex-end'}}>
        <TouchableCmp onPress={() => setBackModal(!showBackModal)} style={{height: '50%', width: '35%', marginLeft: 30}}> 
        <Image style={{tintColor: Colors.LighterBlack, height:'100%', width: '100%', resizeMode: 'contain'}} source={require('../images/icons/backArrow.png')}/>
        </TouchableCmp>
        </View> 
        <View style={{flex:0.6, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={{fontFamily: 'norwester', fontSize: 30, textAlign: 'center', color: Colors.LighterBlack}}>
        Never Have I Ever
        </Text>
        </View> 
        <View style={{flex:0.2, alignItems: 'center', justifyContent: 'flex-end'}}></View> 
      </View>
     <View style={{flex: 0.7}}>
     <Swiper
        cards={editionDecks}
        cardIndex={index}
        ref={useSwiper}
        renderCard={neverEverCard => RenderCardItem(neverEverCard)}
        onSwiped= {onSwiped}
        stackSize= {5}
        stackScale={10}
        stackSeparation={25}
        disableTopSwipe
        disableBottomSwipe
        verticalSwipe={false}
        backgroundColor= 'transparent'
        animateCardOpacity
      />
     </View>
     <View style={styles.bottomView}>
    <TouchableCmp onPress={() => handleOnSwipedRight()} disabled={buttonDisabled} style = {{borderWidth: 5, borderColor: Colors.LighterBlack, width: '50%', height: '70%', borderRadius: 50, alignItems: 'center', justifyContent: 'center', shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 3}}>
      <Text style={{fontFamily: 'norwester', textAlign: 'center', fontSize: 30, color: Colors.LighterBlack}}>Next</Text>
    </TouchableCmp>
     </View>
    </View>
  )
};



export default NeverEverScreen;

const styles = StyleSheet.create({
  screenBack: {
    flex: 1,
    backgroundColor: Colors.Purple
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  bottomView: {
    flex: 0.15, 
    justifyContent: SCREEN_HEIGHT <=736 ? 'flex-end' : 'center',
    alignItems: 'center'
  },
  cardSize: {
    backgroundColor: Colors.LighterBlack, 
    flex: SCREEN_HEIGHT <=736 ? 0.75 : 0.7, 
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
    color: Colors.Purple
  },

  cardquestiontext: {
    fontFamily: 'norwester',
    fontSize: SCREEN_HEIGHT <=736 ? 25: 30, 
    color: Colors.LighterBlack, 
    textAlign: 'center',
    marginHorizontal: 15
  },
  cardImage: {
    position: 'absolute', 
    height: '100%', 
    width: '100%', 
    resizeMode: 'contain',
    tintColor: Colors.Purple,
  }
  

});
