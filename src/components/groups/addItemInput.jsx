//import liraries
import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Colors from '../../theme/colors';

// create a component
const AddItemInput = ({changeText, newItem}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.GREY,
          padding: 10,
        }}>
        <TextInput
         placeholder="Yeni öğe ekle"
          value={newItem}
          style={{fontSize: 16}}
          onChangeText={text => changeText(text)}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    borderRadius: 5,
  },
});

//make this component available to the app
export default AddItemInput;
