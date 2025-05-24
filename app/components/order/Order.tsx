"use client";

import Link from "next/link";
import React, { useState } from "react";

const Order: React.FC = () => {

    // const clubs = [];
    
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
        setFormData({
        ...formData,
            sizes: { ...formData.sizes, [size]: value },
        });
    };

    return (
        <div className="min-h-screen bg-[url('/images/bg-texture.png')] bg-cover p-4 flex justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 p-6 md:p-10 w-full max-w-6xl grid md:grid-cols-2 gap-6">
                <div>
                    <div className="mb-8">    
                        <h2 className="text-3xl text-center font-bold mb-2 font-stencil text-[#222]">PRE ORDER FORM</h2>
                        <p className="text-sm text-center font-bold mb-2 text-black">Merchandise Produk Pengda HTCI DKI Jakarta</p>
                    </div>    

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="date" className="text-black font-bold">Date</label>
                            <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} className="w-full text-black text-black border my-2 p-2 rounded" placeholder="Date" />
                        </div>

                        <div className="flex gap-2">
                            <input type="text" name="name" onChange={handleChange} placeholder="Nama Sesuai ID" className="w-1/2 text-black border p-2 rounded" />
                            <select
                                name="club"
                                value={formData.club}
                                onChange={handleChange}
                                className="w-1/2 bg-white p-2 appearance-none rounded text-black"
                                >
                                <option value="">Pilih Club</option>
                                {/* {clubs.map((club) => (
                                    <option key={club.id} value={club.id}>
                                    {club.name}
                                    </option>
                                ))} */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-black font-bold">Alamat Email</label>
                            <input id="email" type="email" name="email" onChange={handleChange} placeholder="ex: myname@gmail.com" className="w-full text-black border my-2 p-2 rounded" />
                        </div>

                        <div>
                            <label htmlFor="address" className="text-black font-bold">Phone Number</label>
                            <input id="phone" type="tel" name="phone" onChange={handleChange} placeholder="+62" className="w-full text-black my-2 border p-2 rounded" />
                        </div>

                        <div>
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
                    <Link href="/checkout">
                        <button className="w-full bg-green-600 text-white py-3 font-bold rounded shadow hover:bg-green-700 transition">
                            BUY NOW!
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Order;