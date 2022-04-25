import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {UserState} from './userSlice';
import axios from 'axios';

export interface Users{
  users: UserState[];
  error: string;
}

// ASYNC CALL
export const asyncGetUsers:any = createAsyncThunk( // GET USER
	'users/asyncGetUsers',
	async () => {
    try {
      const res = await axios.get('http://localhost:8000/users');
      const data = res.data;
      return data;
    } catch (err) {
      return err;
    }
	}
);

export const asyncSaveUser:any = createAsyncThunk( // ADD USER
	'users/asyncSaveUser',
	async (payload) => {
    try {
      const res = await axios.post('http://localhost:8000/users',payload);
      console.log(res)
    } catch (err) {
      return err;
    }
	}
);

const usersInitialState:Users = {
  users: [],
  error: ""
}

export const userListSlice = createSlice({
  name: 'userlist',
  initialState: usersInitialState,
  reducers: {
    addUser:(state,{payload}) => {
      state.users.push(payload.user);
    }
  },
  extraReducers(builder)  {
    builder.addCase(asyncGetUsers.fulfilled, (state,{payload}) => {
      state.users = payload;
    });
  },
});

export const {addUser} = userListSlice.actions;
export default userListSlice.reducer;