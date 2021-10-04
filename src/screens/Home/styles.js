import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  covidStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
    backgroundColor: colors.RED,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  covidStatusText: {
    fontSize: 14,
    color: colors.WHITE,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  titleLocationText: {
    fontSize: 24,
    color: colors.PRIMARY,
    textTransform: 'uppercase',
  },
  titleGreetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleGreetingText: {
    fontSize: 24,
    marginLeft: 10,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  titleLeftContainer: {},
  titleRightContainer: {},
  weatherText: {
    fontSize: 28,
    color: colors.PRIMARY,
  },
  calendarContainer: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  calendarText: {
    fontSize: 20,
    color: colors.PRIMARY,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  bookingContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default styles;
