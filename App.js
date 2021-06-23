import 'react-native-gesture-handler';
import {useEffect} from 'react';
import * as React from 'react';
import TabNavigation from './pages/components/TabNavigation';
import DbHelper from './pages/DbHelper';

const App = () => {
  useEffect(() => {
    DbHelper.createTableUser();
    DbHelper.createTableBook();
    DbHelper.createTableLoan();
  }, []);
  return <TabNavigation />;
};

export default App;
