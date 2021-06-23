import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Card, Avatar} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import DbHelper from '../DbHelper';
import UpdateBookDialog from '../components/dialogs/UpdateBookDialog';
import {COLORS} from '../components/ui/constants';
import {ScrollView} from 'react-native-gesture-handler';

var db = openDatabase({name: 'UserDatabase.db'});

const ViewAllBooks = ({navigation}) => {
  const [allBooks, setAllBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookForEdit, setBookForEdit] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      getAllBooks();
      return () => {};
    }, []),
  );

  const getAllBooks = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_book', [], (tx, results) => {
        let temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setAllBooks(temp);
      });
    });
  };

  const bookCards = allBooks.map(book => (
    <Card style={styles.bookCard} key={book.book_id}>
      <Card.Title
        title={book.book_title}
        subtitle={`By: ${book.book_author}`}
      />
      <Card.Actions style={{justifyContent: 'space-evenly'}}>
        <Button
          style={styles.cardAction}
          color={COLORS.cardAction}
          icon="pencil"
          onPress={() => prepareForEditBook(book)}
        />
        <Button
          style={styles.cardAction}
          color={COLORS.cardAction}
          icon="trash-can"
          onPress={() => {
            DbHelper.deleteItemById(
              'table_book',
              'book_id',
              book.book_id,
              book.book_title,
            );
            getAllBooks();
          }}
        />
      </Card.Actions>
    </Card>
  ));

  const prepareForEditBook = book => {
    setBookForEdit(book);
    setModalVisible(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewBook');
          }}
          style={styles.roundButton}>
          <Avatar.Icon
            backgroundColor={COLORS.cardAction}
            size={55}
            icon="plus"
          />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {bookCards}
        </ScrollView>
        <UpdateBookDialog
          book={bookForEdit}
          modalVisible={modalVisible}
          getAllBooks={getAllBooks}
          setModalVisible={setModalVisible}
        />
      </View>
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
  background: {
    backgroundColor: COLORS.mainBackground,
    height: '100%',
    width: '100%',
  },
  bookCard: {
    width: '47.5%',
    height: 120,
    marginBottom: '5%',
    borderRadius: 20,
    // backgroundColor: 'rgba(255,255,255,0.9)'
    opacity: 0.98,
  },
  roundButton: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 10,
    width: 50,
    height: 50,
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  cardAction: {},
});

export default ViewAllBooks;
