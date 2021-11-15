import React, {useState, useCallback} from 'react';
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
  Modal
} from 'react-native';
import Colors  from '../constants/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Dots from 'react-native-dots-pagination';
import BuyDecksModal from '../modals/BuyDecksModal';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

let TouchableCmp = TouchableOpacity;

const ChooseDeckModal = props => {

    //////////// adding buy decks modal //////////////////
  const [showBuyModal,setBuyModal] = useState(false);

  const StartBuyDecksModal =  () => {
      return(
       <BuyDecksModal
       showBuy={showBuyModal}
       close={() => setBuyModal(!showBuyModal)}
       />
      )
  };
  ///////////

    const [activeDot, setActiveDot] = useState(0);

    const handleVieweableItemsChanged = useCallback(({ viewableItems }) => {
        setActiveDot(viewableItems[0].index);
      }, []);

      const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
      };

      if(props.isbought === true ){
 
  return (
    <Modal animationType={'slide'} transparent={true} visible={props.modalShow}>
        <View style={styles.modalBackground}/>
        <View style={styles.modalBackView}>
        <View style={styles.modalGameView}>
        <View style={{flex: 0.6,}}>
          <TouchableCmp onPress={props.settingModal}>
        <Text style= {{...styles.modalXText,...{color: props.modalColor}}}>X</Text>
        </TouchableCmp>
        
        <Image style={{...styles.modalImage,...{tintColor: props.modalColor}}} source={props.modalImage}/>
        <Text style={{...styles.modalTitleText,...{color: props.modalColor}}}> {props.modalTitle} </Text>
        </View>
        <View style={{flex: 0.4}}>
        <Text style={{ marginHorizontal: 30, fontSize: 15, fontFamily: 'norwester', color: props.modalColor}}>E.g.</Text>
        <Text style={{ fontSize: 15, fontFamily: 'norwester', color: props.modalColor, position: 'absolute', right: 30,  }}>{props.decklength} Cards</Text>
        <FlatList
        horizontal
        data = {props.questions}
        pagingEnabled
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        showsHorizontalScrollIndicator = {false}
        onViewableItemsChanged={handleVieweableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <View style={{ width: 300,  justifyContent:'center',alignItems:'center', paddingHorizontal: 50,}}> 
            <Text numberOfLines={2} style={{ fontFamily:'norwester', textAlign: 'center', fontSize: 20,}}>{item.question}</Text>
            </View>
        )}
        />
         <Dots
     activeDotWidth={6}
     activeDotHeight={6}
     passiveDotHeight={6}
     passiveDotWidth={6}
     length={3}
     activeColor={props.modalColor}
     active={activeDot}
     />
       
        </View>
        </View>
        </View>
      </Modal>
  );
 }

 else{
    return (
        <Modal animationType={'slide'} transparent={true} visible={props.modalShow}>
        <StartBuyDecksModal/>
            <View style={styles.modalBackground}/>
            <View style={styles.modalBackView}>
            <View style={styles.modalGameView2}>
            <View style={{flex: 0.5,}}>
              <TouchableCmp onPress={props.settingModal}>
            <Text style= {{...styles.modalXText,...{color: props.modalColor}}}>X</Text>
            </TouchableCmp>
            
            <Image style={{...styles.modalImage,...{tintColor: props.modalColor}}} source={props.modalImage}/>
            <Text style={{...styles.modalTitleText,...{color: props.modalColor}}}> {props.modalTitle} </Text>
            </View>
            <View style={{flex: 0.25}}>
            <Text style={{ marginHorizontal: 30, fontSize: 15, fontFamily: 'norwester', color: props.modalColor}}>E.g.</Text>
            <Text style={{ fontSize: 15, fontFamily: 'norwester', color: props.modalColor, position: 'absolute', right: 30,  }}>{props.decklength} Cards</Text>
            <FlatList
            horizontal
            data = {props.questions}
            pagingEnabled
            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            showsHorizontalScrollIndicator = {false}
            onViewableItemsChanged={handleVieweableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <View style={{ width: 300,  justifyContent:'center',alignItems:'center', paddingHorizontal: 50,}}> 
                <Text numberOfLines={2} style={{ fontFamily:'norwester', textAlign: 'center', fontSize: 20,}}>{item.question}</Text>
                </View>
            )}
            />
             <Dots
         activeDotWidth={6}
         activeDotHeight={6}
         passiveDotHeight={6}
         passiveDotWidth={6}
         length={3}
         activeColor={props.modalColor}
         active={activeDot}
         />
           
            </View>
            <View style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableCmp onPress={() => setBuyModal(!showBuyModal)} style={{justifyContent: 'center', alignItems: 'center',backgroundColor: props.modalColor, height: '80%' , width: '80%', borderRadius: 20}}>
                <Text style={{fontFamily: 'norwester', fontSize: 35, textAlign: 'center', color: 'white'}}>Unlock Now!</Text>
                <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', color: 'white'}}>20 Decks, 2000+ cards!</Text>
                <Text style={{fontFamily: 'norwester', fontSize: 15, textAlign: 'center', color: 'white'}}>Only £2.99!</Text>
                </TouchableCmp>

            </View>
            </View>
            </View>
          </Modal>
      );

 }
};

export default ChooseDeckModal;

const styles = StyleSheet.create({
    modalBackground: {
        height: '100%', 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: Colors.LighterBlack, 
        opacity: 0.6,
        position: 'absolute'
    },
    modalBackView: {
        flex: 1, 
        justifyContent:'center', 
        alignItems: 'center'
    },
    modalGameView:  {
        height: SCREEN_HEIGHT <=736 ? '50%' : '40%', 
        width: 300, 
        backgroundColor: Colors.DarkWhite, 
        borderRadius: 20, 
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3,
    },
    modalGameView2:  {
        height: SCREEN_HEIGHT <=736 ? '70%' : '60%', 
        width: 300, 
        backgroundColor: Colors.DarkWhite, 
        borderRadius: 20, 
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3,
    },
    modalXText: {
        fontSize: 35, 
        fontFamily: 'norwester', 
        position: 'absolute',  
        left: 15, 
        top: 15,
    },
    
    modalImage:{
        height: '60%',
        width: '40%',
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 20,
    },
    modalTitleText: {
        fontFamily: 'norwester', 
        fontSize: 35, 
        alignSelf: 'center',
        textAlign: 'center', 
        justifyContent: 'center', 
        marginTop: 15,
    },
    modalDescriptionText: {
        fontFamily: 'norwester', 
        fontSize: 15, 
        alignSelf: 'center', 
        color: 'white', 
        textAlign: 'center', 
        justifyContent: 'center', 
        marginHorizontal: 50,  
        marginTop: 10,
    },
    modalButtonView: {
        height: 70, 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute', 
        bottom: 0, 
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20 
    },
    modalButtonText: {
        color: Colors.secondaryColor, 
        textAlign: 'center', 
        fontSize: 25, 
        fontFamily: 'norwester'
    },
  });
