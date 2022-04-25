import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// TYPE DECLARATION
export interface UserAuthorizations {
  authorizationKey: string;
  granted: boolean;
}
export interface UserState {
  userId: string | number;
  firstName: string;
  lastName: string;
  userGroup: string;
  userAuthorizations: UserAuthorizations[];
  id?: any;
}

// ASYNC CALL
export const asyncUpdateUser:any = createAsyncThunk( // UPDATE USER
	'user/asyncUpdateUser',
	async (payload:any) => {
    try {
      const res = await axios.patch(`http://localhost:8000/users/${payload.id}`,payload.data);
      const data = res.data;
      return data;
    } catch (err) {
      return err;
    }
	}
);

export const asyncGetUser:any = createAsyncThunk( // GET USER
	'user/asyncGetUser',
	async (payload:string) => {
    try {
      const {data} = await axios.get(`http://localhost:8000/users/${payload}`);
      return data;
    } catch (err) {
      return err;
    }
	}
);

// USER INITIAL STATE
const userInitialState: UserState = {
  userId: "",
  firstName: "",
  lastName: "",
  userGroup: "Operator",
  userAuthorizations: [
    {
      authorizationKey: "jumping",
      granted: false
    },
    {
      authorizationKey: "standing",
      granted: false
    },
    {
      authorizationKey: "sitting",
      granted: false
    },
    {
      authorizationKey: "running",
      granted: false
    },
  ]
};

// USER SLICE
export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    addFirstName:(state,{payload}) => {
      state.firstName = payload.firstName;
    },
    addLastName:(state,{payload}) => {
      state.lastName = payload.lastName;
    },
    updateUserAuth:(state,{payload}) => {
      state.userAuthorizations = payload.userAuthorizations;
    },
    updateUserGroup:(state,{payload}) => {
      state.userGroup = payload.userGroup;
    },
    cancel:(state) => {
      state.firstName = userInitialState.firstName;
      state.lastName = userInitialState.lastName;
      state.userId = userInitialState.userId;
      state.id = userInitialState.id;
      state.userGroup = userInitialState.userGroup;
      state.userAuthorizations = userInitialState.userAuthorizations;
    }
  },
  extraReducers(builder) {
    builder.addCase(asyncGetUser.fulfilled, (state,{payload}) => {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.userId = payload.userId;
      state.id = payload.id;
      state.userGroup = payload.userGroup;
      state.userAuthorizations = payload.userAuthorizations;
    });
    builder.addCase(asyncUpdateUser.fulfilled, (state,{payload}) => {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    });
  },
});

export const {addFirstName, addLastName, updateUserAuth, updateUserGroup, cancel} = userSlice.actions;
export default userSlice.reducer;
