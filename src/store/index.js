import {configureStore} from '@reduxjs/toolkit';
import groupsSlice from './slices/groupsSlice';
import contactsSlice from './slices/contactsSlice';


const store = configureStore({
  reducer: {
    groups: groupsSlice,
    contacts:contactsSlice
  },
});
export default store;
