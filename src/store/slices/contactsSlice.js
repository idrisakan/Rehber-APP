import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    contacts: [],
    updateList:false
}
const contactsSlice = createSlice({
    name:'contacts',
    initialState,
    reducers:{
        setContacts: (state,action) => {
            state.contacts = action.payload;
        },
        resetStore:(state,action) =>{
            state.contacts = []
            state.updateList= false
        },
        updateList:(state,action) =>{
            state.updateList = action.payload
        }
    }
})
export const {setContacts,resetStore, updateList} =contactsSlice.actions
export default contactsSlice.reducer