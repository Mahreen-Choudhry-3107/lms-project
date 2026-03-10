import React from "react";
import { assets } from "../../assets/assets";

export const Companies = () => {
  return (
    <div className="w-full py-16 bg-white relative overflow-hidden">
      {/* background */}
      <div className="absolute -top-10 left-10 w-24 h-24 bg-red-100 rotate-12 rounded-lg opacity-40"></div>
      <div className="absolute bottom-0 right-16 w-32 h-32 bg-red-200 rounded-xl opacity-30 -rotate-12"></div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-gray-500 text-lg mb-10">
          Trusted by learners working at top companies
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-70">
          <img
            src={assets.microsoft_logo}
            alt="microsoft"
            className="h-8 md:h-10 hover:scale-110 transition"
          />

          <img
            src={assets.walmart_logo}
            alt="walmart"
            className="h-8 md:h-10 hover:scale-110 transition"
          />

          <img
            src={assets.accenture_logo}
            alt="accenture"
            className="h-8 md:h-10 hover:scale-110 transition"
          />

          <img
            src={assets.adobe_logo}
            alt="adobe"
            className="h-8 md:h-10 hover:scale-110 transition"
          />

          <img
            src={assets.paypal_logo}
            alt="paypal"
            className="h-8 md:h-10 hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  );
};
