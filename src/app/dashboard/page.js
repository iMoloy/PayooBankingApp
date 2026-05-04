// app/dashboard/page.js
"use client";
import { useState, useContext, useEffect } from "react";
import { BankContext } from "@/context/BankContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { InputGroup, ActionButton, ActivityCard } from "@/components/Shared";

export default function Dashboard() {
  const { balance, transactions, isAuthenticated, logout, processTransaction } =
    useContext(BankContext);
  const router = useRouter();
  const [view, setView] = useState("home");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (!isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  const handleSubmit = (title, type) => {
    if (processTransaction(amount, pin, title, type)) {
      setAmount("");
      setPin("");
      setAccount("");
      setView("home");
    }
  };

  // Internal Navigation Button using specific opt images
  const NavBtn = ({ id, label, imgSrc }) => (
    <button
      onClick={() => setView(id)}
      className={`flex flex-col items-center justify-center aspect-square p-2 border rounded-2xl transition-all ${view === id ? "bg-white border-blue-500 ring-1 ring-blue-500 shadow-md" : "bg-white border-gray-100 hover:bg-gray-50"}`}
    >
      <div className="relative w-8 h-8 mb-2">
        <Image src={imgSrc} alt={label} fill className="object-contain" />
      </div>
      <span
        className={`text-[10px] font-bold text-center leading-tight ${view === id ? "text-blue-600" : "text-gray-500"}`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] no-scrollbar overflow-y-auto">
      {/* Header section matching 'Home Page.png' using logo.png */}
      <header className="p-6 pt-10 flex justify-between items-start bg-white rounded-b-[2rem] shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            <Image
              src="/logo.png"
              alt="Logo Icon"
              fill
              className="object-contain drop-shadow-md"
            />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800">${balance}</h2>
            <p className="text-sm text-gray-400 font-medium">
              Available Balance
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Log Out
        </button>
      </header>

      <main className="px-6 pb-10">
        <section className="mb-8">
          <h1 className="text-2xl font-black text-gray-900 leading-tight">
            Welcome to Pay<span className="text-indigo-500">oo</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Simple and secure banking services.
          </p>
        </section>

        {/* Feature Grid using your opt-x images */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <NavBtn id="add" label="Add Money" imgSrc="/opt-1.png" />
          <NavBtn id="cash" label="Cashout" imgSrc="/opt-2.png" />
          <NavBtn id="send" label="Transfer Money" imgSrc="/opt-3.png" />
          <NavBtn id="bonus" label="Get Bonus" imgSrc="/opt-4.png" />
          <NavBtn id="bill" label="Pay Bill" imgSrc="/opt-5.png" />
          <NavBtn id="history" label="Transactions" imgSrc="/opt-6.png" />
        </div>

        {/* Conditional Content */}
        <div className="animate-in fade-in duration-300">
          {view === "home" && (
            <>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-black text-lg text-gray-800">
                  Latest Payment
                </h3>
                <button
                  onClick={() => setView("history")}
                  className="text-sm font-bold text-gray-400"
                >
                  View All
                </button>
              </div>
              {transactions.slice(0, 4).map((tx) => (
                <ActivityCard key={tx.id} {...tx} />
              ))}
            </>
          )}

          {["add", "cash", "send", "bill"].includes(view) && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white">
              <h3 className="font-black text-xl mb-6 uppercase tracking-widest">
                {view} Money
              </h3>
              <InputGroup
                label="Target Account"
                type="text"
                placeholder="Enter number"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
              <InputGroup
                label="Amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <InputGroup
                label="Pin Number"
                type="password"
                placeholder="****"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                max="4"
              />
              <div className="mt-4">
                <ActionButton
                  onClick={() =>
                    handleSubmit(
                      view.toUpperCase(),
                      view === "add" ? "credit" : "debit",
                    )
                  }
                >
                  Confirm
                </ActionButton>
              </div>
            </div>
          )}

          {view === "history" &&
            transactions.map((tx) => <ActivityCard key={tx.id} {...tx} />)}
        </div>
      </main>
    </div>
  );
}
