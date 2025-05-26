"use client";

import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchClubListAsync } from "@redux/slices/clubSlice";
import { saveOrder } from "@/redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { id } from "date-fns/locale";
import moment from "moment";

const Order: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clubs, isLoading, error } = useSelector((state: RootState) => state.club);
  const router = useRouter();

  const [formData, setFormData] = useState({
    date: "",
    name: "",
    club: "",
    email: "",
    phone: "",
    detailAddress: "",
    sizes: {
      S: 0, M: 0, L: 0, XL: 0, "2XL": 0, "3XL": 0, "4XL": 0, "5XL": 0, "6XL": 0, "7XL": 0,
    },
    dateOrigin: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (size: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [size]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { date, name, club, email, phone, detailAddress, sizes } = formData;

    if (!date || !name || !club || !email || !phone || !detailAddress) {
      Swal.fire({
        icon: "info",
        title: "Info",
        text: "Please fill in all the fields.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const totalQuantity = Object.values(sizes).reduce((sum, val) => sum + val, 0);
    if (totalQuantity === 0) {
      Swal.fire({
        icon: "info",
        title: "Info",
        text: "Please order at least one t-shirt size.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    dispatch(saveOrder(formData));
    router.push("/checkout");
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    const isoDate = moment(date).format("YYYY-MM-DD");
    setFormData((prev) => ({
      ...prev,
      date: isoDate,
      dateOrigin: isoDate,
    }));
  };

  useEffect(() => {
    dispatch(fetchClubListAsync());
  }, [dispatch]);

  if (isLoading) return <div className="text-center text-white">Loading clubs...</div>;
  if (error) return <div className="text-center text-red-500">Error loading clubs: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-[url('/images/bg-texture.png')] bg-cover p-4 flex justify-center items-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 p-4 sm:p-6 md:p-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl text-center font-bold mb-2 font-stencil text-[#222]">PRE ORDER FORM</h2>
              <p className="text-sm text-center font-bold mb-2 text-black">Merchandise Produk Pengda HTCI DKI Jakarta</p>
            </div>

            <div className="my-4 flex flex-col">
              <label htmlFor="date" className="text-black font-bold mb-2">Date</label>
              <DatePicker
                id="date"
                selected={formData.date ? new Date(formData.date) : null}
                onChange={handleDateChange}
                dateFormat="dd-MMMM-yyyy"
                locale={id}
                className="w-full text-black border p-2 rounded bg-white"
              />
            </div>

            <div className="my-4">
              <label className="text-black font-bold">Your Name & Club</label>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Nama Sesuai ID"
                  className="w-full sm:w-1/3 text-black border p-2 rounded"
                />
                <select
                  name="club"
                  value={formData.club}
                  onChange={handleChange}
                  className={`w-full sm:w-2/3 bg-white p-2 appearance-none rounded ${
                    formData.club === "" ? "text-gray-400" : "text-black"
                  }`}
                >
                  <option value="" disabled hidden>Pilih Club</option>
                  {Array.isArray(clubs) && clubs.length > 0 ? (
                    clubs.map((club) => (
                      <option key={club.no} value={club.club}>
                        {club.club}
                      </option>
                    ))
                  ) : (
                    <option disabled value="">
                      {isLoading ? "Loading clubs..." : "No clubs available"}
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="my-4">
              <label htmlFor="email" className="text-black font-bold">Alamat Email</label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="ex: myname@gmail.com"
                className="w-full text-black border my-2 p-2 rounded"
              />
            </div>

            <div className="my-4">
              <label htmlFor="phone" className="text-black font-bold">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                onChange={handleChange}
                placeholder="+62"
                className="w-full text-black my-2 border p-2 rounded"
              />
            </div>

            <div className="my-4">
              <label htmlFor="address" className="text-black font-bold">Detail Alamat Pengiriman</label>
              <textarea
                id="address"
                name="detailAddress"
                onChange={handleChange}
                className="w-full text-black h-24 border my-2 p-2 rounded resize-none"
              />
            </div>

            <p className="text-xs text-[#888]">
              Isi alamat dengan lengkap jika produk ingin dikirim. <br />
              Estimasi pengiriman 7 hari setelah PO ditutup. <br />
              Order bisa dilakukan dengan pengambilan langsung COD / J&T jika biaya ditanggung pembeli.
            </p>
          </div>

          {/* Right Section */}
          <div>
            <div className="flex justify-center md:justify-start mb-4">
              <img
                src="/images/t-shirt.png"
                alt="T-shirt front"
                className="w-full max-w-[300px] md:max-w-[450px] rounded"
              />
            </div>

            <h3 className="text-lg text-black font-bold text-start mb-2">T-Shirt JAMNAS 2025</h3>
            <p className="text-sm text-start font-bold mb-2 text-black">Cotton Combed 24s | Sablon Plastisol</p>

            <div className="grid grid-cols-2 gap-3 my-4">
              {Object.entries(formData.sizes).map(([size, val]) => (
                <div key={size} className="flex items-center justify-between p-2 rounded">
                  <label htmlFor={size} className="font-semibold text-black w-10">{size}</label>
                  <input
                    type="number"
                    min="0"
                    name={size}
                    id={size}
                    value={val}
                    onChange={(e) => handleSizeChange(size, parseInt(e.target.value))}
                    className="w-16 text-black p-1 rounded text-center"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 font-bold rounded shadow hover:bg-green-700 transition"
            >
              BUY NOW!
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Order;
