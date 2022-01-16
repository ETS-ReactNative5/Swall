import React , { useEffect, useState }  from 'react';
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
    Dimensions,
    LogBox
  } from 'react-native';
import Colors from '../constants/Colors'
import SwallGridTile from '../components/SwallGridTile';
import { GAMES } from '../data/games-data';
import ChooseGameModal from '../modals/ChooseGameModal';
import BuyDecksModal from '../modals/BuyDecksModal';
import Purchases from 'react-native-purchases';
import { ENTITLEMENT_ID } from '../constants';
import {LinearGradient} from 'expo-linear-gradient'


const ChooseGameScreen = props => {
    let TouchableCmp = TouchableOpacity;
    LogBox.ignoreAllLogs();

    const [openBuy, setOpenBuy] = useState(false);
    const [isUserPro, setIsUserPro] = useState(false);

      const performProCheck = async () => {
        try {
          const purchaserInfo =  await Purchases.getPurchaserInfo();
          if(typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined") {
            // Grant user "pro" acces
            setIsUserPro(true);
            console.log(isUserPro)
            setOpenBuy(true)
          }
          else {
            console.log("not pro")
          }
          // access latest purchaserInfo
        } catch (e) {
         // Error fetching purchaser info
         Alert.alert("Error has occured", e)
        }
      };
  let mounted = true;

  
      useEffect(() => {
       performProCheck();
      }, []);
   
        
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

    const [showModal, setShowModal] = useState(false);
  const [modalGameId, setModalGameId] = useState('');
  const [modalTitle, setModalTitle] =useState('');
  const [modalDescription, setModalDescription] =useState('');
  const [modalImage, setModalImage] =useState('');
  const [modalColor, setModalColor] =useState('');

  function getModal() {
    setShowModal(!showModal)
    if(modalGameId === 'g1'|| modalGameId === 'g2'|| modalGameId === 'g3' || modalGameId === 'g5'){
    props.navigation.navigate('DecksScreen', {
        gameId: modalGameId
    });
        }       
        if(modalGameId === 'g4'){
          props.navigation.navigate('AddPlayersScreen', {
              gameId: modalGameId
          });
              }   
  };

    const StartModal =() =>{
        return(
          <ChooseGameModal
          modalShow = {showModal}
          settingModal ={() => setShowModal(!showModal)}
          modalColor={modalColor}
          modalTitle={modalTitle}
          modalImage={modalImage}
          modalDescription = {modalDescription}
          openModal ={() => getModal()} />
        );
      }

    const renderGridItem = itemData => {
        return(
            <SwallGridTile
            title={itemData.item.title}
            image={itemData.item.image}
            color={itemData.item.color}
            noPlayers = {itemData.item.noPlayers}
            description ={itemData.item.description}

            onSelect={() => {
                setShowModal(!showModal)
                setModalGameId(itemData.item.id)
                setModalImage(itemData.item.image)
                setModalDescription(itemData.item.description)
                setModalTitle(itemData.item.title)
                setModalColor(itemData.item.color)
              }}
            />
        );
    };

    return(
        <View style={styles.backScreen}>
        <StartBuyDecksModal/>
        <View style={{flex: 0.1, justifyContent: 'flex-end', alignItems: 'center',}}>
        <Text style={{fontFamily: 'norwester', color: Colors.DarkWhite, fontSize: 25}}>Choose a game</Text>
        </View>
        <View style={styles.screen}>
        <StartModal/>
        <FlatList
        keyExtractor={(item, index) => item.id}
        data={GAMES}
        renderItem={renderGridItem}
        numColumns={2}
        />
        </View>
        <TouchableCmp disabled={openBuy} onPress={() => setBuyModal(!showBuyModal)} style={styles.bottomScreen}>
        <Image 
         style={styles.imageTitle}
         source={require('../images/logos/SwallLogo.png')} 
         />
        </TouchableCmp>
        </View>
    );

};


export default ChooseGameScreen;

const styles = StyleSheet.create({
    backScreen: {
      flex: 1,
      backgroundColor: Colors.LighterBlack
    },
    infoButton: {
      height: 25,
      width: 25,
      opacity: 0.6,
      marginRight: 20,
      tintColor: 'white'
    },

    screen: {
      flex: 0.8,
      paddingVertical: 20,
      
    },
    bottomScreen:{
      flex: 0.1,
    },
    
    imageTitle : {
      width: 150,
      tintColor: Colors.DarkWhite,
      height: '100%',
      alignSelf: 'center'  
    },
    
    
  });