import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ToastAndroid,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Mytextinput from '../components/ui/Mytextinput';
import {Avatar} from 'react-native-paper';
import {COLORS} from '../components/ui/constants';
import DbHelper from '../DbHelper';

const NewBook = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setAuthor('');
      setTitle('');
      return () => {};
    }, []),
  );

  const createNewBook = () => {
    if (!title.length || !author.length) {
      ToastAndroid.showWithGravity(
        'Please fill all fields',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    } else {
      DbHelper.createNewBook(title, author);
      navigation.navigate('AllBooks');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.background}>
        <View style={styles.centeredView}>
          <View style={{flex: 1}}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
              <Text style={styles.title}>Fill the BookShelf</Text>
              <View>
                <Image
                  style={{
                    height: 160,
                    width: 230,
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                  source={require('../../assets/images/books.png')}
                />
              </View>
              <Mytextinput
                placeholder="Enter book title"
                onChangeText={title => setTitle(title)}
                value={title}
              />
              <Mytextinput
                placeholder="Enter author"
                onChangeText={author => setAuthor(author)}
                maxLength={10}
                value={author}
              />
              <TouchableOpacity
                style={styles.roundButton}
                onPress={createNewBook}>
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
  buttonOpen: {
    marginRight: 40,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default NewBook;
