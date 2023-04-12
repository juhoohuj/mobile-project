import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#191D32",
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
      // height: 'cover',
      // width: 'cover',
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 25,
    },
    graphContainer: {
      backgroundColor: "#191D32",
      alignItems: 'center',
    },
    graphScrollContainer: {
      marginLeft: 10,
      marginRight: 10
    },
    graphName: {
      fontSize: 24,
      color: "white"
    },
    graphInfoText: {
      fontSize: 24,
      color: "white"
    },
    graphInput: {
      fontSize: 24,
      color: "white",
      textAlign: "center",
      backgroundColor: "#3f3f3f",
      width: 80,
      borderRadius: 25,
      marginBottom: 10,
      marginTop: 10,
    },
    graphButton: {
      fontSize: 18,
      color: "black",
      textAlign: "center",
      backgroundColor: "#f3f3f3",
      padding: 6,
      paddingBottom: 0,
      paddingTop: 0,
      borderRadius: 25,
      minWidth: 50,
      // marginBottom: 40
    }
    
});