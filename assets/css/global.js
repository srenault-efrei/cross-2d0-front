import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    circle: {
        zIndex: 1,
        position: 'absolute',
        top: 30,
        width: 100,
        height: 100,
        borderWidth: 0.5,
        borderRadius: 100/2,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent:'center',
        alignItems: 'center',
    },
    filters: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    filterText: {
        marginLeft: -15
    },
  });