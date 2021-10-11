import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import * as agentAction from '../../redux/actions/agentAction';
import Agent from '../../components/UI/Agent';
import colors from '../../constants/colors';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllAgents = async () => {
    await dispatch(agentAction.allAgents());
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchAllAgents();
    });
    return unsubscribe;
  }, [props.navigation]);

  const agentData = useSelector(state => state.agent?.allAgentData);
  console.log('Agents', agentData);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={styles.container}>
        {agentData?.length > 0 ? (
          <FlatList
            data={agentData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <Agent props={props} item={item} index={index} />;
            }}
            style={{width: '90%'}}
          />
        ) : (
          <Text>No Agents Found</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddAgentScreen')}
        style={styles.addAgentButton}>
        <Ionicons name={'add'} size={35} color={'white'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
