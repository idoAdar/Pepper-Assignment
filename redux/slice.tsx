import {createSlice} from '@reduxjs/toolkit';
import {ContactType, UserType} from '../types/interfaces';

interface RootStateApp {
  isAuth: boolean;
  credentials: UserType | null;
  contacts: ContactType[] | [];
  selectedContact: ContactType | null;
  isLoading: boolean;
  bottomSheet: string | null;
}

const initialState: RootStateApp = {
  isAuth: false,
  credentials: null,
  contacts: [],
  selectedContact: null,
  isLoading: false,
  bottomSheet: null,
};

export const pepperSlice = createSlice({
  name: 'pepperSlice',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const {user, isAuth} = action.payload;
      state.credentials = user;
      state.isAuth = isAuth;
      state.isLoading = false;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
      state.isLoading = false;
    },
    addNewContact: (state, action) => {
      const copyContacts = [...state.contacts];
      copyContacts.unshift(action.payload);
      state.contacts = copyContacts;
      state.bottomSheet = null;
    },
    updateContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    setBottomSheet: (state, action) => {
      state.bottomSheet = action.payload;
    },
    setSpinner: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setAuth,
  setContacts,
  updateContact,
  setBottomSheet,
  addNewContact,
  setSpinner,
} = pepperSlice.actions;

export default pepperSlice.reducer;
