import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthState,User } from "../../utils/types";

const accessToken = sessionStorage.getItem("ytc-access-token");
const userString = sessionStorage.getItem("ytc-user");
const user = userString ? JSON.parse(userString) : null;

const initialState: AuthState = {
  accessToken:accessToken || null,
  user:user || null,
  loading: false,
};

export const login = createAsyncThunk("auth/login", async (_, { dispatch }) => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

    const res = await signInWithPopup(auth, provider);
    console.log(res);

    const credential = GoogleAuthProvider.credentialFromResult(res);
    console.log(credential)

    if (credential && credential.accessToken) {
      const profile: User = {
        name: res.user?.displayName || "",
        photoURL: res.user?.photoURL || "",
      };

      sessionStorage.setItem("ytc-access-token", credential?.accessToken);
      sessionStorage.setItem("ytc-user", JSON.stringify(profile));

      dispatch(loginSuccess(credential.accessToken));
      dispatch(loadProfile(profile));
    }
  } catch (error) {
    console.log((error as Error).message);
    dispatch(loginFail((error as Error).message));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.loading = false;
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

export const { loginRequest, loginSuccess, loginFail, loadProfile, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const selectAuthState = (state: RootState) => state.auth;
