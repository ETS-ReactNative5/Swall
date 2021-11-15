import React , { useState, useRef, useEffect }  from 'react';
import {
FlatList,
StyleSheet,
TouchableNativeFeedback,
TouchableOpacity,
View,
Text,
Image,
Alert,
Modal,
LogBox,
Animated,
Dimensions
} from 'react-native';
import Colors from '../constants/Colors'
import { BARCARDS, SWALLDECKS, PARTYCARDS} from '../data/swall-data'
import DeckGridTile from '../components/DeckGridTile';
import ChooseDeckModal from '../modals/ChooseDeckModal';
import { PARTYSTARTERCARDS, PARTYSTARTERTWOCARDS, AROUNDTHEWORLDCARDS, SPORTSDAYCARDS, DIRTYMINDEDCARDS, HEROCARDS, FIVEDECKS } from '../data/fiveSeconds-data';
import {MOSTLIKELYDECKS, PREPARTYCARDS, DIRTBIRDCARDS, WHATISLOVECARDS, WILDFREECARDS, STEAMINGCARDS } from '../data/mostLikely-data';
import { NEVEREVERDECKS, ICEBREAKERCARDS, WILDONECARDS, NESTEAMINGCARDS, BOYSCARDS, GIRLSCARDS, DIRTYDEEDSCARDS, COUPLESTHERAPYCARDS } from '../data/neverEver-data';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

let TouchableCmp = TouchableOpacity;

const DecksScreen = props =>  {
  //// get current game id /////////////////////////////////////////////////////////////////
  const gameId = props.route.params.gameId;
  
//const [gameDecks, setGameDecks] =useState('');
var gameDecks;
var gameColor;

//////////// creating slide in animation ///////////////////////////////////////////////
const buttonsSlideAnim = useRef(new Animated.Value(0)).current;

const slideIn = (fdIn) => {
  Animated.timing(fdIn, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true
  }).start();
};

const slideOut = (fdOut) => {
  Animated.timing(fdOut, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true
  }).start();
};

///////// navigate to next screen //////////////

function nextScreen(){
    if(gameId === 'g1'|| gameId === 'g2'|| gameId === 'g3' || gameId === 'g5'){
        props.navigation.navigate('AddPlayersScreen', {
            gameId: gameId,
            deckId: chosenDecks
        });
    } 
  }
// check what the current editionId is and display those cards
if (gameId === 'g1'){
    gameDecks = SWALLDECKS;
    gameColor = Colors.Turqiose
    }
    if (gameId === 'g2'){
      gameDecks = NEVEREVERDECKS;
      gameColor = Colors.Purple
      }
    if (gameId === 'g3'){
      gameDecks = FIVEDECKS;
      gameColor = Colors.Red
      }
    if (gameId === 'g5'){
      gameDecks = MOSTLIKELYDECKS;
      gameColor = Colors.Lime
      }

      const [chosenDecks, setChosenDecks] = useState([]);
    const [chosenDeckSize, setChosenDeckSize] = useState(0);

    const [showDeckModal, setShowDeckModal] = useState(false);
  const [modalTitle, setModalTitle] =useState('');
  const [modalDescription, setModalDescription] =useState('');
  const [modalImage, setModalImage] =useState('');
  const [modalQuestions, setModalQuestions] =useState('');
  const [modalId, setModalId] =useState('');
  const [modalDeckSize, setModalDeckSize] =useState('');

  //////// create button slide in ///////////
  useEffect(() => {
    if(chosenDecks.length === 0){
      slideOut(buttonsSlideAnim)
    }
    else {
      slideIn(buttonsSlideAnim)
    }
  });

  /////////// check if user has paid for decks  ////////////////
  const [toggle, setToggle] = useState(false);
  function checkBought(itemid){
    if(itemid === 'ned3' || itemid === 'ned4' || itemid === 'ned5' || itemid === 'ned6' || itemid === 'ned7' || 
      itemid === 'fsd3' || itemid === 'fsd4' || itemid === 'fsd5' || itemid === 'fsd6' ||
      itemid === 'mld3' || itemid === 'mld4' || itemid === 'mld5'){
        return false
    }
    else {
      return true;
    }
  };

  function getEgQuestions (dId) {
    if(dId === 'ed1')
    {
      setModalQuestions(PARTYCARDS.slice(0,3))
    }
    if(dId === 'ed2')
    {
      setModalQuestions(BARCARDS.slice(0,3))
    }
    if(dId === 'ned1')
    {
      setModalQuestions(ICEBREAKERCARDS.slice(0,3))
    }
    if(dId === 'ned2')
    {
      setModalQuestions(WILDONECARDS.slice(0,3))
    }
    if(dId === 'ned3')
    {
      setModalQuestions(NESTEAMINGCARDS.slice(0,3))
    }
    if(dId === 'ned4')
    {
      setModalQuestions(BOYSCARDS.slice(0,3))
    }
    if(dId === 'ned5')
    {
      setModalQuestions(GIRLSCARDS.slice(0,3))
    }
    if(dId === 'ned6')
    {
      setModalQuestions(DIRTYDEEDSCARDS.slice(0,3))
    }
    if(dId === 'ned7')
    {
      setModalQuestions(COUPLESTHERAPYCARDS.slice(0,3))
    }
    if(dId === 'fsd1')
    {
      setModalQuestions(PARTYSTARTERCARDS.slice(0,3))
    }
    if(dId === 'fsd2')
    {
      setModalQuestions(PARTYSTARTERTWOCARDS.slice(0,3))
    } 
    if(dId === 'fsd3')
    {
      setModalQuestions(SPORTSDAYCARDS.slice(0,3))
    }
    if(dId === 'fsd4')
    {
      setModalQuestions(AROUNDTHEWORLDCARDS.slice(0,3))
    }
    if(dId === 'fsd5')
    {
      setModalQuestions(DIRTYMINDEDCARDS.slice(0,3))
    }
    if(dId === 'fsd6')
    {
      setModalQuestions(HEROCARDS.slice(0,3))
    }
    if(dId === 'mld1')
    {
      setModalQuestions(PREPARTYCARDS.slice(0,3))
    }
    if(dId === 'mld2')
    {
      setModalQuestions(WILDFREECARDS.slice(0,3))
    }
    if(dId === 'mld3')
    {
      setModalQuestions(STEAMINGCARDS.slice(0,3))
    }
    if(dId === 'mld4')
    {
      setModalQuestions(WHATISLOVECARDS.slice(0,3))
    }
    if(dId === 'mld5')
    {
      setModalQuestions(DIRTBIRDCARDS.slice(0,3))
    }
  }

  const renderGridItem = itemData => {
    return (
      <DeckGridTile
        title={itemData.item.title}
        image={itemData.item.image}
        gameColor = {gameColor}
        isbought ={checkBought(itemData.item.id)}
        onPress={() => {
          setShowDeckModal(!showDeckModal)
          setModalImage(itemData.item.image)
          setModalDescription(itemData.item.description)
          setModalTitle(itemData.item.title)
          getEgQuestions(itemData.item.id);
          setModalId(itemData.item.id);
          setModalDeckSize(itemData.item.size);
        }}
        switchValue ={toggle}
        decksize = {itemData.item.size}
        description = {itemData.item.description}
        onDeck={() => {
          if(chosenDecks.includes(itemData.item.id)){
            setChosenDecks(chosenDecks.filter(item => item !== itemData.item.id))
            setChosenDeckSize(chosenDeckSize- parseInt(itemData.item.size))
          }
          else {
            setChosenDecks(chosenDecks.concat(itemData.item.id))
            setChosenDeckSize(chosenDeckSize+ parseInt(itemData.item.size))
          }
       }}   
      />
    );
  };

  const StartDeckModal =() =>{
    return(
      <ChooseDeckModal
      modalShow = {showDeckModal}
      settingModal ={() => setShowDeckModal(!showDeckModal)}
      modalColor={gameColor}
      modalTitle={modalTitle}
      modalImage={modalImage}
      modalDescription = {modalDescription}
      questions ={modalQuestions}
      decklength={modalDeckSize}
      isbought={checkBought(modalId)}
      />
    );
  }

  return (
    <View style={styles.backScreen}>
        <StartDeckModal/>
        <View style={{flex: 0.1, flexDirection: 'row'}}>
        <View style={{flex:0.3, justifyContent: 'flex-end'}}>
        <TouchableCmp onPress={() => props.navigation.goBack()} style={{height: '50%', width: '20%', marginLeft: 30,}}> 
        <Image style={{tintColor: Colors.DarkWhite, height:'100%', width: '100%', resizeMode: 'contain'}} source={require('../images/icons/backArrow.png')}/>
        </TouchableCmp>
        </View> 
        <View style={{flex:0.4, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={{fontFamily: 'norwester', color: Colors.DarkWhite ,fontSize: 25, textAlign: 'center'}}>Choose Decks</Text>
        </View> 
        <View style={{flex:0.3, alignItems: 'center', justifyContent: 'flex-end'}}></View> 
      </View>
      <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={gameDecks}
        renderItem={renderGridItem}
        numColumns={2}
      />
      </View>
      <View style={styles.bottomScreen}>
      <Animated.View style={{...styles.bottomPlayView,...{backgroundColor: gameColor ,transform: [{translateY: buttonsSlideAnim.interpolate({inputRange:[0,1], outputRange:[600,0]})}]}}}>
        <TouchableCmp onPress={() => nextScreen()} >
        <Text style={styles.bottomPlayText}>
        PLAY
        </Text>
        <Text style={styles.bottomDeckText}>
        {chosenDecks.length} decks, {chosenDeckSize} cards chosen
        </Text>
        <Image source={require('../images/icons/playIcon.png')} style={styles.bottomPlayButton} />
        </TouchableCmp>
      </Animated.View>
      </View>
    </View>
  );
};

export default DecksScreen;

const styles = StyleSheet.create({
    backScreen: {
      flex: 1,
      backgroundColor: Colors.LighterBlack,
    },
    infoButton: {
      height: 25,
      width: 25,
      opacity: 0.6,
      marginRight: 20,
      tintColor: 'white'
    },

    screen: {
      flex: 0.75,
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    bottomScreen:{
      flex: 0.15,
      alignItems: 'center'
    },
    
    imageTitle : {
      width: 150,
      tintColor: Colors.DarkWhite,
      height: '100%',
      alignSelf: 'center'  
    },
    bottomPlayView:{
      height: SCREEN_HEIGHT <=736 ? '90%' :  '70%' || SCREEN_HEIGHT >800 ? '80%' :  '70%',
      width: SCREEN_WIDTH <=375 ? '90%' :  '80%',
      padding: 20,
      borderRadius: 20,
      shadowColor: 'black',
      shadowOpacity: 0.26, 
      shadowOffset: { width: 0, height: 2 }, 
      shadowRadius: 10, 
      elevation: 3,
    },
    bottomPlayText: {
      fontFamily:'norwester', 
      fontSize:SCREEN_HEIGHT <=736 ? 30 : 40, 
      color: Colors.DarkWhite
    },
    bottomDeckText: {
      fontFamily:'norwester', 
      fontSize: 15, 
      color: Colors.DarkWhite
    },
    bottomPlayButton: {
      height:'100%',
      resizeMode: 'contain',
      width: '20%',
      position: 'absolute',
      right: 0,
      tintColor: Colors.DarkWhite
    }
  });