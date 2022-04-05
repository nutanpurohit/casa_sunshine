import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../config/ResponsiveScreen';

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    // justifyContent: 'flex-start',
    backgroundColor: colors.WHITE,
    height: '95%',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    // height: '100%',
    marginBottom: '10%',
    justifyContent: 'flex-start',
  },
  modalContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    height: '30%',
    width: '90%',
    borderRadius: 10,
  },
  upcomingBookingsContainer: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  currentBookingsContainer: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  pastBookingsContainer: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  currentBookingsText: {
    fontSize: 24,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  upcomingBookingsText: {
    fontSize: 24,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  pastBookingsText: {
    fontSize: 24,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  navBarContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
  },
  scrollViewContainer: {
    height: '90%',
    width: '100%',
    backgroundColor: colors.WHITE,
  },
  addBookingButton: {
    position: 'absolute',
    borderRadius: 30,
    padding: 10,
    right: wp('5'),
    bottom: hp('2'),
    backgroundColor: colors.PRIMARY,
  },
  applyFilterButton: {
    flexDirection: 'row',
    marginBottom: '2%',
    padding: '3%',
    backgroundColor: colors.PRIMARY,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  applyFilterButtonText: {
    fontSize: 16,
    color: colors.WHITE,
    marginRight: 5,
  },
  modalButton: {
    flexDirection: 'row',
    marginBottom: '2%',
    padding: '3%',
    backgroundColor: colors.PRIMARY,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  navBarButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    paddingVertical: '3%',
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
    marginHorizontal: '1%',
  },
  navBarButtonText: {
    fontSize: 16,
    color: colors.WHITE,
  },
});

export default styles;
