
import  { StyleSheet }  from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  mapFrame: {
    flex: 1,
  },
  header: { 
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: "#FFFFFF",
    //marginBottom: -8,
    borderBottomColor: "#DEDEDE",
    borderStyle: "solid",
    borderBottomWidth: 1
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  blockContainer: {
    flex: 1,
    flexDirection: 'column',
  }
});
