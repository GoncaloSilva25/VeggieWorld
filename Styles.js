import {StyleSheet} from 'react-native';
export default StyleSheet.create({

    recipesButton: {
        backgroundColor: '#90EE90',
        width: 100,
        height: 100,
    },

    list: {
      justifyContent: 'center',
      flexDirection: 'column',
    },


    recipeImage: {
      width: 100,
      height: 100,
    },

    recipeFullImage: {
      width: 175,
      height: 175,
    },

    veggieEaterPageButtons: {
      alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#007500',
        width: 100,
        height: 43,
    },

    buttonAddVegetable:{
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#D3D3D3',
      width: 120,
      height: 30
    },

    modalContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 210,
    },

    innerModal: {
      width: 300, 
      height: 380, 
      backgroundColor: 'grey',
      borderColor: '#007500',
      borderWidth: 3,
    },

    modalContentRecipe: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 185,
    },

    innerModalRecipe: {
      width: 350, 
      height: 480, 
      backgroundColor: 'white',
      borderColor: '#007500',
      borderWidth: 3,
    },

    veggetableImages: {
        width: 75,
        height: 75,
        borderColor: '#007500',
    },

    veggetableImage: {
      width: 125,
      height: 125,
      borderColor: '#007500',
  },

    veggetableButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      width: 75,
      height: 75,
      paddingRight: 0
  },

    container_VeggieEaterPageButtons: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingLeft: 20,
        paddingBottom: 3,
      },

    container_VeggieEaterPageButtonsRecipe: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 47,
        paddingTop: 3,
      },



    searchBarContainer: {
      paddingTop:20,
      paddingLeft:25,
      width:225,
    },

    veggieEaterButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#007500',
        width: 125,
        height: 125,
    },

    veggieEaterDailyInfo: {
      fontSize: 16,
      paddingLeft: 20,
      color: 'black',
    },

    singleVeggieEaterContainerImage: {
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      paddingLeft:30,
      paddingTop: 48,
    },

    veggieEaterEditButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#007500',
      width: 100,
    },

    squareVeggieEater: {
      width: 120,
      height: 120,
      borderColor: '#007500',
    },

    veggieEaterName: {
      paddingTop:5,
      fontSize: 18,
      fontWeight: 'bold',
      color: 'gray',
    },

    veggieEaterButtonContainer:{
      flex: 1,
      paddingTop: 30,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#007500',
        width: 175,
      },

    backButton: {
        paddingHorizontal: 21,
        backgroundColor: '#90EE90',
        width: 325,
      },

    backTextButton: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },  
    
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
    
    textTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'gray',
    },
    
    topbar: {
        flex: 1,
        height: 50,
        backgroundColor: '#90EE90',
        borderBottomColor: '#808080',
        borderBottomWidth: 3,
        flexDirection:'row',
      },
    
    container_button1: {
        paddingTop: 25,
        justifyContent: 'center',
        alignItems: "center",
      },
    
    container_button2: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: "center",
      },
    
    container_calendar: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: "center",
      },
    
    container_icons: {
        flex: 1,
        paddingTop: 50,
        flexDirection:'row',
      },

    container_icons_singleVeggie: {
        flex: 1,
        paddingTop: 10,
        flexDirection:'row',
      },  
    
    paragraph: {
        margin: 16,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    
    circle: {
       width: 120,
       height: 120,
       borderRadius: 120/2,
       borderWidth: 3,
       borderColor: '#808080'
      },

    circleVeggie: {
      width: 100,
      height: 100,
      borderRadius: 100/2,
      borderWidth: 3,
      borderColor: '#808080'
    },
    
    square: {
        width: 200,
        height: 200,   
      }
});