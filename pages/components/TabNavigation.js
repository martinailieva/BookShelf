import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Avatar} from 'react-native-paper';
import ViewAllBooks from '../book/ViewAllBooks';
import NewBook from '../book/NewBook';
import NewUser from '../user/NewUser';
import ViewAllUsers from '../user/ViewAllUsers';
import ViewLoansByUser from '../loan/ViewLoansByUser';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';

const Stack = createStackNavigator();
function TabNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="AllUsers"
          component={ViewAllUsers}
        />
        <Stack.Screen
          name="AllBooks"
          component={ViewAllBooks}
        />
        <Stack.Screen
          name="NewUser"
          component={NewUser}
        />
        <Stack.Screen
          name="NewBook"
          component={NewBook}
        />
        <Stack.Screen
          name="LoansByUser"
          component={ViewLoansByUser}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigation;
