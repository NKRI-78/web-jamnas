import axios from 'axios';
import Swal from "sweetalert2";

export const fetchClubList = async () => {
  try {
    const response = await axios.get('http://localhost:3222/api/v1/club/list');
    const data = response.data.data;
    return data;
  } catch (e: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: e?.response?.data?.message || e.message,
      timer: 2000,
      showConfirmButton: false,
    });
  }
};
