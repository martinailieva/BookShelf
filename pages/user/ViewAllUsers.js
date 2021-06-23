import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card, Avatar} from 'react-native-paper';
import {COLORS} from '../components/ui/constants';
import UpdateUserDialog from '../components/dialogs/UpdateUserDialog';
import {openDatabase} from 'react-native-sqlite-storage';
import DbHelper from '../DbHelper';

const db = openDatabase({name: 'UserDatabase.db'});

const ViewAllUsers = ({navigation}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userForEdit, setUserForEdit] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      getAllUsers();
      return () => {};
    }, []),
  );
  const getAllUsers = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setAllUsers(temp);
      });
    });
  };

  const usersCards = allUsers.map(user => (
    <Card style={styles.usersCard} key={user.user_id}>
      <Card.Title
        title={user.user_name}
        subtitle={`Phone: ${user.user_contact}`}
      />
      <Card.Content>
        <Text>Address: {user.user_address}</Text>
      </Card.Content>
      <Card.Actions style={{justifyContent: 'space-evenly'}}>
        <Button
          color={COLORS.cardAction}
          onPress={() => prepareForEditUser(user)}
          icon="pencil"
        />
        <Button
          color={COLORS.cardAction}
          onPress={() => {
            DbHelper.deleteItemById(
              'table_user',
              'user_id',
              user.user_id,
              user.user_name,
            );
            getAllUsers();
          }}
          icon="trash-can"
        />
        <Button
          color={COLORS.cardAction}
          onPress={() => navigation.navigate('LoansByUser', {user: user})}
          icon="view-sequential"
        />
      </Card.Actions>
    </Card>
  ));

  const prepareForEditUser = user => {
    setUserForEdit(user);
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewUser');
        }}
        style={styles.roundButton}>
        <Avatar.Icon
          backgroundColor={COLORS.cardAction}
          size={55}
          icon="plus"
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {usersCards}
      </ScrollView>
      <UpdateUserDialog
        user={userForEdit}
        modalVisible={modalVisible}
        getAllUsers={getAllUsers}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  background:{
    backgroundColor: COLORS.mainBackground,
    height: '100%'
  },
  usersCard: {
    width: '47.5%',
    height: 160,
    marginBottom: '5%',
    borderRadius: 25,
    opacity: 0.98,
  },
  roundButton: {
    alignSelf: 'center',
    borderRadius: 50,
    margin: 10,
    width: 50,
    height: 50,
  },
});

export default ViewAllUsers;
