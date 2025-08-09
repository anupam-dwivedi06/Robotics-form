"use client";
import Link from "next/link";
import toast from 'react-hot-toast';

const SuccessPage = () => {
    toast.success("User registered successfully!")
  return (
    
    <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white flex-col gap-4">
      <h1 className="text-4xl font-bold">🎉 Registration Successful!</h1>
      <p className="text-lg">Thank you for registering for the workshop.</p>
      <Link
        href="/"
        className="mt-4 px-6 py-2 bg-indigo-600 rounded hover:bg-indigo-500"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
