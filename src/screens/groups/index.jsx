//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Button, FlatList} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import GroupItem from '../../components/groups/groupsItem';
import AddItemInput from '../../components/groups/addItemInput';
import {useDispatch, useSelector} from 'react-redux';
import { setGroups } from '../../store/slices/groupsSlice';

const db = SQLite.openDatabase({
  name: 'myDataBase',
});

const Groups = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setAdd] = useState(false);
  const [newItem, setNewItem] = useState(null);
  const {groups} = useSelector(state => state.groups);
  const dispatch = useDispatch();

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT ,title VARCHAR(100))',
        [],
        (sqlTxn, res) => console.log('tablo oluşturuldu'),
        error => console.log('Hata', error.message),
      );
    });
  };

  const createPersonsTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS persons (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100),
          surname VARCHAR(100),
          phone VARCHAR(15),
          email VARCHAR(50),
          address VARCHAR(200),
          company VARCHAR(100),
          group_id INTEGER,
          FOREIGN KEY (group_id) REFERENCES groups(id)
        )`,
        [],
        () => console.log('Persons tablosu oluşturuldu'),
        error => console.error('Tablo oluşturma hatası:', error.message),
      );
    });
  };

  const getGroups = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM groups',
        [],
        (sqlTxn, response) => {
          let result = [];
          if (response?.rows?.length > 0) {
            for (let i = 0; i < response?.rows?.length; i++) {
              let item = response.rows.item(i);
              result.push(item);
            }
          }
          dispatch(setGroups(result))
        },
        error => console.log('Hata', error.message),
      );
    });
  };

  const addNewGroups = title => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO groups (title) VALUES (?)',
        [title],
        (sqlTxn, res) => getGroups(),
        error => console.log('Hata', error.message),
      );
    });
  };
  const deleteGroups = id => {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM groups WHERE id = ?',
        [id],
        (sqlTxn, res) => getGroups(),
        error => console.log('Hata', error.message),
      );
    });
  };

  const handleAddNewItem = () => {
    setAdd(!showAdd);
    if (showAdd && newItem) addNewGroups(newItem);
    setNewItem(null);
  };

  useEffect(() => {
    createTable();
    createPersonsTable();
    getGroups();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 10, flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            title={showDelete ? 'Tamam' : 'Düzenle'}
            onPress={() => setShowDelete(!showDelete)}
          />
          <Button title="Listeye Ekle" onPress={() => handleAddNewItem()} />
        </View>
        <Text style={{fontSize: 40, fontWeight: 'bold', marginVertical: 10}}>
          Liste
        </Text>
        <FlatList
          data={groups}
          ListFooterComponent={
            showAdd && <AddItemInput changeText={text => setNewItem(text)} />
          }
          renderItem={({item}) => (
            <GroupItem
              item={item}
              showDelete={showDelete}
              deleteItem={id => deleteGroups(id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Groups;
