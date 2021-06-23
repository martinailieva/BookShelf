import React from 'react';
import {View, TextInput} from 'react-native';
import {COLORS} from '../ui/constants';

const Mytextinput = props => {
  return (
    <View
      style={{
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        borderColor: COLORS.darkText,
        borderWidth: 1,
        width: 200,
        borderRadius: 5,
        paddingLeft: 10,
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor={COLORS.darkText}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};

export default Mytextinput;
