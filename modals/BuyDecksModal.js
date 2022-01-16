import React, {useState, useRef, useEffect} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image, 
    Dimensions,
    Modal,
    Animated,
    Easing,
    FlatList,
    Alert,
    ActivityIndicator
  } from 'react-native';
import Colors  from '../constants/Colors';
import Purchases from 'react-native-purchases';
import { ENTITLEMENT_ID } from '../constants';
import { useNavigation } from '@react-navigation/native';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

let TouchableCmp = TouchableOpacity;




const BuyDecksModal = props => {

 

  
    // - State for all available package
  const [packages, setPackages] = useState([]);

  // - State for displaying an overlay view
  const [isPurchasing, setIsPurchasing] = useState(false);

  //let packPrice  = packages[0].product.price_string;
  //testProduct = ([packages[0].product.title, packages[0].product.description, packages[0].product.price_string]);
  //let testProduct;

  
  useEffect(() => {
    // Get current available packages
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        Alert.alert('Error getting offers', e.message);
      }
    };

    getPackages();
  }, []);

  const BuyButton = ({purchasePackage, setIsPurchasing}) => {

    const {
      product: { title, description, price_string },
    } = purchasePackage;
  
    const navigation = useNavigation();
  
    const onSelection = async () => {
      setIsPurchasing(true);
  
      try {
        const { purchaserInfo } = await Purchases.purchasePackage(purchasePackage);
  
        if (typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined') {
          console.log("already got")
        }
      } catch (e) {
        if (!e.userCancelled) {
          Alert.alert('Error purchasing package', e);
        }
      } finally {
        setIsPurchasing(false);
      }
    };
    
      return (
      <TouchableCmp onPress={onSelection} style={{ height: SCREEN_HEIGHT <=736 ? 80 :100,  width: '70%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: Colors.Yellow}}>
        <View></View>
        <Text style={styles.buyTitle}>Unlock now</Text>
        <Text style={styles.buyTitle}>Only {price_string}!</Text>
      </TouchableCmp>
    );
  
  };


  const GameContainers = props =>{
    return(
      <View style={styles.gameContainers}>
        <View style={styles.gameImageContainer}>
        <Image source={props.gameImage} style={{...styles.gameImageSize,...{ tintColor: props.gameColor}}}/>
        </View>
        <View style={styles.gameTitleContainer}>
        <Text style={{...styles.titleText,...{color: props.gameColor}}}>{props.gameTitle}</Text>
        <Text style={styles.subtitleText}> {props.gameTitle2}</Text>
        </View>
        </View>
    )
  }
  

      return(
        <Modal animationType={'slide'} transparent={true} visible={props.showBuy}>
        <View style={{height: '100%', 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: Colors.LighterBlack, 
        position: 'absolute'}}/>
        <View style={{ flex: 1}}>
        <View style={{flex: 0.2}}>
        <TouchableCmp onPress={props.close} style={styles.xView}>
        <Image style={{tintColor: Colors.Yellow, height: '100%', width: '100%', resizeMode: 'contain'}} source={require('../images/icons/cancelIcon.png')} />
        </TouchableCmp>
        </View>
        <View style={{flex: 0.5, alignItems: 'center'}}>
        <Text style={styles.description}>Make Your Party Epic!</Text>
        <View style={{backgroundColor: Colors.Yellow, width: '80%', height: 2, marginTop: 10,}}></View>
        <Text style={styles.description2}>Includes all 14 decks and future decks for a one time single purchase!</Text>
        <GameContainers gameTitle={"Swall"} gameColor={Colors.Turqiose} gameImage={require('../images/gamesIcons/swallIcon.png')} gameTitle2={"+ 2 Decks, 440 Cards"}/>
        <GameContainers gameTitle={"Never Have I Ever"} gameColor={Colors.Purple} gameImage={require('../images/gamesIcons/neverIcon.png')} gameTitle2={"+ 5 Decks, 440 Cards"}/>
        <GameContainers gameTitle={"5 Seconds"} gameColor={Colors.Red} gameImage={require('../images/gamesIcons/fiveSecondsIcon.png')} gameTitle2={"+ 4 Decks, 320 Cards"}/>
        <GameContainers gameTitle={"Most Likely To"} gameColor={Colors.Lime} gameImage={require('../images/gamesIcons/mostLikelyIcon.png')} gameTitle2={"+ 3 Decks, 175 Cards"}/>
        
        </View>  
        <View style={{flex: 0.3,}}>
        <FlatList
        data={packages}
        scrollEnabled={false}
        renderItem={({ item }) => <BuyButton purchasePackage={item} setIsPurchasing={setIsPurchasing} />}
        keyExtractor={(item) => item.identifier}
      />
        </View>
        {isPurchasing && <View style={styles.overlay}>
        <ActivityIndicator size= 'large' color={Colors.Yellow}/>
        </View>}
        </View>
      </Modal>
      )

};

export default BuyDecksModal;

const styles = StyleSheet.create({

  page: {
    padding: 16,
  },
  text: {
    color: 'lightgrey',
  },
  headerFooterContainer: {
    marginVertical: 10,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: Colors.LighterBlack,
  },
  logoSize: {
    height: SCREEN_HEIGHT <=736 ? 125 :150,
    width:  SCREEN_HEIGHT <=736 ? 125 :150,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: -50
    },
  gameContainers: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT <=736 ? 50 : 70,
    width: '60%',
    },
  xView: {
    position: 'absolute', 
    left: 30,
    top: SCREEN_HEIGHT <=736 ?  60 :100,
    height: 20, 
    width: 20,
    
    },
    description:{
        fontSize:  25, 
        fontFamily: 'norwester',
        textAlign: 'center',
        color: Colors.DarkWhite,
        marginHorizontal: 30,
    },
    description2:{
      fontSize:  20, 
      fontFamily: 'norwester',
      textAlign: 'center',
      color: Colors.DarkWhite,
      marginHorizontal: 30,
      marginTop: 20,
      marginBottom: 20
  },
    gameImageContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameTitleContainer: {
    flex: 0.7,
    justifyContent: 'center',
    },
    gameImageSize: {
        height: '70%',
        width: '70%',
        resizeMode: 'contain'
    },
    titleText:{
        fontFamily: 'norwester',
        fontSize: 20,
    },
    subtitleText:{
        fontFamily: 'norwester',
        fontSize: 15,
        color: Colors.DarkWhite,
        marginTop: 5
    },
    buyButton: {
        height: SCREEN_HEIGHT <=736 ? 80 :100,
        width: '70%',
        borderRadius: 20,
        backgroundColor: Colors.DarkWhite,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyTitle: {
      color: Colors.LighterBlack,
      fontSize: 30,
      fontFamily: 'norwester',
      fontWeight: 'bold',
    },


      });