//import liraries
import React, {Component} from 'react';
import {View, Button} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {Formik} from 'formik';
import {Input} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import { updateList } from '../../store/slices/contactsSlice';

const db = SQLite.openDatabase({
  name: 'myDataBase',
});

// create a component
const AddContact = ({route}) => {
  const group_id = route?.params?.group_id;
  const dispatch = useDispatch();
  const addNewPerson = person => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO persons (name,surname,phone,email,address,company,group_id) VALUES (?,?,?,?,?,?,?)',
        [
          person.name,
          person.surname,
          person.phone,
          person.email,
          person.address,
          person.company,
          group_id,
        ],
        (sqlTxn, res) => 
          dispatch(updateList()),
          console.log('kişi eklendi'),
        
        error => console.log('Hata', error.message),
      );
    });
  };
  return (
    <View style={defaultScreenStyle.container}>
      <Formik
        initialValues={{
          name: 'İdris',
          surname: 'Akan',
          phone: '123 123456',
          email: 'idoo@gmail.com',
          address: 'adana',
          company: 'udemig',
        }}
        onSubmit={values => addNewPerson(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <Input
              size="large"
              style={{marginVertical: 10}}
              placeholder="İsim Ekle"
              label={'isim'}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              placeholder="Soyadı Ekle"
              label={'Soyadı'}
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              placeholder="Telefon Ekle"
              label={'Telefon'}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              placeholder="E-posta Ekle"
              label={'E-posta'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              placeholder="Adres Ekle"
              label={'Adres'}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              placeholder="Şirket Ekle"
              label={'Şirket'}
              onChangeText={handleChange('company')}
              onBlur={handleBlur('company')}
              value={values.company}
            />

            <Button onPress={handleSubmit} title="Kaydet" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddContact;
