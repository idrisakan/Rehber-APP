//import liraries
import React, {Component} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {fullname} from '../../utils/functions';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {CONTACTDETAİL} from '../../utils/routes';

// create a component
const ContactItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACTDETAİL, {person: item})}
      style={{padding: 10, borderBottomWidth: 0.5, borderColor: Colors.GREY}}>
      <Text style={{fontSize: 20, fontWeight: '500'}}>
        {fullname(item.name, item.surname)}
      </Text>
    </Pressable>
  );
};

export default ContactItem;
