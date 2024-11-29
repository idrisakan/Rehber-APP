import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ADDCONTACT, CONTACTDETAİL, CONTACTLIST, GROUPS} from '../utils/routes';
import ContactList from '../screens/contacts';
import ContactDetail from '../screens/contacts/contactDetail';
import AddContact from '../screens/contacts/addContact';
import Groups from '../screens/groups';
import {Add} from 'iconsax-react-native';
import Colors from '../theme/colors';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen options={{
       headerShown: false,
      }} name={GROUPS} component={Groups} />
      <Stack.Screen
        options={({route, navigation}) => ({
          headerShown: true,
          headerRight: props => {
           
            return (
              <Add
                size={30}
                color={Colors.BLUE}
                onPress={() => navigation.navigate(ADDCONTACT,{group_id: route.params.item.id})}
              />
            );
          },
        })}
        name={CONTACTLIST}
        component={ContactList}
      />
      <Stack.Screen name={CONTACTDETAİL} component={ContactDetail} />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={ADDCONTACT}
        component={AddContact}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
