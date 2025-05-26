import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Sizes {
  [key: string]: number;
}

interface OrderFormData {
  date: string;
  dateOrigin: string;
  name: string;
  club: string;
  email: string;
  phone: string;
  detailAddress: string;
  sizes: Sizes;
}

interface OrderState {
  data: OrderFormData | null;
}

const initialState: OrderState = {
  data: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveOrder(state, action: PayloadAction<OrderFormData>) {
      state.data = action.payload;
    },
    clearOrder(state) {
      state.data = null;
    },
  },
});

export const { saveOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
