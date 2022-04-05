import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import History from '../../../components/UI/History';
import * as bookingAction from '../../../redux/actions/bookingAction';
import {useDispatch, useSelector} from 'react-redux';

const Index = props => {
  const dispatch = useDispatch();
  const bookingId = props.route.params;
  const fetchHistory = async bookingId => {
    await dispatch(bookingAction.fetchAllHistory(bookingId));
  };

  useEffect(() => {
    fetchHistory(bookingId);
  }, []);

  const historyData = useSelector(state => state.booking?.historyData);
  console.log('History', historyData);

  return (
    <View style={styles.container}>
      {historyData?.length > 0 ? (
        <FlatList
          keyExtractor={item => item.id}
          data={historyData}
          renderItem={({item, index}) => {
            return <History props={props} item={item} index={index} />;
          }}
          style={{width: '90%'}}
        />
      ) : (
        <Text>No booking history found</Text>
      )}
    </View>
  );
};

export default Index;
