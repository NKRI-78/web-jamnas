import axios from 'axios';
import Swal from "sweetalert2";

export const fetchPaymentList = async () => {
  try {
    const response = await axios.get('https://api-jamnas-htci.langitdigital78.com/api/v1/payment/list');
    const data = response.data.data;
    return data;
  } catch (e: any) {
    console.log(`Payment List ${e?.response?.data?.message || e.message}`)
  }
};

export const storePayment = async (payload: PaymentStore) => {
  try {
    const response = await axios.post('https://api-jamnas-htci.langitidigital78.com/api/v1/payment/store', payload);
    const data = response.data.data
    return data;
  } catch (e: any) {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: e?.response?.data?.message || e.message,
      timer: 2000,
      showConfirmButton: false,
    });
  }
};