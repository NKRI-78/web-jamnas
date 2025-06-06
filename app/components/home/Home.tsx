"use client";

import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[url('/images/bg-texture.png')] bg-cover bg-center flex flex-col items-center justify-center p-4">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl">

        <div className="flex-1 relative text-center block md:hidden">
          <img src="/images/jambore-logo.png" alt="Jambore Nasional 2025" className="mx-auto" />
          <img src="/images/mobile-our-door-prize.png" alt="Jambore Nasional 2025" className="mx-auto w-[280px] left-0 right-0 absolute bottom-[-80px]" />
        </div>

        <div className="flex-1 relative text-center md:block hidden">
          <img
            src="/images/jambore-logo.png"
            alt="Jambore Nasional 2025"
            className="w-[400px] mx-auto mb-4"
          />
          <img src="/images/mobile-our-door-prize.png" alt="Jambore Nasional 2025" className="mx-auto absolute w-[400px] bottom-[-60px] left-0 right-0" />
        </div>

        <div className="flex-1 text-center md:pt-0 pt-[80px]">
          <h2 className="text-2xl font-bold text-black mb-4">OUR SPONSORSHIP</h2>

          <div className="justify-items-center">
            <img src="/images/our-sponsorship.png" alt="Car Prize" className=""/>
          </div>
          
          <div className="my-10 text-center">
            <p className="font-stencil text-lg mb-2">CLICK BUTTON BELOW FOR MERCH</p>
            <Link href="/order">
              <button className="bg-green-600 text-white text-xl font-bold px-6 py-3 rounded shadow hover:bg-green-700 transition">
                ORDER NOW
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;