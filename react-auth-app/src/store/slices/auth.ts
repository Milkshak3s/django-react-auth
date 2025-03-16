import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountResponse } from "../../types";
import { UserResponse } from "../../utils/types";

type State = {
  token: string | null;
  refreshToken: string | null;
  account: AccountResponse | null;
};

const initialState: State = { token: null, refreshToken: null, account: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: State,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
      if (state.account) {
        state.account = { ...state.account, refresh: action.payload.refreshToken, access: action.payload.token };
      } else {
        state.account = { refresh: action.payload.refreshToken, access: action.payload.token } as AccountResponse;
      }
    },
    setAccount(state: State, action: PayloadAction<AccountResponse>) {
      state.account = action.payload;
    },
    setUser(state: State, action: PayloadAction<UserResponse>) {
      if (state.account) {
        state.account.user = action.payload;
      } else {
        state.account = { user: action.payload } as AccountResponse;
      }
    },
    logout(state: State) {
      state.account = null;
      state.refreshToken = null;
      state.token = null;
    },
  },
});

export default authSlice;
