// store/slices/userSlice.ts
import { instance } from "@/app/_helpers/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Gender = "male" | "female";
type AccountType = "user" | "admin";
type Role = "user" | "admin";

export interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  id_number: string;
  gender: Gender;
  account_type: AccountType;
  role: Role;
  birth_date: string | null;
  country: string | null;
  image: any;
  status: any;
  email_verification_token: string | null;
  email_verified_at: string | null;
  failed_attempts: number;
  is_signed: number;
  last_login_at: string | null;
  social_id: string | null;
  social_type: string | null;
  password: null | string;
  created_at: string;
  updated_at: string;
}

interface UserState {
  user: UserType | null;
  userState: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  userState: false,
  loading: true,
  error: null,
};

// Async thunk to fetch current user
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/current-user");
      return {
        user: res.data.data,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    setUserState(state, action) {
      state.userState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setUser, setUserState, clearUser } = userSlice.actions;
export default userSlice.reducer;
