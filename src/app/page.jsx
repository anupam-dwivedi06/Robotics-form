"use client";

import React, { useState } from "react";
import axios from "axios";

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
      setFormData({ ...formData, image: reader.result }); // base64
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
      } else {
        alert("Incomplete data");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex">
      <div className="bg-[#0D0D1C] w-[50vw] h-screen text-white flex flex-col justify-center gap-8 px-6">
        <h1 className="text-6xl font-bold">Robotics Club</h1>
        <h2 className="text-3xl">MANIT Bhopal</h2>
        <p>Join the workshop to learn hands-on robotics, automation, and innovation.</p>
      </div>

      <div className="flex-1 h-screen overflow-y-scroll px-16 py-8 bg-[#121212] text-white">
        <h2 className="text-center text-3xl mb-6 font-semibold">Register for the Workshop</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="p-2 rounded bg-[#1f1f1f]" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required className="p-2 rounded bg-[#1f1f1f]" />
          <input name="wpNumber" value={formData.wpNumber} onChange={handleChange} placeholder="WhatsApp Number" required className="p-2 rounded bg-[#1f1f1f]" />

          <select name="college" value={formData.college} onChange={handleChange} required className="p-2 rounded bg-[#1f1f1f] text-black">
            <option value="">-- Select College --</option>
            <option value="MANIT">MANIT Bhopal</option>
            <option value="Other">Other College</option>
          </select>

          {isManit && (
            <>
              <input name="scNumber" value={formData.scNumber} onChange={handleChange} placeholder="Scholar Number" required className="p-2 rounded bg-[#1f1f1f]" />
              <input name="password" value={formData.password} onChange={handleChange} placeholder="MANIT Email Password" type="password" required className="p-2 rounded bg-[#1f1f1f]" />
            </>
          )}

          {isOtherCollege && (
            <>
              <input name="otherCollege" value={formData.otherCollege} onChange={handleChange} placeholder="Your College Name" className="p-2 rounded bg-[#1f1f1f]" />
              <p className="text-sm">Pay ₹99 and upload payment screenshot:</p>
              <img src="/ss-pay.jpg" className="w-60 mx-auto my-2" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
            </>
          )}

          <select name="year" value={formData.year} onChange={handleChange} required className="p-2 rounded bg-[#1f1f1f] text-black">
            <option value="">-- Select Year --</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>

          <select name="know" value={formData.know} onChange={handleChange} required className="p-2 rounded bg-[#1f1f1f] text-black">
            <option value="">-- How did you hear about us? --</option>
            <option value="Instagram">Instagram</option>
            <option value="Poster">Poster</option>
            <option value="Friends">Friend Circle</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 p-2 rounded mt-2">
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;