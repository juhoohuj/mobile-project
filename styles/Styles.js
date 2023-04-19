import { StyleSheet } from 'react-native';
import { Text, Platform} from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#191D32",
    },
    bottomNav: {
      backgroundColor: "#334195",
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    AddScreenContainer: {
      flex: 1,
      backgroundColor: "#191D32",
      alignItems: 'center',
      marginRight: '20',
      marginLeft: '20',
    },
    ProfileContainer: {
      backgroundColor: "#191D32",
      flex: 1,
      flexDirection:'row',
      flexWrap: "wrap",
    },
    square: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#334195',
      backgroundColor: '#191D32',
      margin: 10,
      height: 100,
    },
    headerStyle: {
      fontSize: 36,
      textAlign: 'center',
      fontWeight: '100',
      marginBottom: 24,
      color: "#ffff",
      fontFamily: 'RobotoCondensed-Light',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -1, height: 1},
         textShadowRadius: 10
    },
    elementsContainer: {
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 50,
      bordertRadius: 30,
    },
    imageStyle: {
      height: 'cover',
      width: 'cover',
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 25,
      opacity: '95%',
      backgroundColor:'#191D32',
      borderWidth: 3,
      borderRadius: 2,
      borderColor: '#191D32',
    },
    imageText: {
      position: 'right',
      marginLeft: 50,
      fontSize: 40,
      fontFamily: 'RobotoCondensed-Regular',
      color:'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    TextInput:{
      height: 50, 
      width: '100',
      borderColor: 'gray', 
      borderWidth: 1,
      fontWeight: 'bold',
      color: '#020887',
      textAlign:'center',
      backgroundColor:'#FFFFFF',
      marginBottom: 5,
    },
    savedText:{
      color:'#FFFFFF'
    }
    
});

