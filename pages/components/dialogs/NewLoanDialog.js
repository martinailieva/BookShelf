import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import DbHelper from '../../DbHelper';
import {Avatar} from 'react-native-paper';
import {COLORS} from '../../components/ui/constants';

const NewLoanDialog = props => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  let allBooks = [];
  props.books.map(book => {
    allBooks.push({id: book.book_id, name: book.book_title});
  });

  onSelectedItemsChange = selectedBooks => {
    setSelectedBooks(selectedBooks);
  };

  createNewLoan = () => {
    const currentdate = new Date();
    const currentDateTime =
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes().toString();

    selectedBooks.forEach(book => {
      DbHelper.createNewLoan(
        currentDateTime,
        book,
        props.user.user_id,
        props.user.user_name,
      );
    });
    props.getAllLoansForUser();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={props.toggleModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>New loan for {props.user.user_name}</Text>
          <View style={styles.multiselect}>
            <MultiSelect
              hideTags
              items={allBooks}
              uniqueKey="id"
              hideSubmitButton={true}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedBooks}
              selectText="Pick Books"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor={COLORS.formInput}
              selectedItemIconColor={COLORS.formInput}
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#CCC'}}
            />
          </View>
          <View style={styles.roundButton}>
            <TouchableOpacity
              style={styles.buttonOpen}
              onPress={() => {
                createNewLoan();
                props.toggleModalVisible();
              }}>
              <Avatar.Icon
                size={53}
                icon="check"
                backgroundColor={COLORS.check}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.toggleModalVisible();
              }}>
              <Avatar.Icon
                size={53}
                icon="close"
                backgroundColor={COLORS.close}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.screen}></View>
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
  title: {
    fontFamily: 'AbrilFatface-Regular',
    textAlign: 'center',
    color: COLORS.darkText,
    fontSize: 30,
  },
  modalContent: {
    marginTop: 150,
    margin: 30,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  multiselect: {
    borderRadius: 20,
    margin: 20,
    paddingBottom: 10,
    marginTop: 30,
  },
  buttonOpen: {
    marginRight: 40,
  },
  roundButton: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default NewLoanDialog;
