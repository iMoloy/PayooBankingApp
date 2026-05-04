// src/components/Shared.js
"use client";
import Image from "next/image";

/**
 * Reusable Input Group Component
 * Matches the design from source 1 and image: rounded-full and bg-neutral-200[cite: 1, 5]
 */
export const InputGroup = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  max,
}) => (
  <div className="form-control mb-4 w-full">
    {/* Bold label text as seen in index.html[cite: 1] */}
    <label className="label">
      <span className="label-text font-bold text-neutral text-base">
        {label}
      </span>
    </label>

    {/* Input box with light gray background and full rounded corners[cite: 1, 5] */}
    <input
      type={type}
      placeholder={placeholder}
      className="input rounded-full bg-neutral-200 border-none h-12 px-6 focus:outline-none w-full text-neutral placeholder:text-gray-500"
      value={value}
      onChange={onChange}
      maxLength={max}
      required
    />
  </div>
);

/**
 * Reusable Action Button Component
 * Matches the specific dark blue brand color #080DC1 and rounded-full style[cite: 1, 5]
 */
export const ActionButton = ({ children, type = "submit", onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className="btn bg-[#080DC1] hover:bg-[#060aa3] text-white w-full rounded-full border-none h-12 text-lg font-bold shadow-md mt-4 transition-all"
  >
    {children}
  </button>
);

/**
 * Reusable Activity Card for Transaction History
 * Uses opt-1.png for icons as requested for the dashboard view
 */
export const ActivityCard = ({ title, time, type }) => (
  <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm mb-3">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center relative">
        {/* Using opt-1.png from public folder */}
        <Image src="/opt-1.png" alt="Transaction Icon" width={28} height={28} />
        <div
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${type === "credit" ? "bg-green-500" : "bg-orange-500"}`}
        ></div>
      </div>
      <div>
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-xs text-gray-400 font-medium">{time}</p>
      </div>
    </div>
    <button className="text-gray-300">
      <i className="fa-solid fa-ellipsis-vertical"></i>
    </button>
  </div>
);
