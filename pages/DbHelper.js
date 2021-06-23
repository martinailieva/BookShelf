import {ToastAndroid} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'UserDatabase.db'});

export default class DbHelper {
  static createTableUser() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }

  static createTableBook() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_book'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_book', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_book(book_id INTEGER PRIMARY KEY AUTOINCREMENT, book_title VARCHAR(30), book_author VARCHAR(30))',
              [],
            );
          }
        },
      );
    });
  }

  static createTableLoan() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_loan'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('PRAGMA foreign_keys=ON');
            txn.executeSql('DROP TABLE IF EXISTS table_loan', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_loan (loan_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,isActive INTEGER DEFAULT 1,loan_date TEXT,book_id INTEGER NOT NULL,user_id INTEGER not NULL, FOREIGN KEY (book_id) REFERENCES table_book (book_id), FOREIGN KEY (user_id) REFERENCES table_user (user_id))',
              [],
            );
          }
        },
      );
    });
  }

  static createNewUser(name, contact, address) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        [name, contact, address],

        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.showWithGravity(
              'User ' + name + ' created successfully!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            ToastAndroid.showWithGravity(
              'User creation failed',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          }
        },
      );
    });
  }

  static createNewBook(title, author) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_book (book_title, book_author) VALUES (?,?)',
        [title, author],

        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.showWithGravity(
              'Book ' + title + ' created successfully!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            ToastAndroid.showWithGravity(
              'Book creation failed',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          }
        },
      );
    });
  }
  static deleteItemById = (table_name, table_column, id, toastInfo) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ${table_name} WHERE ${table_column}=?`,
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.showWithGravity(
              toastInfo + ' has been deleted successfully!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            {
              ToastAndroid.showWithGravity(
                'Deletion has failed!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            }
          }
        },
      );
    });
  };

  static editUser(id, name, contact, address) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
        [name, contact, address, id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.showWithGravity(
              name + ' has been edited successfully!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            {
              ToastAndroid.showWithGravity(
                'Deletion has failed!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            }
          }
        },
      );
    });
  }

  static editBook(id, title, author) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_book set book_title=?, book_author=? where book_id=?',
        [title, author, id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.showWithGravity(
              title + ' has been edited successfully!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            {
              ToastAndroid.showWithGravity(
                'Edit has failed!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            }
          }
        },
      );
    });
  }

  static createNewLoan(date, bookId, userId, userName) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_loan (loan_date, book_id, user_id) VALUES (?,?,?)',
        [date, bookId, userId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.showWithGravity(
              'Loan for ' + userName + ' has been created successfully!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            ToastAndroid.showWithGravity(
              'Loan creation failed',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          }
        },
      );
    });
  }
  static toggleLoanStatus(status, date) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_loan set isActive=? where loan_date=?',
        [status, date],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.showWithGravity(
              `Loan has been ${
                status === 1 ? 'taken' : 'returned'
              } successfully!`,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            {
              ToastAndroid.showWithGravity(
                'Loan edit has failed!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            }
          }
        },
      );
    });
  }
}
