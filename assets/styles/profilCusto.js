import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

 
  footer: {
    width:"100%",
    height: '10%',
    backgroundColor:"#65a7ed",
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    width:"100%",
    height: '15%',
    backgroundColor:"#65a7ed",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    width:"95%",
    height: "10%",
    backgroundColor:"#f2f2f2",
    borderRadius: 10,
    marginBottom: "3%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row"
  },

  param: {
    width:'80%',
    height: "10%",
    backgroundColor:"#f2f2f2",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },

infosProfile: {
    marginBottom: "4%",
    justifyContent: "center",
    alignItems: "center"
  },

  cardLogo:{
    width:30,
    height:30,
    right:"220%"
    
  },

  cardLogoClock:{
    width:30,
    height:30,
    right:"210%"
    
  },

  cardLogoRelation:{
    width:30,
    height:30,
    right:"155%"
    
  }
});
