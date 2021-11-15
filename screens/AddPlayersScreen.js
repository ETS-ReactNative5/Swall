import React, {useState} from 'react';
import {
FlatList,
StyleSheet,
TouchableNativeFeedback,
TouchableOpacity,
View,
Text,
Image,
Button,
Alert,
Pressable,
Modal,
ScrollView,
TextInput
} from 'react-native';
import Colors  from '../constants/Colors';
import { BARCARDS, EDITIONS, PARTYCARDS} from '../data/swall-data'
import { PARTYSTARTERCARDS, PARTYSTARTERTWOCARDS, AROUNDTHEWORLDCARDS, SPORTSDAYCARDS, DIRTYMINDEDCARDS, HEROCARDS, FIVEDECKS } from '../data/fiveSeconds-data';
import { PREPARTYCARDS, DIRTBIRDCARDS, WHATISLOVECARDS, WILDFREECARDS, STEAMINGCARDS } from '../data/mostLikely-data';
import { ICEBREAKERCARDS, WILDONECARDS, NESTEAMINGCARDS, BOYSCARDS, GIRLSCARDS, DIRTYDEEDSCARDS, COUPLESTHERAPYCARDS } from '../data/neverEver-data';
import { KINGSCARDS } from '../data/kings-data';

let TouchableCmp = TouchableOpacity;

const AddPlayersScreen = props => {

const gameId = props.route.params.gameId;
const deckId =props.route.params.deckId;

const shuffle = (array) => {
var i = array.length, randomIndex;
while (0 != i) {
randomIndex = Math.floor(Math.random() * i);
i--;
[array[i], array[randomIndex]] = [
array[randomIndex], array[i]];

}
return array;
};

function fourshuffle (deck){
shuffle(deck);
shuffle(deck);
shuffle(deck);
shuffle(deck);
}

let deck1=[];
let deck2=[];
let deck3=[];
let deck4=[];
let deck5=[];
let deck6=[];

////////////////////// organising decks /////////////
if(gameId ==='g1'){
if(deckId.includes('ed1')){
deck1 = PARTYCARDS
}
if(deckId.includes('ed2')){
deck2 = BARCARDS
}
}
if(gameId ==='g2'){
if(deckId.includes('ned1')){
deck1 = ICEBREAKERCARDS
}
if(deckId.includes('ned2')){
deck2 = WILDONECARDS
}
if(deckId.includes('ned3')){
deck3 = NESTEAMINGCARDS
}
if(deckId.includes('ned4')){
deck4 = BOYSCARDS
}
if(deckId.includes('ned5')){
deck5 = GIRLSCARDS
}
if(deckId.includes('ned6')){
deck6 = DIRTYDEEDSCARDS
}
if(deckId.includes('ned7')){
deck6 = COUPLESTHERAPYCARDS
}
}
if(gameId ==='g3'){
if(deckId.includes('fsd1')){
deck1 = PARTYSTARTERCARDS
}
if(deckId.includes('fsd2')){
deck2 = PARTYSTARTERTWOCARDS
}
if(deckId.includes('fsd3')){
deck3 = SPORTSDAYCARDS
}
if(deckId.includes('fsd4')){
deck4 = AROUNDTHEWORLDCARDS
}
if(deckId.includes('fsd5')){
deck5 = DIRTYMINDEDCARDS
}
if(deckId.includes('fsd6')){
deck6 = HEROCARDS
}
}
if(gameId ==='g5'){
if(deckId.includes('mld1')){
deck1 = PREPARTYCARDS
}
if(deckId.includes('mld2')){
deck2 = WILDFREECARDS
}
if(deckId.includes('mld3')){
deck3 = STEAMINGCARDS
}
if(deckId.includes('mld4')){
deck4 = WHATISLOVECARDS
}
if(deckId.includes('mld5')){
deck5 = DIRTBIRDCARDS
}
}
let editionDecks = [...deck1,...deck2,...deck3,...deck4,...deck5,...deck6]
//////////////////////////////////////////////////////////////////////

// the next screen depends on the game id e.g if game id is g1 go to the swall game
function nextScreen(){
    fourshuffle(editionDecks)
   
    if(gameId === 'g1'){
        props.navigation.navigate('SwallGameScreen', {
            editionDecks: editionDecks,
            playersList: nameData,
            gameId: gameId
        });
    }
    if(gameId === 'g2'){
        props.navigation.navigate('NeverEverScreen', {
            editionDecks: editionDecks,
            playersList: nameData,
            gameId: gameId
        });
    }
    if(gameId === 'g3'){
      props.navigation.navigate('FiveSecondsScreen', {
            editionDecks: editionDecks,
            playersList: nameData,
            gameId: gameId
        });
  }
  if(gameId === 'g4'){
    fourshuffle(KINGSCARDS)
    props.navigation.navigate('KingsScreen', {
        gameId: gameId,
        playersList: nameData,

    });
}
if(gameId === 'g5'){
    props.navigation.navigate('MostLikelyScreen', {
        editionDecks: editionDecks,
        playersList: nameData,
        gameId: gameId
    });
}

  };

   // setup array for adding more text input fields
   const [addPlayerInput, setAddPlayerInput] = useState( [{ value: null }] );
   // array for storing the entered player names
 const [nameData, setNameData]= useState( [] );
 // adds another text input fields
 function handleAdd(index) {
   const values = [...addPlayerInput];
   values.push({value: null});
   setAddPlayerInput(values,index);
}


const addValues = (name, id) => {
    var points  = 0;
      let nameArray = nameData;
      let checkBool = false;
      if(nameArray.length !==0) {
          nameArray.forEach(element => {
              if(element.id === id) {
                  element.name = name;
                  checkBool = true;
              }
          });
      }
      if(checkBool){
          setNameData(nameArray);
      }
      else {
          nameArray.push({points,name,id,});
          setNameData(nameArray);
      }
  };

  // sets up the "Add Player" placeholder 
  function getPlayerNo (ind) {
    let addPlaceholder = "Add Player "+ ind ;
    return addPlaceholder;
};

let buttonText;

  if(nameData.length == 0){
    buttonText = 'Skip'
  }
  else{
    buttonText = 'start'
  }



return (
<View style={styles.screenBack}>
      <View style={{flex: 0.1, flexDirection: 'row'}}>
        <View style={{flex:0.3, justifyContent: 'flex-end'}}>
        <TouchableCmp onPress={() => props.navigation.goBack()} style={{height: '50%', width: '20%', marginLeft: 30}}> 
        <Image style={{tintColor: 'white', height:'100%', width: '100%', resizeMode: 'contain'}} source={require('../images/icons/backArrow.png')}/>
        </TouchableCmp>
        </View> 
        <View style={{flex:0.4, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={{fontFamily: 'norwester', color: 'white',fontSize: 25, textAlign: 'center'}}>Add Players</Text>
        </View> 
        <View style={{flex:0.3, alignItems: 'center', justifyContent: 'flex-end'}}></View> 
      </View>
      <View style={styles.scrollContainer}>
          <ScrollView 
          style={styles.scrollviewContainer}>
              {addPlayerInput.map((player,idx) => {
                  return(
                    <TextInput 
                    style={styles.inputContainer}
                    key={idx}
                    placeholder= {getPlayerNo(idx + 1)}
                    maxLength = {8}
                    onChangeText = {(name) => addValues(name.replace(/ /g,''),idx)}
                    />
                  )
              } )}
              
              <TouchableCmp 
              onPress={() => {if(addPlayerInput.length <10) {
                handleAdd();
              }}}
              >
              <Image style={styles.addContainer} source={require('../images/icons/addIcon.png')}/>
              </TouchableCmp>
          </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableCmp style={styles.buttonContainer} onPress={() => nextScreen()}>
        <Text style={styles.buttonText}>
            {buttonText}
        </Text>
        </TouchableCmp>
        </View>
      <View style={styles.bottomContainer}>
      <Image 
         style={styles.imageTitle}
         source={require('../images/logos/SwallLogo.png')} 
         />
      </View>
      </View>
);


};

const styles = StyleSheet.create({
screenBack: {
flex: 1,
backgroundColor: Colors.LighterBlack
},
scrollContainer: {
flex: 0.7,
backgroundColor: 'transparent'
},
bottomContainer: {
flex: 0.1,
backgroundColor: 'transparent'
},
scrollviewContainer: {
width: '80%',
marginTop: 50,
marginBottom: 20,
alignSelf: 'center',
},
inputContainer: {
height: 60,
width: 250,
padding: 10,
borderRadius: 10,
borderWidth: 2,
borderColor: Colors.DarkWhite,
alignSelf: 'center',
color: Colors.DarkWhite,
marginTop: 20,
justifyContent: 'center',
fontFamily: 'norwester',
fontSize: 20,
textAlign: 'center',

},
buttonsContainer: {
flex: 0.1,
alignContent: 'center',
alignItems: 'center',
justifyContent: 'center'
},
buttonText: {
fontSize: 20,
fontFamily: 'norwester',
color: Colors.DarkWhite,
},
buttonContainer: {
height: '90%',
width: '40%',
borderWidth: 2,
borderColor: Colors.DarkWhite,
borderRadius: 50,
marginVertical: 10,
alignContent: 'center',
justifyContent: 'center',
alignItems: 'center',
padding: 10,
shadowOpacity: 0.26,
shadowOffset: { width: 0, height: 2 },
shadowRadius: 20,
elevation: 3,

},
imageTitle : {
width: 150,
height: '100%',
alignSelf: 'center',
tintColor: Colors.DarkWhite,
},
addContainer: {
height: 50,
width: 50,
tintColor: Colors.DarkWhite,
alignSelf: 'center',
marginTop: 20,
},
});

export default AddPlayersScreen;