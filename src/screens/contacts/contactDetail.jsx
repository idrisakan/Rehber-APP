//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/constants';
import Colors from '../../theme/colors';
import { fullname, getInitial } from '../../utils/functions';

// create a component
const ContactDetail = ({route}) => {
  const person = route.params.person;
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          width: screenWidth,
          height: screenHeight * 0.4,
          backgroundColor: Colors.GREY,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: screenWidth * 0.6,
            height: screenWidth * 0.6,
            borderRadius: 1000,
            backgroundColor: Colors.DARK_GRAY,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize:75, color:Colors.WHITE,fontWeight:'bold'}}>{getInitial(person.name,person.surname)}</Text>
        </View>
        <Text style={{fontSize:30, color:Colors.WHITE,fontWeight:'bold', marginTop:20}}>{fullname(person.name,person.surname)}</Text>
      </View>
      <View style={{margin:10,padding:10, backgroundColor:Colors.WHITE}}>
        <Text style={{fontSize:18,fontWeight:'500', borderRadius:5}}>Telefon</Text>
        <Text style={{}}>{person.phone}</Text>
      </View>
      <View style={{margin:10,padding:10, backgroundColor:Colors.WHITE}}>
        <Text style={{fontSize:18,fontWeight:'500', borderRadius:5}}>E-posta</Text>
        <Text style={{}}>{person.email}</Text>
      </View>
      <View style={{margin:10,padding:10, backgroundColor:Colors.WHITE}}>
        <Text style={{fontSize:18,fontWeight:'500', borderRadius:5}}>Adres</Text>
        <Text style={{}}>{person.address}</Text>
      </View>
      <View style={{margin:10,padding:10, backgroundColor:Colors.WHITE}}>
        <Text style={{fontSize:18,fontWeight:'500', borderRadius:5}}>Şirket</Text>
        <Text style={{}}>{person.company}</Text>
      </View>
    </ScrollView>
  );
};

export default ContactDetail;
