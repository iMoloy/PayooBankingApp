// app/page.js
"use client";
import { useState, useContext } from "react";
import { BankContext } from "@/context/BankContext";
import { InputGroup, ActionButton } from "@/components/Shared";
import Image from "next/image";

export default function Login() {
  const { login } = useContext(BankContext);
  
  // Initial states are empty strings for better UX
  const [phone, setPhone] = useState(""); 
  const [pin, setPin] = useState("");

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-8 bg-[#F4F5F7]">
      <div className="mb-14 text-center">
        <Image 
          src="/Logo-full.png" 
          alt="Payoo Logo" 
          width={220} 
          height={80} 
          priority 
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>

      <div className="w-full bg-white p-8 rounded-[2.5rem] shadow-xl border border-white">
        <form onSubmit={(e) => { e.preventDefault(); login(phone, pin); }}>
          {/* Using placeholders instead of default values */}
          <InputGroup 
            label="Mobile Number" 
            type="text" 
            placeholder="Default: 01234567890" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            max="11" 
          />
          <InputGroup 
            label="4 Digit Pin" 
            type="password" 
            placeholder="Default: 1234" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
            max="4" 
          />
          <div className="mt-4">
            <ActionButton>Login</ActionButton>
          </div>
        </form>
      </div>
    </div>
  );
}