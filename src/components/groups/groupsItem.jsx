//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Colors from '../../theme/colors';
import {
  ArrowRight2,
  CloseCircle,
  People,
  Profile2User,
} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {ADDCONTACT, CONTACTLIST} from '../../utils/routes';
const db = SQLite.openDatabase({
  name: 'myDataBase',
});

// create a component
const GroupItem = ({item, showDelete, deleteItem}) => {
  const [personsCount, setpersonsCount] = useState(0);
  const navigation = useNavigation();

  const getPersons = group_id => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM persons JOIN groups ON persons.group_id=groups.id WHERE groups.id=?',
        [group_id],
        (sqlTxn, response) => {
          let result = [];
          setpersonsCount(response?.rows?.length);
        },
        error => console.log('Hata', error.message),
      );
    });
  };
  useEffect(() => {
    getPersons(item.id);
  }, []);
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate(CONTACTLIST, {item: item})}>
      {showDelete && (
        <View
          style={{
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CloseCircle
            size="24"
            color="#ff8a65"
            variant="Bold"
            onPress={() => deleteItem(item.id)}
          />
        </View>
      )}
      <View
        style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        {item.title == 'Tümü' ? (
          <People size="28" color={Colors.BLUE} />
        ) : (
          <Profile2User size="28" color={Colors.BLUE} />
        )}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.GREY,
        }}>
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>{item.title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: Colors.GREY}}>{personsCount}</Text>
          <ArrowRight2 size="32" color={Colors.BLUE} />
        </View>
      </View>
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },
});

//make this component available to the app
export default GroupItem;
