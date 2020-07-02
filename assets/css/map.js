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
  });