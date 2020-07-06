import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{  
        flex:1,
        alignItems: 'center',
        marginTop:50
    },
    roundedFull: {
        borderRadius: 100/2,
    },
    filters: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginLeft: -10,
    },
    filterText: {
        marginLeft: -35
    },
  });