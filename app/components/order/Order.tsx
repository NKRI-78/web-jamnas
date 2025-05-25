"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchClubListAsync } from "@redux/slices/clubSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";
import { id } from "date-fns/locale";

import { saveOrder } from "@/redux/slices/orderSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const formatDateIndo = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return format(date, "dd-MMMM-yyyy", { locale: id }).toUpperCase();
};

const CustomDateInput = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    const [displayValue, setDisplayValue] = useState("");

    useEffect(() => {
        if (value) setDisplayValue(formatDateIndo(value));
    }, [value]);

    return (
        <div className="relative">
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 opacity-0 bg-red cursor-pointer z-10"
            />
            <input
                type="text"
                readOnly
                value={displayValue}
                placeholder="Pilih tanggal"
                className="w-full text-black border my-2 p-2 rounded bg-white"
            />
        </div>
    );
};

const Order: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { clubs, isLoading, error } = useSelector((state: RootState) => state.club);

    const router = useRouter();

    const [formData, setFormData] = useState({
        date: '',
        name: '',
        club: '',
        email: '',
        phone: '',
        address: '',
        sizes: {
            S: 0, M: 0, L: 0, XL: 0, '2XL': 0, '3XL': 0, '4XL': 0, '5XL': 0, '6XL': 0, '7XL': 0,
        },
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
        const { date, name, club, email, phone, address, sizes } = formData;

        if (!date || !name || !club || !email || !phone || !address) {
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

    useEffect(() => {
        dispatch(fetchClubListAsync());
    }, [dispatch]);

    if (isLoading) return <div className="text-center text-white">Loading clubs...</div>;
    if (error) return <div className="text-center text-red-500">Error loading clubs: {error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="min-h-screen bg-[url('/images/bg-texture.png')] bg-cover p-4 flex justify-center items-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 p-6 md:p-10 w-full max-w-6xl grid md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl text-center font-bold mb-2 font-stencil text-[#222]">PRE ORDER FORM</h2>
                            <p className="text-sm text-center font-bold mb-2 text-black">Merchandise Produk Pengda HTCI DKI Jakarta</p>
                        </div>

                        <div>
                            <div className="my-4">
                                <label htmlFor="date" className="text-black font-bold">Date</label>
                                <CustomDateInput
                                    value={formData.date}
                                    onChange={(val) => setFormData((prev) => ({ ...prev, date: val }))}
                                />
                            </div>

                            <div className="my-4">
                                <label className="text-black font-bold">Your Name & Club</label>
                                <div className="flex gap-2 mt-2">
                                    <input type="text" name="name" onChange={handleChange} placeholder="Nama Sesuai ID" className="w-1/3 text-black border p-2 rounded" />
                                    <select
                                        name="club"
                                        value={formData.club}
                                        onChange={handleChange}
                                        className="w-80 bg-white p-2 appearance-none rounded text-black"
                                    >
                                        <option value="">Pilih Club</option>
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
                                <input id="email" type="email" name="email" onChange={handleChange} placeholder="ex: myname@gmail.com" className="w-full text-black border my-2 p-2 rounded" />
                            </div>

                            <div className="my-4">
                                <label htmlFor="phone" className="text-black font-bold">Phone Number</label>
                                <input id="phone" type="tel" name="phone" onChange={handleChange} placeholder="+62" className="w-full text-black my-2 border p-2 rounded" />
                            </div>

                            <div className="my-4">
                                <label htmlFor="address" className="text-black font-bold">Detail Alamat Pengiriman</label>
                                <textarea id="address" name="address" onChange={handleChange} className="w-full text-black h-24 border my-2 p-2 rounded resize-none" />
                            </div>

                            <p className="text-xs text-[#888]">
                                Isi alamat dengan lengkap jika produk ingin dikirim. <br />
                                Estimasi pengiriman 7 hari setelah PO ditutup. <br />
                                Order bisa dilakukan dengan pengambilan langsung COD / J&T jika biaya ditanggung pembeli.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-start mb-4 gap-4">
                            <img src="/images/t-shirt.png" alt="T-shirt front" className="w-[450px] rounded" />
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
