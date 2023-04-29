import { StyleSheet } from 'react-native';
import { Text, Platform} from 'react-native';
import { Dimensions } from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#191D32",
      borderRadius: 10,
    },
    bottomNav: {
      position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
      // marginRight: '20',
      // marginLeft: '20',
      
    },
    homeScreenItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: 20,
      marginLeft: 20,
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
      // marginBottom: 24,
      color: "#ffff",
      fontFamily: 'RobotoCondensed-Light',
      textShadowColor: 'rgba(0, 0, 0, 1)',
         textShadowOffset: {width: -1, height: 1},
         textShadowRadius: 10
    },
    elementsContainer: {
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 50,
      borderRadius: 30,
    },
    imageStyle: {
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      opacity: 0.95,
      backgroundColor:'#191D32',
      borderWidth: 3,
      borderRadius: 30,
      borderColor: '#191D32',
    },
    imageText: {
      // position: 'right',
      // marginLeft: 50,
      fontSize: 40,
      fontFamily: 'RobotoCondensed-Regular',
      color:'white',
      textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    TextInput:{
      height: 50, 
      width: 100,
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
    },
    profileText:{
      color:'#FFFFFF',
      fontSize: 20,
      fontFamily: 'RobotoCondensed-Regular',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10

    },
    graphContainer: {
      backgroundColor: "#191D32",
      alignItems: 'center',
    },
    graphSkeleton: {
      backgroundColor: "#334195",
      // backgroundColor: "#020887",
      // backgroundColor: "#222222",

      // backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center',
      width: Dimensions.get("window").width - 20,
      height: 220,
      borderRadius: 25,
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
      marginBottom: 15,
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
      marginBottom: 20,
    },
    calendarTheme: {
      //Päivien boxin väri
      calendarBackground: '#334195 ',
      textSectionTitleColor: '#ffffff',
      selectedDayBackgroundColor: '#c2bfee',
      selectedDayTextColor: '#000000',
      todayTextColor: '#00adf5',
      textMonthFontFamily : 'RobotoCondensed-Light',
      textDayFontFamily: 'RobotoCondensed-Light',
      monthTextColor: 'white',
      textMonthFontSize: 30,
      textDayHeaderFontFamily: 'RobotoCondensed-Regular',
      textDayHeaderFontSize: 17,
      // dayTextColor: '#2d4150',
      textDisabledColor: 'black',
      dotColor: '#002222',
      indicatorColor: '#020887',
      dayTextColor: 'white',
    },
    calendarBackground: {
      //Tausta boxin väri  
      backgroundColor: '#19D32',
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 10,
    },
    workoutHistoryContainer: {
      backgroundColor: '#334195',
      marginHorizontal: 20,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      borderRadius: 10,
      marginBottom: 20,
    }, 
  workoutBox: {
      backgroundColor: '#191D32',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    }, workoutName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    workoutDate: {
      fontSize: 14,
      color: 'white',
    },
    moveName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    setText: {
      fontSize: 14,
      color: 'white',
    },

});

