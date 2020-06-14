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


  viewEnd: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },


  footer: {
    width: "100%",
    height: '10%',
    backgroundColor: "#65a7ed",
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    width: "100%",
    height: '15%',
    backgroundColor: "#65a7ed",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    width: "95%",
    height: "10%",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: "3%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  historyCard: {
    width: "95%",
    height: "20%",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: "3%",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },


  end: {
    width: '70%',
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },

  endRow: {
    width: '45%',
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    margin: 10

  },

  infosProfile: {
    marginBottom: "4%",
    justifyContent: "center",
    alignItems: "center"
  },

  cardLogo: {
    width: 30,
    height: 30,
    right: "220%"

  },

  cardLogoClock: {
    width: 30,
    height: 30,
    right: "210%"

  },

  cardLogoRelation: {
    width: 30,
    height: 30,
    right: "155%"

  },

  container: {
    flex: 1,
    justifyContent: "center"
  },

  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",

  },


  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",

  },

  title: {
    fontSize: 20,
    marginBottom: "1%",
    textAlign: 'center'
  },

  line: {
    height: 2,
    width: "30%",
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: "10%",

  },

  description: {
    width: "90%",
    textAlign: "justify"
  },


  cercle: { 
		height: 90, 
		width: 90, 
    backgroundColor: "blue",
    borderColor:"white",
    borderRadius: 90/2,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  	}

});
