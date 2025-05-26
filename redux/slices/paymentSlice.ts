import { fetchPaymentList, storePayment } from "@lib/paymentService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchPaymentListAsync = createAsyncThunk('payment/list',
  async () => {
    const response = await fetchPaymentList();
    return response;
  }
);

export const StorePaymentAsync = createAsyncThunk('payment/store',
  async ({ payload }: { payload: PaymentStore }) => {
    const response = await storePayment(payload);
    return response;
  }
);

interface PaymentState {
  payments: Payment[];
  isLoading: boolean;
  selectedPayment: number;
  paymentCode: string;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  isLoading: false,
  selectedPayment: 0,
  paymentCode: "",
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments(state, action: PayloadAction<Payment[]>) {
      state.payments = action.payload;
    },
    setSelectedPayment(state, action: PayloadAction<Payment>) {
      state.selectedPayment = action.payload.id;
      state.paymentCode = action.payload.nameCode;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },    
  extraReducers: (builder) => {
    builder.addCase(fetchPaymentListAsync.fulfilled, (state, action) => {
      state.payments = action.payload;
    });
  },
});

export const { setIsLoading, setError, setPayments, setSelectedPayment  } = paymentSlice.actions;

export default paymentSlice.reducer;