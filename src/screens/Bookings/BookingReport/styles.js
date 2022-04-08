import { StyleSheet} from 'react-native';
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex:1,
    alignItems: 'center'
  },
  TouchableContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:colors.PRIMARY
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  imageStyle: {
    width: 25,
    height: 25,
    margin: 5,
    resizeMode: 'stretch',
  },
});

export default styles;
