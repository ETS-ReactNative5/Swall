import React, { useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Image,  TouchableOpacity, Dimensions} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import InstructionsModal from '../modals/InstructionsModal'
import Colors from '../constants/Colors';
import BackModal from '../modals/BackModal';
import GameoverModal from '../modals/GameoverModal';
import BuyDecksModal from '../modals/BuyDecksModal';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
let TouchableCmp = TouchableOpacity;
 
const SwallGameScreen = props => {
    const gameId = props.route.params.gameId;

  //////////// adding buy decks modal //////////////////
  const [showBuyModal,setBuyModal] = useState(false);
  const StartBuyDecksModal =  () => {
      return(
       <BuyDecksModal
       showBuy={showBuyModal}
       close={()=>  props.navigation.navigate('DecksScreen',{
        gameId: gameId
    })}
       />
      )
  };

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
    })
  }
 
   useEffect(() =>{
     props.navigation.setParams({getbackmodal: showBack})
   },[])

//// get current deck id /////////////////////////////////////////////////////////////////
  const editionDecks =props.route.params.editionDecks;

  //gets names from previous add players screen /////////////////////////////////////////////////////////////////
  var nameArray = props.route.params.playersList;

  var playerNames = nameArray.map((item => item.name))
  
  // get cards from swall-data decks /////////////////////////////////////////////////////////////////
  
  const [index, setIndex] = React.useState(0);
  var deckLength = editionDecks.length;
  var [cardCounter, setCardCounter] = useState(deckLength);
  const onSwiped = () => { 
    setIndex(index + 1) % editionDecks.length
    if(index+ 1 == editionDecks.length){
      showGameover();
    }
  };

  
  //create an array and sets up a loop for each players turn /////////////////////////////////////////////////////////////////
  const [name, setName] = useState(0);
  var player;
  var nextName;
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


  const [cards, setCards] = useState(0);
  var nextCard;
  const changeName = () => {
    if(nameArray.length !==0 ){
    nextName();
    }
  }
  if(editionDecks.length !== 0){
    if(cards == editionDecks.length ){
     // Alert.alert("Game Over")
    }
    nextCard =() => {
      if(cards < editionDecks.length){
        setCards(cards + 1)
      }
    }
  };

  ///// Setting up player choice on swipe /////////////////////////////////////////////////////////////
  
  
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

  //Render cards /////////////////////////////////////////////////////////////////////////////
  const RenderCardItem = (swallCard) => { 
       return (
        <View style={styles.cardSize}>
          <View style={{flex: 0.15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: '90%', borderBottomColor: Colors.Turqiose, borderBottomWidth: 2}}>
            <Text style={{fontFamily: 'norwester', fontSize: 36, color: Colors.Turqiose, textAlign: 'center',}}>{swallCard.title}</Text>
          </View>
          <View style={{flex: 0.75, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,}}>
          <Text style={styles.cardQuestionText}>{swallCard.question}</Text>
          <Image source={swallCard.image} style={swallCard.title==='POSITIONS' ? {height: '60%', width: '100%', resizeMode: 'contain',tintColor: Colors.Turqiose} : {tintColor: Colors.Turqiose, position: 'absolute', opacity: 0.1, resizeMode:'center',} }/>
          </View>
          <View style={{flex: 0.1}}>
          <Text style={{fontFamily: 'norwester', fontSize: 20, textAlign: 'center', color: Colors.Turqiose}}>#SWALL</Text>
          <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', position: 'absolute', right: 20, color: Colors.DarkWhite, opacity: 0.6}}>{cardCounter}/{deckLength}</Text>
          <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', position: 'absolute', left: 20, color: Colors.DarkWhite, opacity: 0.6}}>{swallCard.deckTitle}</Text>
          </View>
      </View>
       );
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const useSwiper =  useRef(null);

  var [buyCounter, setBuyCounter] = useState(0);

  function fingerSwipe() {
    if(buyCounter==15){
      setBuyModal(!showBuyModal)
    }
    changeName();
    setCardCounter(cardCounter-1);
    setBuyCounter(buyCounter+1);
    nameArray.map((item, key) => {
      if(player == item.name) {
        item.points ++;
      }
    })
  }
  
  const handleOnSwipedRight = () => {
    useSwiper.current.swipeRight() 
    setButtonDisabled(true)
    changeName();
    setCardCounter(cardCounter-1);
    nameArray.map((item, key) => {
      if(player == item.name) {
        item.points ++;
      }
    })
    setTimeout(() => {setButtonDisabled(false)}, 1000)}

  return (
    <View style={styles.screenBack} >
      <StartBuyDecksModal/>
      <InstructionsModal
      instructionText = {"1. Don't forget to tag #swall if posting any pictures when playing the game :) \n\n 2. The current player reads the card and either accepts what the card says or swalls. \n\n Simples...."}
      />
      <GetBackModal/>
      <StartGameOverModal/>
      <View style={{flex: 0.1, flexDirection: 'row'}}>
        <View style={{flex:0.2, justifyContent: 'flex-end'}}>
        <TouchableCmp onPress={() => setBackModal(!showBackModal)} style={{height: '50%', width: '35%', marginLeft: 30}}> 
        <Image style={{tintColor: Colors.LighterBlack, resizeMode: 'contain', width: '100%', height: '100%'}} source={require('../images/icons/backArrow.png')}/>
        </TouchableCmp>
        </View> 
        <View style={{flex:0.6, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={{fontFamily: 'norwester', fontSize: 35, textAlign: 'center', color: Colors.LighterBlack}}>
        Swall
        </Text>
        </View> 
        <View style={{flex:0.2, alignItems: 'center', justifyContent: 'flex-end'}}></View> 
      </View>
      <View style={styles.swiperContainer}>
      <Text style={nameArray.length ==0 ? {opacity: 0}: {fontFamily: 'norwester', fontSize: 25, textAlign: 'center', color: Colors.DarkWhite, marginTop: 20,}}>
         {player}'s turn
        </Text>
      <Swiper
        cards={editionDecks}
        cardIndex={index}
        ref={useSwiper}
        renderCard={swallCard => RenderCardItem(swallCard)}
        onSwiped= {onSwiped}
        onSwipedRight={fingerSwipe}
        onSwipedLeft={fingerSwipe}
        verticalSwipe={false}
        stackSize= {5}
        stackScale={10}
        stackSeparation={25}
        disableTopSwipe
        disableBottomSwipe
        backgroundColor= 'transparent'
        animateCardOpacity
      />
      </View>
      <View style={styles.scoreTitleContainer}>
        <TouchableCmp onPress={() => handleOnSwipedRight()} disabled={buttonDisabled} style={styles.nextButtonView}>
        <Text style={{fontFamily: 'norwester', fontSize: 30, color: Colors.LighterBlack}}>NEXT</Text>
      </TouchableCmp>
      </View>
    </View>
  ); 

};

export default SwallGameScreen;

const styles = StyleSheet.create({
  screenBack: {
    flex: 1,
    backgroundColor: Colors.Turqiose
  },
  swiperContainer:{
    flex: 0.7,
   },
   nameContainer: {
    flex: 0.1,
    alignItems: 'center'
   },
   scoreTitleContainer: {
    flex: 0.15,
    justifyContent: SCREEN_HEIGHT <=736 ? 'flex-end' : 'center',
    alignItems: 'center',
   },
   screenBottom: {
    flex: 0.1,
    marginHorizontal: 10,
  },
  scoreTitle: {
    fontSize: 20,
    fontFamily: 'open-sans',
    color: 'white',
    textDecorationLine: 'underline',
  },
  imageTitle : {
    width: 150,
    height: '100%',
    tintColor: 'white'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
    
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'open-sans-bold' ,
  },
  backShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.26, 
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20, 
    elevation: 3,
  },
  cardSize: {
    backgroundColor: Colors.LighterBlack,  
    flex: SCREEN_HEIGHT <=736 ? 0.75 : 0.7,  
    borderRadius: 10, 
    shadowColor: 'black', 
    shadowOpacity: 0.26, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 10, 
    elevation: 3,
  },
  cardQuestionText:{
    fontFamily: 'norwester', 
    fontSize: SCREEN_HEIGHT <=736 ? 20 : 25, 
    textAlign: 'center', 
    color: Colors.DarkWhite
  },
  nextButtonView: {
    borderWidth:5, 
    borderColor: Colors.LighterBlack, 
    height: '70%', 
    width: '50%', 
    borderRadius: 50,
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26, 
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20, 
    elevation: 3,
  },
});
