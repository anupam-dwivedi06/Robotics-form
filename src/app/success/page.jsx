"use client";
import Link from "next/link";
import toast from 'react-hot-toast';

const success = () => {
    // This toast is commented out, but if you uncomment it, it will show a toast notification.
    // toast.success("User registered successfully!");

  return (
    // Use flex-col for a single column on small screens and flex-row on larger screens
    // The min-h-screen ensures the container takes up the full height of the viewport
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212] text-white">

      {/* Left Panel */}
      {/* Use a fixed width on medium screens and larger, but let it take full width on small screens */}
      <div className="flex flex-1 items-center justify-center flex-col gap-4 p-8 text-center">
        <h1 className="text-4xl font-bold">🎉 Registration Successful!</h1>
        <p className="text-lg">Thank you for registering for the workshop.</p>
        <p>
          You have registered! and once we verify your application successfully, we'll send a confirmation email along with a unique to the email-id provided
        </p>
        <p>
           Meanwhile you can share this event poster provided below on you social media stories!
iske neeche ye wali photo aur uska download button
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>

      {/* Right Panel */}
      {/* This panel will take the remaining space and align its content to the center */}
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8">
        {/* The random string is likely a placeholder, but it was breaking the layout. Removed. */}
        {/* Heading for the poster section */}
        <h2 className="text-3xl font-bold mb-4">Workshop Poster</h2>
        
        {/* Poster Image Container */}
        <div className="w-full flex justify-center items-center">
          {/* The image height was fixed to a viewport width unit, which can be problematic.
              Using a more flexible height and max-width for better responsiveness. */}
          <img src="/automax-Recovered.png" alt="Workshop Poster" className="max-h-[70vh] w-auto max-w-full rounded-lg shadow-lg" />
        </div>

        {/* Download Button */}
        <a
          className="mt-4 px-12 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold text-lg text-center"
          href="/automax-Recovered.png"
          download
        >
          Download Poster
        </a>
      </div>
    </div>
  );
};

export default success;