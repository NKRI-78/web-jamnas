import axios from 'axios';

export const fetchClubList = async () => {
  try {
    const response = await axios.get('http://localhost:3131/api/v1/club/list');
    const data = response.data.data;
    return data;
  } catch (e: any) {
    console.log(`Club List ${e?.response?.data?.message || e.message}`)
  }
};
