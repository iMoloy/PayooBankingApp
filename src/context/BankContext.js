// context/BankContext.js
"use client";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const router = useRouter();
  const [balance, setBalance] = useState(45000);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Electricity Bill", time: "Today 01:44 AM", type: "debit" },
    { id: 2, title: "Bank Deposit", time: "Today 01:44 AM", type: "credit" },
  ]);

  // Default credentials[cite: 1]
  const defaultNumber = "01234567890";
  const defaultPin = "1234";

  const login = (phone, pin) => {
    // Checking against default credentials[cite: 1]
    if (phone === defaultNumber && pin === defaultPin) {
      setIsAuthenticated(true);
      toast.success("Login Successful!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid phone or PIN!");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push("/");
  };

  const processTransaction = (amount, pin, title, type) => {
    if (pin !== defaultPin) {
      toast.error("Incorrect security PIN!");
      return false;
    }

    const value = parseFloat(amount);
    if (type === "debit" && value > balance) {
      toast.error("Insufficient balance!");
      return false;
    }

    setBalance((prev) => (type === "credit" ? prev + value : prev - value));

    const record = {
      id: Date.now(),
      title,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      type,
    };

    setTransactions((prev) => [record, ...prev]);
    toast.success(`${title} successful!`);
    return true;
  };

  return (
    <BankContext.Provider
      value={{
        balance,
        transactions,
        isAuthenticated,
        login,
        logout,
        processTransaction,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
