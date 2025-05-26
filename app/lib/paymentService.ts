import axios from 'axios';
import Swal from "sweetalert2";

export const fetchPaymentList = async () => {
  try {
    const response = await axios.get('http://localhost:3131/api/v1/payment/list');
    const data = response.data.data;
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

export const storePayment = async (payload: PaymentStore) => {
  try {
    const response = await axios.post('http://localhost:3131/api/v1/payment/store', payload);
    const data = response.data.data
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