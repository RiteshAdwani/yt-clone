import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {auth} from '../../firebase';
// import firebase from "firebase/app"; 

interface User {
  name: string;
  photoURL: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  accessToken: sessionStorage.getItem('ytc-access-token') || null,
  user: sessionStorage.getItem('ytc-user')
    ? JSON.parse(sessionStorage.getItem('ytc-user')!)
    : null,
  loading: false,
};

export const login = createAsyncThunk<void, void, { state: RootState }>(
  'auth/login',
  async ( _,{dispatch} ) => {
    try {
      // const auth = getAuth();
      const provider = new GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');

      const res = await signInWithPopup(auth, provider);
      console.log(res);
      
      // const credential = GoogleAuthProvider.credentialFromResult(res);

      // if (credential && credential.accessToken) {
      //   const profile: User = {
      //     name: res.user?.displayName || '',
      //     photoURL: res.user?.photoURL || '',
      //   };

      //   sessionStorage.setItem('ytc-access-token', credential.accessToken);
      //   sessionStorage.setItem('ytc-user', JSON.stringify(profile));

      //   dispatch(loginSuccess(credential.accessToken));
      //   dispatch(loadProfile(profile));
      // }
    } catch (error) {
      // console.log((error as Error).message);
      // dispatch(loginFail((error as Error).message));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.accessToken = null;
      state.loading = false;
      state.error = action.payload;
    },
    loadProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  loadProfile,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuthState = (state: RootState) => state.auth;
