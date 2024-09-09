import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StockProps } from "@/app/utils";

const initialState: StockProps[] = [];

export const stocksSlice = createSlice({
  name: "stocks",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<StockProps>) => {
      const stock = action.payload;
      const index = state.findIndex((s) => s.symbol === stock.symbol);
      if (index < 0) {
        state.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter((stock) => stock.symbol !== action.payload);
    },
  },
});

export const { add, remove } = stocksSlice.actions;

export default stocksSlice.reducer;
