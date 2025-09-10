"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wpNumber: "",
    college: "",
    year: "",
    know: "",
    scNumber: "",
    password: "",
    image: "",
    otherCollege: "",
  });

  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const isManit = formData.college === "MANIT";
  const isOtherCollege = formData.college === "Other";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const {
      name,
      email,
      wpNumber,
      college,
      year,
      know,
      scNumber,
      password,
      image,
      otherCollege,
    } = formData;

    try {
      if (college === "MANIT" && scNumber && password) {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        // alert("MANIT user verified and registered!");
        toast.success("MANIT user verified and registered!");
        router.push("/Success"); // case sensitive to "Success" - by srijan
      } else if (college === "Other" && image) {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }),
        });

        const cloudData = await uploadRes.json();
        if (!cloudData?.url) throw new Error("Cloudinary upload failed");

        // Remove scNumber and password for non-MANIT users
        const { scNumber: _, password: __, ...otherUserData } = formData;
        const res = await axios.post("/api/register", {
          ...otherUserData,
          image: cloudData.url,
        });

        if (!res.data) throw new Error("User registration failed");
        // alert("User registered successfully!");
        toast.success("User registered successfully!");
        router.push("/Success");  //made "Success" instead of "success" as router is case specific in nextjs (- by srijan)
      } else {
        // alert("Incomplete data");
        toast.error("Incomplete data");
      }
    } catch (err) {
      // alert("Error: " + err.message);
      toast.error("Incorrect Credentials");
    } finally {
      setIsPending(false);
    }
  };



  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat relative "
      style={{
        backgroundImage: "url('bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >


      <img
        src="/robot.png"
        alt="Centered Mirrored"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-x-[-1] hidden sm:block fix "
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 md:w-32 md:h-32 bg-purple-700/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 md:w-48 md:h-48 bg-blue-700/20 rounded-full blur-3xl animate-pulse delay-100"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-purple-800/15 rounded-full blur-4xl animate-pulse delay-200"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 md:w-40 md:h-40 bg-blue-600/25 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-1/3 left-1/2 w-28 h-28 md:w-56 md:h-56 bg-indigo-700/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full overflow-hidden ">
        {/* Left Panel - No blur */}





        <div className=" relative w-full lg:w-[55%] p-6 md:p-12 flex flex-col justify-center text-white bg-black/60 
  lg:sticky lg:top-0 lg:h-screen pl-8">
          <img
            src="/MANIT.png"
            alt="Decoration 1"
            className="absolute  top-5 left-10 z-100  w-15 h-15 opacity-100 "
          />
          <img
            src="/logo.png"
            alt="Decoration"
            className="absolute 
    top-0 right-0       /* default for all screens */
    md:top-4 md:right-0 /* medium and up */
    lg:top-0 lg:right-8 /* large and up */
     md:w-36 lg:w-48 w-48 h-auto opacity-100 z-50 "
          />

          {/* Left panel content */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-center lg:justify-start mb-4">


            </div>

            <div className="text-center lg:text-left">
              <h1 className="text-white text-2xl md:text-5xl justify-center gap-5 px-6 text-center font-monsterbeast font-medium mt-20   mb-2">ROBOTICS CLUB</h1>
              <h2 className="text-white text-lg md:text-2xl font-monsterbeast justify-center gap-5 px-6 text-center mt-0 font-medium mb-6 md:mb-8">MANIT BHOPAL</h2>

              <div className="mb-6">
                <div className="text-white text-base md:text-lg mb-2 justify-center gap-5 px-6 text-center some-class text-xxl">PRESENTS</div>
                <div className=" .gradient-white-to-purple text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl md:text-5xl font-bold justify-center gap-5 px-6 text-center automata2">
                  AUTOMAX 4.0
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white text-black px-4 py-1 font-bold   w-fit poppins-light text-xl border2  ">About Automax</div>
          <div className="mb-6 md:mb-8 bg-black/40 border border-white/30 p-5 md:p-8  border2 max-w-160 ">

            <p className="text-white text-sm md:text-base leading-relaxed poppins-light   ">
              Join AutoMax 4.0 at MANIT Bhopal — a hands-on robotics workshop packed with live demos, real projects, and expert guidance. Learn to design, build, and program robots while connecting with top robotics enthusiasts.
            </p>
            <p className="text-white text-sm md:text-base mt-4 font-semibold poppins-light  ">
              Seats are limited — register now!
            </p>
          </div>

          <div className="space-y-4 mb-6 lg:mb-0 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 ">
              <div className="bg-white text-black px-4 py-1 font-bold text-sm  w-fit poppins-light border2  ">DATE</div>
              <div className="bg-gray-900 px-5 py-1  text-sm poppins-light border2  ">11 - 12 October</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0  ">
              <div className="bg-white text-black px-4 py-1 font-bold text-sm  w-fit poppins-light border2  ">VENUE</div>
              <div className="bg-gray-900 px-5 py-1 text-sm poppins-light border2  ">MANIT, Bhopal</div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form with translucent blurred background */}
        <div className="w-full lg:w-[45%] p-6 md:p-10 flex items-center justify-center bg-black/60 overflow-hidden">
          <div
            className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-xl shadow-xl border border-gray-700 p-7
    max-h-[88vh] overflow-y-auto "
          >
            <form onSubmit={handleSubmit} className="space-y-6 text-white">
              {/* Form fields here */}
              {/* Name */}
              <div>
                <label className="block text-white text-sm mb-2 ">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className=" poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className=" poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-white text-sm mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  name="wpNumber"
                  value={formData.wpNumber}
                  onChange={handleChange}
                  placeholder="WhatsApp Number"
                  className="poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-white text-sm mb-2">College/Institution</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                >
                  <option value="" className="bg-gray-800 poppins-light">
                    --Select College/Institution--
                  </option>
                  <option value="MANIT" className="bg-gray-800 poppins-light">
                    MANIT Bhopal
                  </option>
                  <option value="Other" className="bg-gray-800 poppins-light">
                    Other College/Institution
                  </option>
                </select>
              </div>

              {/* Scholar Number & Password for MANIT */}
              {isManit && (
                <>
                  <div>
                    <label className="block text-white text-sm mb-2">Scholar Number</label>
                    <input
                      type="text"
                      name="scNumber"
                      value={formData.scNumber}
                      onChange={handleChange}
                      placeholder="Scholar Number"
                      className="poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">ERP Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </>
              )}

              {/* Other College Name and Payment Screenshot Upload */}
              {isOtherCollege && (
                <>
                  <div>
                    <label className="block text-white text-sm mb-2">Your College/Institution Name</label>
                    <input
                      type="text"
                      name="otherCollege"
                      value={formData.otherCollege}
                      onChange={handleChange}
                      placeholder="College Name"
                      className="poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  <p className="text-gray-300 text-xs mb-2 poppins-light">Pay ₹199 and upload payment screenshot:</p>
                  <img
                    src="/ss-pay.jpeg"
                    alt="Payment QR"
                    className="poppins-light w-48 mx-auto my-2 rounded border border-gray-400"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="poppins-light w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-700 file:text-white hover:file:bg-purple-800 transition"
                  />
                </>
              )}

              {/* Year */}
              <div>
                <label className="block text-white text-sm mb-2">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                >
                  <option value="" className="bg-gray-800 poppins-light">
                    --Select Year--
                  </option>
                  <option value="1st" className="bg-gray-800 poppins-light">
                    1st Year
                  </option>
                  <option value="2nd" className="bg-gray-800 poppins-light">
                    2nd Year
                  </option>
                  <option value="3rd" className="bg-gray-800 poppins-light">
                    3rd Year
                  </option>
                  <option value="4th" className="bg-gray-800 poppins-light">
                    4th Year
                  </option>
                  <option value="school" className="bg-gray-800 poppins-light">
                    School Student
                  </option>
                </select>
              </div>

              {/* How did you know */}
              <div>
                <label className="block text-white text-sm mb-2">How did you hear about us?</label>
                <select
                  name="know"
                  value={formData.know}
                  onChange={handleChange}
                  className="poppins-light w-full px-4 py-3 bg-black/50 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                >
                  <option value="" className="bg-gray-800 poppins-light">
                    --Select an Option--
                  </option>
                  <option value="social-media" className="bg-gray-800 poppins-light">
                    Robotics Club MANIT Socials(Instagram,Linkedin etc)
                  </option>
                  <option value="friends" className="bg-gray-800 poppins-light">
                    Poster/Banners
                  </option>
                  <option value="college" className="bg-gray-800 poppins-light">
                    Through Your College/Institution
                  </option>
                  <option value="website" className="bg-gray-800 poppins-light">
                    Through Your Friend/Word of Mouth
                  </option>
                  <option value="other" className="bg-gray-800 poppins-light">
                    Other
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3 rounded text-white font-semibold transition transform duration-200
                  bg-gradient-to-r from-purple-600 to-pink-600
                  hover:from-purple-700 hover:to-pink-700
                  ${isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}

              >
                {isPending ? "Registering..." : "Register Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
