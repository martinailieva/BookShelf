import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {COLORS} from './components/ui/constants';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.title}>BookShelf</Text>
        <Image
          style={styles.image}
          source={require('../assets/images/group.png')}
        />
        <View style={styles.roundButton}>
          <TouchableOpacity
            style={{marginRight: 40}}
            onPress={() => {
              navigation.navigate('AllUsers');
            }}>
            <Avatar.Icon
              size={55}
              icon="account-multiple"
              backgroundColor={COLORS.cardAction}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllBooks');
            }}>
            <Avatar.Icon
              size={55}
              icon="book-multiple"
              backgroundColor={COLORS.cardAction}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: COLORS.cardAction,
    fontSize: 30,
    fontFamily: 'AbrilFatface-Regular',
    marginTop: 30,
    paddingBottom: 120,
  },
  button: {
    margin: 10,
    paddingBottom: 500,
  },
  background: {
    backgroundColor: COLORS.lightBackground,
    height: '100%',
    width: '100%',
  },
  image: {
    height: 250,
    width: 300,
    alignSelf: 'center',
  },
  roundButton: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 120,
  },
});

export default HomeScreen;
