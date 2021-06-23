import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Card, Switch} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import NewLoanDialog from '../components/dialogs/NewLoanDialog';
import {COLORS} from '../components/ui/constants';
import DbHelper from '../DbHelper';

const db = openDatabase({name: 'UserDatabase.db'});

const ViewLoansByUser = ({route}) => {
  const user = route.params.user;
  const [loans, setLoans] = useState([]);
  const [loansCardsArray, setLoansCardsArray] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState([false]);

  useEffect(() => {
    getAllLoansForUser();
    getAllBooks();
  }, [user]);

  useEffect(() => {
    fillLoansArrayWithCards();
  }, [loans]);

  const groupBy = (items, key) => {
    return items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {},
    );
  };

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

  const getAllLoansForUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT table_book.book_title as title, loan_date as date, loan_id as id, isActive as isActiveStatus FROM table_loan inner JOIN table_book ON table_book.book_id = table_loan.book_id INNER join table_user on table_user.user_id=table_loan.user_id WHERE table_user.user_id=(?)',
        [user.user_id],
        (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setLoans(groupBy(temp, 'date'));
        },
      );
    });
  };

  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const fillLoansArrayWithCards = () => {
    let temp = [];
    for (const key in loans) {
      const titlesArr = loans[key].map(child => child.title);
      const isLoanActive = loans[key][0].isActiveStatus;
      temp.push(
        <Card key={Math.random()} style={styles.card}>
          <Card.Title title={key} subtitle={'Books'} />
          <Card.Content>
            <Text>{titlesArr.join(', ')}</Text>
          </Card.Content>
          <Card.Actions style={{justifyContent: 'center'}}>
            <Text>{isLoanActive === 1 ? 'Deactivate' : 'Activate'}</Text>
            <Switch
              value={isLoanActive === 1 ? true : false}
              onValueChange={() => {
                DbHelper.toggleLoanStatus(isLoanActive === 1 ? 0 : 1, key);
                getAllLoansForUser();
              }}
            />
          </Card.Actions>
        </Card>,
      );
    }
    setLoansCardsArray(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <ScrollView>
          <NewLoanDialog
            user={user}
            books={allBooks}
            modalVisible={isModalVisible}
            getAllLoansForUser={getAllLoansForUser}
            toggleModalVisible={toggleModalVisible}
          />
          <Text style={styles.text}>
            {loansCardsArray.length ? `Loans for ${user.user_name}` : ''}
          </Text>
          {loansCardsArray.length ? (
            loansCardsArray
          ) : (
            <Text style={styles.noLoanText}>No loans for {user.user_name}</Text>
          )}
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.roundButton}>
            <Avatar.Icon
              backgroundColor={COLORS.cardAction}
              size={40}
              icon="plus"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  background: {
    backgroundColor: COLORS.mainBackground,
    height: '100%',
    width: '100%',
  },
  noLoanText: {
    fontFamily: 'AbrilFatface-Regular',
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.darkText,
    marginTop: 200,
  },
  text: {
    fontFamily: 'AbrilFatface-Regular',
    textAlign: 'center',
    fontSize: 30,
    color: COLORS.darkText,
    marginBottom: 10,
  },
  card: {
    margin: 6,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  roundButton: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 10,
    width: 50,
    height: 50,
  },
});

export default ViewLoansByUser;
