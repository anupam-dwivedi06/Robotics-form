"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./globals.css";

const Page = () => {
  const router = useRouter();
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
        alert("MANIT user verified and registered!");
      } else if (college === "Other" && image) {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }),
        });

        const cloudData = await uploadRes.json();
        if (!cloudData?.url) throw new Error("Cloudinary upload failed");

        const res = await axios.post("/api/register", {
          ...formData,
          image: cloudData.url,
        });

        if (!res.data) throw new Error("User registration failed");
        alert("User registered successfully!");
        router.push("/Success");
      } else {
        alert("Incomplete data");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsPending(false);
    }
  };

  const baseInputStyle =
    "w-full p-2 rounded-md bg-black/30 text-white text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500";

  return (
    <div className="animated-bg min-h-screen flex flex-col md:flex-row font-['Orbitron'] text-white">
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-10 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 drop-shadow-lg">
          Robotics Club
        </h1>
        <h2 className="text-xl md:text-3xl font-medium text-cyan-300 mt-2 mb-4">
          MANIT Bhopal
        </h2>
        <p className="max-w-lg text-sm md:text-base text-gray-300 leading-relaxed">
          Dive into the future with us. Learn, build, and innovate in a workshop
          designed for aspiring engineers and makers.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 md:px-12 py-10 z-10">
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-cyan-400/30 shadow-[0_0_20px_#00ffff44] animate-fadeIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-cyan-200">
            Register for the Workshop
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {[{ label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "WhatsApp Number", name: "wpNumber", type: "text" }].map(
              ({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">
                    {label}:
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className={baseInputStyle}
                    placeholder={label}
                  />
                </div>
              )
            )}

            {/* College */}
            <div>
              <label className="block text-sm font-medium mb-1">College/Institution</label>
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
                className={baseInputStyle}
              >
                <option value="">--Select your College/Institution--</option>
                <option value="MANIT">MANIT Bhopal</option>
                <option value="Other">Other College/Institution</option>
              </select>
            </div>

            {isManit && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Scholar Number:
                  </label>
                  <input
                    type="text"
                    name="scNumber"
                    value={formData.scNumber}
                    onChange={handleChange}
                    placeholder="Scholar Number"
                    required
                    className={baseInputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    MANIT Email Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className={baseInputStyle}
                  />
                </div>
              </>
            )}

            {isOtherCollege && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your College/Institution Name:
                  </label>
                  <input
                    type="text"
                    name="otherCollege"
                    value={formData.otherCollege}
                    onChange={handleChange}
                    placeholder="College Name"
                    className={baseInputStyle}
                  />
                </div>

                <p className="text-xs text-gray-400">
                  Pay ₹99 and upload payment screenshot:
                </p>
                <img
                  src="/ss-pay.jpg"
                  alt="QR"
                  className="w-48 mx-auto my-2 rounded border border-gray-400"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 transition"
                />
              </>
            )}

            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-1">Year:</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className={baseInputStyle}
              >
                <option value="">-- Select Year --</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </div>

            {/* Know */}
            <div>
              <label className="block text-sm font-medium mb-1">
                How did you hear about us?
              </label>
              <select
                name="know"
                value={formData.know}
                onChange={handleChange}
                required
                className={baseInputStyle}
              >
                <option value="">-- Select Option --</option>
                <option value="Robotics Club MANIT Socials (Instagram, LinkedIn etc.)">
    Robotics Club MANIT Socials (Instagram, LinkedIn etc.)
  </option>
  <option value="Poster/Banners">Poster/Banners</option>
  <option value="Through your College/Institution">
    Through your College/Institution
  </option>
  <option value="Through a friend/Word of mouth">
    Through a friend/Word of mouth
  </option>
  <option value="Other">Other</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-2 rounded-md font-bold text-white transition duration-200 ${
                isPending
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600 shadow-[0_0_20px_#00ffff88] hover:shadow-[0_0_30px_#00ffffaa]"
              }`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
