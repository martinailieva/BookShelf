import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Mytextinput from '../components/ui/Mytextinput';
import {COLORS} from '../components/ui/constants';
import DbHelper from '../DbHelper';

const NewUser = ({navigation}) => {
  const [userContact, setUserContact] = useState('');
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setUserName('');
        setUserContact('');
        setUserAddress('');
      };
    }, []),
  );

  const createNewUser = () => {
    if (!userName.length || !userContact.length || !userAddress.length) {
      ToastAndroid.showWithGravity(
        'Please fill all fields',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    } else {
      DbHelper.createNewUser(userName, userContact, userAddress);
      navigation.navigate('AllUsers');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.background}>
        <View style={styles.centeredView}>
          <View style={{flex: 1}}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
              <Text style={styles.title}>Create customer</Text>
              <Image
                style={styles.image}
                source={require('../../assets/images/laptop.png')}
              />
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={userName => setUserName(userName)}
                value={userName}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={userContact => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                value={userContact}
              />
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={userAddress => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={1}
                multiline={true}
                value={userAddress}
              />
              <TouchableOpacity
                style={styles.roundButton}
                onPress={createNewUser}>
                <Avatar.Icon
                  size={53}
                  icon="check"
                  backgroundColor={COLORS.check}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 22,
  },
  background: {
    backgroundColor: COLORS.lightBackground,
    height: '100%',
    width: '100%',
  },
  title: {
    fontFamily: 'AbrilFatface-Regular',
    alignSelf: 'center',
    fontSize: 30,
    color: COLORS.darkText,
    marginBottom: 20,
  },
  roundButton: {
    alignSelf: 'center',
    marginTop: 30,
  },
  image: {
    height: 200,
    width: 200,
    margin: 20,
  },
});

export default NewUser;
