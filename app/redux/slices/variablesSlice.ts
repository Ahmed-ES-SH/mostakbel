import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VariablesState {
  width: number;
  showSidebar: boolean;
  showUserButton: boolean;
  logoSrc: string;
}

const initialState: VariablesState = {
  width: 0,
  showSidebar: true,
  showUserButton: false,
  logoSrc: "/logo.png",
};

const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },

    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
    setShowUserButton: (state, action: PayloadAction<boolean>) => {
      state.showUserButton = action.payload;
    },
    setLogoSrc: (state, action: PayloadAction<string>) => {
      state.logoSrc = action.payload;
    },
  },
});

export const { setWidth, setShowSidebar, setLogoSrc, setShowUserButton } =
  variablesSlice.actions;

export default variablesSlice.reducer;
