import React from "react";

const Checkout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[url('/images/bg-texture.png')] bg-cover bg-center p-8 text-black font-sans">
        
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">BILLING ORDER</h2>
                    <div className="flex justify-start mb-4">
                        <img src="/images/t-shirt.png" alt="Shirt Front" className="h-40" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <p>Date</p>
                            <p className="font-bold text-1xl">21 - JUNI - 2025</p> 
                        </div>
                        <div>
                            <p>Alamat Email</p>
                            <p className="font-bold text-1xl">caesario.steveboy@gmail.com</p> 
                        </div>
                        <div>
                            <p>Nama</p>
                            <p className="font-bold text-1xl">Caesario Steve</p> 
                        </div>
                        <div>
                            <p>Club</p>
                            <p className="font-bold text-1xl">CHTC</p> 
                        </div>
                        <div>
                            <p>Phone Number</p>
                            <p className="font-bold text-1xl">+62 8123456789</p> 
                        </div>
                        <div>
                            <p>Detail Address</p>
                            <p className="font-bold text-1xl">Sekretariat HTCI Pengda DKI
                                Jl. Kemang Raya No.9A,
                                Kemang Jakarta Selatan
                            </p> 
                        </div>
                        <div className="col-span-2 mt-4">
                            <p>Size Order</p>
                            <ul className="list-none">
                                <li className="font-bold">M - 12</li>
                                <li className="font-bold">L - 6</li>
                                <li className="font-bold">XL - 5</li>
                            </ul>
                        </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded shadow-lg">
                <h2 className="text-3xl font-bold mb-4">Payment</h2>

                <div className="bg-white border border-gray-300 rounded p-4 mb-4">
                    <div className="text-center">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-2xl font-bold text-green-700">Rp902.000</p>
                    <p className="text-xs text-gray-500 mt-1">Order ID #5eb55e88...</p>
                    <p className="text-xs text-red-500 mt-1">Choose within <span className="font-semibold">00:19:26</span></p>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <p className="text-sm font-semibold mb-2">Select Payment Method</p>
                    <div className="grid grid-cols-3 gap-2">
                    <img src="/gopay.png" alt="GoPay" className="h-6" />
                    <img src="/gopaylater.png" alt="GoPay Later" className="h-6" />
                    <img src="/qris.png" alt="QRIS" className="h-6" />
                    <img src="/mandiri.png" alt="Mandiri" className="h-6" />
                    <img src="/bni.png" alt="BNI" className="h-6" />
                    <img src="/bri.png" alt="BRI" className="h-6" />
                    <img src="/permata.png" alt="Permata" className="h-6" />
                    <img src="/linkaja.png" alt="LinkAja" className="h-6" />
                    <img src="/ovo.png" alt="OVO" className="h-6" />
                    <img src="/dana.png" alt="Dana" className="h-6" />
                    </div>
                </div>

                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold text-lg">
                    PAY NOW!
                </button>
                </div>
            </div>

        </div>
    )
}

export default Checkout;