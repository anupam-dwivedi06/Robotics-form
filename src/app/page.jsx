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
      <div className="bg-[#0D0D1C] w-[50vw] h-screen text-white flex flex-col justify-center gap-5 px-6 text-center">
        <h1 className="text-7xl font-bold">Robotics Club</h1>
        <h2 className="text-3xl">MANIT Bhopal</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
          maxime modi rerum natus aspernatur incidunt quae reprehenderit
          nesciunt, ab nisi ullam suscipit voluptates eligendi quod debitis
          animi maiores. Facere, tempora?
        </p>
      </div>

      <div className="flex-1 h-screen overflow-y-scroll px-16 py-8 bg-[#121212] text-white">
        <h2 className="text-center text-3xl mb-6 font-semibold">
          Register for the Workshop
        </h2>

        <form className="flex flex-col gap-4 px-8" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="p-2 mt-1 rounded bg-[#1f1f1f] w-full"
            />
          </label>

          <label>
            Email:
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="p-2 mt-1 rounded bg-[#1f1f1f] w-full"
            />
          </label>

          <label>
            WhatsApp Number:
            <input
              name="wpNumber"
              value={formData.wpNumber}
              onChange={handleChange}
              placeholder="WhatsApp Number"
              required
              className="p-2 mt-1 rounded bg-[#1f1f1f] w-full"
            />
          </label>

          <label>
            College:
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              className="p-2 mt-1 rounded bg-[#1f1f1f] text-black w-full"
            >
              <option value="">-- Select College --</option>
              <option value="MANIT">MANIT Bhopal</option>
              <option value="Other">Other College</option>
            </select>
          </label>

          {isManit && (
            <>
              <label>
                Scholar Number:
                <input
                  name="scNumber"
                  value={formData.scNumber}
                  onChange={handleChange}
                  placeholder="Scholar Number"
                  required
                  className="p-2 mt-1 rounded bg-[#1f1f1f] w-full"
                />
              </label>

              <label>
                MANIT Email Password:
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="MANIT Email Password"
                  required
                  className="p-2 mt-1 rounded bg-[#1f1f1f] w-full"
                />
              </label>
            </>
          )}

          {isOtherCollege && (
            <>
              <label>
                Your College Name:
                <input
                  name="otherCollege"
                  value={formData.otherCollege}
                  onChange={handleChange}
                  placeholder="Your College Name"
                  className="p-2 mt-1 rounded bg-[#1f1f1f] w-full"
                />
              </label>

              <p className="text-sm mt-2">
                Pay ₹99 and upload payment screenshot:
              </p>
              <img
                src="/ss-pay.jpg"
                alt="QR for Payment"
                className="w-60 mx-auto my-2"
              />

              <label className="text-sm font-medium">
                Payment Screenshot:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 file:bg-red-500 file:text-white file:font-semibold file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer"
                />
              </label>
            </>
          )}

          <label>
            Year:
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="p-2 mt-1 rounded bg-[#1f1f1f] text-black w-full"
            >
              <option value="">-- Select Year --</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </label>

          <label>
            How did you hear about us?
            <select
              name="know"
              value={formData.know}
              onChange={handleChange}
              required
              className="p-2 mt-1 rounded bg-[#1f1f1f] text-black w-full"
            >
              <option value="">-- Select Option --</option>
              <option value="Instagram">Instagram</option>
              <option value="Poster">Poster</option>
              <option value="Friends">Friend Circle</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 rounded"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
