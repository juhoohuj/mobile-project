import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#191D32",
    },
    AddScreenContainer: {
      flex: 1,
      backgroundColor: "#191D32",
      alignItems: 'center',
      marginRight: '20',
      marginLeft: '20',
    },
    headerStyle: {
      fontSize: 36,
      textAlign: 'center',
      fontWeight: '100',
      marginBottom: 24,
      color: "#ffff",
    },
    elementsContainer: {
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
      bordertRadius: 20,
    },
    imageStyle: {
      height: 'cover',
      width: 'cover',
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 25,
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