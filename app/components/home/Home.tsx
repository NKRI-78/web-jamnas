"use client";

import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[url('/images/bg-texture.png')] bg-cover bg-center flex flex-col items-center justify-center p-4">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl">
        <div className="flex-1 text-center md:text-left">
          <img src="/images/jambore-logo.png" alt="Jambore Nasional 2025" className="mx-auto md:mx-0 w-80 mb-4" />
          <div className="flex justify-center md:justify-start gap-4">
            <img src="/images/motorbike.png" alt="Motorbike Prize" className="w-28" />
            <img src="/images/car.png" alt="Car Prize" className="w-44" />
          </div>
          <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded font-bold">
            OUR DOOR PRIZE
          </button>
        </div>

        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">OUR SPONSORSHIP</h2>
          <div className="grid grid-cols-5 gap-3 justify-items-center">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-black/60 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="font-stencil text-lg mb-2">CLICK BUTTON BELOW FOR MERCH</p>
        <Link href="/order">
          <button className="bg-green-600 text-white text-xl font-bold px-6 py-3 rounded shadow hover:bg-green-700 transition">
            ORDER NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;