import React, { useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, TouchableOpacity, FlatList, Easing } from 'react-native';
import Colors from '../constants/Colors';
import PlayerScoreBoard from '../modals/PlayerScoreBoard';
import InstructionsModal from '../modals/InstructionsModal';
import BackModal from '../modals/BackModal';
import GameoverModal from '../modals/GameoverModal';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
let TouchableCmp = TouchableOpacity;
////Creating a touch button//////////////////////////////////////
const FiveSecondsScreen = props => {

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

  /////////// setting up timer ///////////////
  const [timer, setTimer] = React.useState(5);
  const [stopper, setStopper] = useState(true);

  /// retreiving names from array /////////////////
  var nameArray = props.route.params.playersList;
  var playerNames = nameArray.map((item => item.name))
  const [name, setName] = useState(0);
  var player;
  var nextName;
  var scoreboardNames = [...nameArray];

  
  const renderScoreboard = itemData => {
    var bc;
    if(itemData.item.name === player){
      bc = Colors.DarkWhite
    }
    else {
      bc = 'transparent'
    }
    return (
      <PlayerScoreBoard
        name={itemData.item.name}
        points = {itemData.item.points}
        colorBorder = {bc}
        viewColor={Colors.Red}
      />
    );
  };
  
 //// to keep timer couting down /////////////////////////////////
 const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (stopper==false) {
      if(timer>0){
      setTimeout(() => setTimer(timer - 1), 1000);
      startImageRotateFunction()
      setButtonDisabled(true)
      }
      if (timer == 0){
        fadeIn(buttonsFade)
        setButtonDisabled(false)
      }
    } 
    else {
      setStopper(true)
    }
  });

/// to handle points system ////////////////
///// resets counter, sets next question and slide buttons in / out //////////////////
function correct() {
  if(timer==0){
  setTimer(5);
  setStopper(true);
  nextquestion();
  fadeIn(startFade)
  fadeOut(buttonsFade);
  if (!nameArray.length== 0){
    nextName();
    nameArray.map((item, key) => {
      if(player == item.name) {
        item.points ++;
      }
    })
  }
}
};



function failed() {
  if(timer==0){
  setTimer(5);
  setStopper(true);
  nextquestion();
  fadeIn(startFade);
  fadeOut(buttonsFade);
  if (!nameArray.length== 0){
    nextName();
  }
}
}



/////get player names array /////////////////////
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

  //// Creating the slide animation for buttons /////////////////////////////////////
  const buttonsFade = useRef(new Animated.Value(0)).current;
  const startFade = useRef(new Animated.Value(1)).current;

  const fadeIn = (fin) => {
    Animated.timing(fin, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (fout) => {
    Animated.timing(fout, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  ///// creating spin animation ////
  let rotateValueHolder = new Animated.Value(0);

  function startImageRotateFunction () {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  /////////// creating questions arrey and next question function /////////////////////
  const questions = editionDecks.map(item => item.question);
  const deckname = editionDecks.map(item => item.deckTitle);
  var deckLength = editionDecks.length;
  var [cardCounter, setCardCounter] = useState(deckLength);
  const [question, setQuestion] = useState(0);
  var currentQuestion;
  var nextquestion;
  var currentDeckname;
  currentQuestion = questions[question];
  currentDeckname = deckname[question]
  nextquestion = () => {
    if (question< questions.length){
      setQuestion(question+1);
      setCardCounter(cardCounter-1);
    }
  if(question == questions.length -1 )
  {
    showGameover();
  }
    
  };
  

////// starts timer and slide out start button ///////////////////////////////////////
function startTimer(){
  setStopper(false);
  fadeOut(startFade);
}  

  ///// Setting up game over modal ////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showGameOverModal,setGameOverShowModal] = useState(false);
  const showGameover = () => {setGameOverShowModal(!showGameOverModal)};
  const gameleave = () => { setGameOverShowModal(!showGameOverModal)
    props.navigation.navigate('DecksScreen',{
        gameId: gameId
    })}

  const StartGameOverModal =  () => {
      return(
       <GameoverModal
       showGameover={showGameOverModal}
       leave = {gameleave}
       />
      )
  };
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  return (
    <View style={styles.screenBack}>
      <InstructionsModal
      instructionText = {"NB. You only gain points by having entered player names.\n\n 1. Read the card and try to answer the question as quick as possible within the 5 second limit.\n\n2. If you fail to do so you hit the 'X' button and gain 0 points.\n\n3. If successful in answering the question, hit the tick button and gain 1 point."}
 
      />
      <GetBackModal/>
      <StartGameOverModal/>
      <View style={styles.topView}>
        <View style={{flex:0.2, justifyContent: 'flex-end'}}>
        <TouchableCmp onPress={() => setBackModal(!showBackModal)} disabled={buttonDisabled} style={{height: '50%', width: '35%', marginLeft: 30}}> 
        <Image style={{tintColor: Colors.LighterBlack, height:'100%', width: '100%', resizeMode: 'contain'}} source={require('../images/icons/backArrow.png')}/>
        </TouchableCmp>
        </View> 
        <View style={{flex:0.6, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={{fontFamily: 'norwester', fontSize: 30, textAlign: 'center', color: Colors.LighterBlack}}>
       5 Seconds
        </Text>
        </View> 
        <View style={{flex:0.2, alignItems: 'center', justifyContent: 'flex-end'}}></View> 
      </View>
      <View style={styles.midView}>
      <Text style={nameArray.length ==0 ? {opacity: 0}: styles.nameText}>
         {player}'s turn
        </Text>
      <View style={styles.cardView}>
        <View style={styles.cardTopView}>
        <Animated.Image source={require('../images/icons/backClockIcon.png')} style={{tintColor: Colors.Red, height: '100%', width: '100%', resizeMode: 'contain', transform: [{rotate: rotateData}]}}/>
        <Text style={{position: 'absolute', fontFamily:'norwester', fontSize: 50, textAlign: 'center', color: Colors.Red, }}>{timer}</Text>
        </View>
        <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5,}}>
        <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', position: 'absolute', right: 10, top: 20, color: Colors.DarkWhite, opacity: 0.2}}>{cardCounter}/{deckLength}</Text>
        <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', position: 'absolute', left: 10, top: 20, color: Colors.DarkWhite, opacity: 0.2}}>{currentDeckname}</Text>
        <Text style={styles.cardQuestionText}>{currentQuestion}</Text>
        </View>
        <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'center', }}>
          <Animated.View style={{opacity: buttonsFade}}>
          <Text style={styles.cardCouldQuestion}>Could you name three?</Text>
          </Animated.View>
        </View>
        <View style={{flex: 0.15, flexDirection: 'row', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,}}>
        <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: buttonsFade}}>
        <TouchableCmp onPress={failed} style={{height: '100%', width: '100%', borderBottomLeftRadius: 20,alignItems: 'center', justifyContent: 'center', alignSelf: 'center',}}>
        <Image source={require('../images/icons/cancelIcon.png')} style={{tintColor: Colors.Red, resizeMode: 'contain', height: '40%', width: '40%'}}/>
      </TouchableCmp>
          </Animated.View>
          <Animated.View style={{flex: 1, alignItems: 'center', justifyContent: 'center', opacity: startFade}}>
            <TouchableCmp onPress={startTimer} style={{ height: '100%', width: '100%',alignItems: 'center', justifyContent:'center'}}>
            <Text style={{textAlign: 'center', fontSize: 25, fontFamily: 'norwester', color: Colors.Red}}>START</Text>
            </TouchableCmp>
          </Animated.View>
          <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: buttonsFade}}>
          <TouchableCmp onPress={correct} style={{height: '100%', width: '100%', borderBottomRightRadius: 20 ,alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
          <Image source={require('../images/icons/checkIcon.png')} style={{tintColor: Colors.Red, resizeMode: 'contain', height: '40%', width: '40%'}}/>
          </TouchableCmp>
          </Animated.View>
        </View>
      </View>
        </View>
        <View style={styles.bottomView}>
        <FlatList
      horizontal
        keyExtractor={item => item.id.toString()}
        data={scoreboardNames}
        renderItem={renderScoreboard}
        />
        </View>
    </View>
  );
};


FiveSecondsScreen.navigationOptions = navigationData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screenBack: {
    flex: 1,
    backgroundColor: Colors.Red,
  },
  topView:{
    flex: 0.1, 
    flexDirection: 'row',
  },
  midView:{
    flex: 0.75, 
    alignItems: 'center', 
  },
  bottomView:{
    flex: 0.15, 
    marginHorizontal:10
  },
  nameText: {
    fontFamily: 'norwester', 
    fontSize: 25, 
    textAlign: 'center', 
    color: Colors.DarkWhite, 
    marginTop: 20
  },
  cardView: {
    height:'85%', 
    width: '90%',
    backgroundColor: Colors.LighterBlack, 
    alignItems: 'center', 
    borderRadius: 20, 
    marginTop: 20,
    shadowColor: 'black', 
    shadowOpacity: 0.26, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 10, 
    elevation: 3,
  },
  backShadow: {
    shadowColor: 'black', 
    shadowOpacity: 0.26, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 10, 
    elevation: 3
  },
  cardTopView:{
    flex: 0.25, 
    width: '90%',
    borderBottomWidth: 5, 
    borderRadius: 20, 
    borderColor: Colors.Red, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderTopRightRadius: 20, 
    borderTopLeftRadius: 20
  },
  cardQuestionText: {
    fontFamily: 'norwester', 
    textAlign: 'center', 
    color: Colors.DarkWhite, 
    fontSize: SCREEN_HEIGHT <=736 ? 25 : 35, 
    marginHorizontal: 10
  },
  cardCouldQuestion: {
    fontFamily: 'norwester', 
    fontSize: SCREEN_HEIGHT <=736 ? 20 : 25, 
    textAlign: 'center', 
    color: Colors.DarkWhite
  },
  
  
});
export default FiveSecondsScreen;
