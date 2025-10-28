import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VariablesState {
  width: number;
}

const initialState: VariablesState = {
  width: 0,
};

const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
  },
});

export const { setWidth } = variablesSlice.actions;

export default variablesSlice.reducer;
