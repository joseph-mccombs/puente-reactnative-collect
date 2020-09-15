import React, { useState } from 'react';
import {
  Text, View
} from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import getTasks from '../../services/tasky';
import { retrieveSignOutFunction } from '../../services/parse/auth';

import { deleteData } from '../../modules/async-storage';
import { layout } from '../../modules/theme';

import Header from '../../components/Header';

const HomeScreen = (props) => {
  const [tasks, setTasks] = useState(null);
  const { navigation } = props;

  const showTasks = async () => {
    await getTasks().then((result) => {
      setTasks(result);
    });
  };
  const logOut = () => {
    retrieveSignOutFunction().then(() => {
      deleteData('credentials');
      deleteData('pincode');
      navigation.navigate('Sign In');
    });
  };
  return (
    <View style={layout.screenContainer}>
      <Header />
      <ScrollView>
        <View style={layout.screenRow}>
          <Button onPress={showTasks} mode="contained">
            <Text>Tasks</Text>
          </Button>

          {tasks != null
            && tasks.map((task) => (
              <View key={task.task_id}>
                <Text>{task.name}</Text>
              </View>
            ))}
        </View>
        <Button onPress={logOut} mode="contained">
          <Text>Log Out</Text>
        </Button>
        <View style={layout.screenRow}>
          <Text>My Pinned Forms</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
