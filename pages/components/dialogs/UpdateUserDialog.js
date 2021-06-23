import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import DbHelper from '../../DbHelper';
import Mytextinput from '../ui/Mytextinput';

const UpdateUserDialog = props => {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    setUserName(props.user.user_name);
    setUserContact(props.user.user_contact);
    setUserAddress(props.user.user_address);
  }, [props.user]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/user.png')}
            />
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={userName => setUserName(userName)}
              value={userName}
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={userContact => setUserContact(userContact)}
              maxLength={10}
              keyboardType="numeric"
              value={userContact ? userContact.toString() : ''}
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Address"
              onChangeText={userAddress => setUserAddress(userAddress)}
              maxLength={225}
              numberOfLines={1}
              value={userAddress}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                DbHelper.editUser(
                  props.user.user_id,
                  userName,
                  userContact,
                  userAddress,
                );
                props.getAllUsers();
                props.setModalVisible(false);
              }}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                props.setModalVisible(false)}}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable> */}
            <View style={styles.roundButton}>
              <TouchableOpacity
                style={styles.buttonOpen}
                onPress={() => {
                  DbHelper.editUser(
                    props.user.user_id,
                    userName,
                    userContact,
                    userAddress,
                  );
                  props.getAllUsers();
                  props.setModalVisible(false);
                }}>
                <Avatar.Icon size={53} icon="check" backgroundColor="#D2F564" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setUserName(props.user.user_name);
                  setUserAddress(props.user.user_address);
                  setUserContact(props.user.user_contact);
                  props.setModalVisible(false);
                }}>
                <Avatar.Icon size={53} icon="close" backgroundColor="#FF5757" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  logo: {
    width: 65,
    height: 60,
    marginBottom: 30,
  },
  modalView: {
    margin: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    margin: 5,
  },
  roundButton: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 30,
  },
  buttonOpen: {
    marginRight: 40,
  },
  buttonClose: {
    backgroundColor: '#5900b3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default UpdateUserDialog;
