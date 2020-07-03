import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    bdy:{  
        flex:1,
    },
    container:{  
        flex:1,
        marginTop: 55
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    tinyLogo: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    markView: {
        borderWidth: 3,
        borderRadius: 100,
        borderColor: '#fff'
    }
  });