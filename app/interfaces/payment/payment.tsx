interface Payment {
  id: number;
  name: string;
  nameCode: string;
  logo: string;
  platform: string;
  fee: number;
}

interface PaymentStore {
  channel_id: number;
  payment_code: string;
  name: string;
  email: string;
  club: string;
  date: string;
  phone: string;
  detail_address: string;
  size_xl: number;
  size_s: number;
  size_m: number;
  size_l: number;
  size_2xl: number;
  size_3xl: number;
  size_4xl: number;
  size_5xl: number;
  size_6xl: number;
  size_7xl: number;
}