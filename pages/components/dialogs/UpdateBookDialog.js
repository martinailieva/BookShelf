import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {COLORS} from '../ui/constants';
import DbHelper from '../../DbHelper';
import Mytextinput from '../ui/Mytextinput';

const UpdateBookDialog = props => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');

  useEffect(() => {
    setBookTitle(props.book.book_title);
    setBookAuthor(props.book.book_author);
  }, [props.book]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          props.setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/book.png')}
            />
            <Mytextinput
              placeholder="Enter title"
              onChangeText={bookTitle => setBookTitle(bookTitle)}
              value={bookTitle}
            />
            <Mytextinput
              placeholder="Enter author"
              onChangeText={bookAuthor => setBookAuthor(bookAuthor)}
              value={bookAuthor}
            />
            <View style={styles.roundButton}>
              <TouchableOpacity
                style={styles.buttonOpen}
                onPress={() => {
                  DbHelper.editBook(props.book.book_id, bookTitle, bookAuthor);
                  props.getAllBooks();
                  props.setModalVisible(!props.modalVisible);
                }}>
                <Avatar.Icon
                  size={53}
                  icon="check"
                  backgroundColor={COLORS.check}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setBookAuthor(props.book.book_author);
                  setBookTitle(props.book.book_title);
                  props.setModalVisible(false);
                }}>
                <Avatar.Icon
                  size={53}
                  icon="close"
                  backgroundColor={COLORS.close}
                />
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
    width: 60,
    height: 60,
  },
  roundButton: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 30,
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
  buttonOpen: {
    marginRight: 40,
  },
});

export default UpdateBookDialog;
