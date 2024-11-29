//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Button, FlatList} from 'react-native';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {TagUser} from 'iconsax-react-native';
import SQLite from 'react-native-sqlite-storage';
import ContactItem from '../../components/contacts/contactItem';
import {ADDCONTACT} from '../../utils/routes';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, setContacts } from '../../store/slices/contactsSlice';

const db = SQLite.openDatabase({
  name: 'myDataBase',
});

const ContactList = ({route, navigation}) => {
const {contacts,updateList} = useSelector(state => state.contacts)
  const {item} = route?.params;
const dispatch  = useDispatch()
  const getPersons = group_id => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM persons JOIN groups ON persons.group_id=groups.id WHERE groups.id=?',
        [group_id],
        (sqlTxn, response) => {
          let result = [];

          if (response?.rows?.length > 0) {
            for (let i = 0; i < response?.rows?.length; i++) {
              let item = response.rows.item(i);
              result.push(item);
            }
          }
         dispatch(setContacts(result))
        },
        error => console.log('Hata', error.message),
      );
    });
  };
  useEffect(() => {
    getPersons(item.id);
    CommonActions.setParams({group_id:item.id});
    return () => {
     dispatch(resetStore())
    };
  }, [updateList]);


  return (
    <SafeAreaView style={defaultScreenStyle.container}>
      <View style={{flex: 1, padding: 10}}>
        <Text style={{fontSize: 40, fontWeight: 'bold', marginVertical: 10}}>
          {item?.title}
        </Text>
        <FlatList
          ListEmptyComponent={
            <View
              style={{
                height: 600,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TagUser size="80" variant="Bold" color="#bbbb" />
              <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
                Kişi Bulunamadı
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#b2b2b2',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Kişi Eklemek için aşağıdaki buttonu kullanabilirsniz
              </Text>
              <Button
                title="Kişi Ekle"
                onPress={() =>
                  navigation.navigate(ADDCONTACT, {group_id: item.id})
                }
              />
            </View>
          }
          data={contacts}
          renderItem={({item}) => <ContactItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContactList;
