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

  const isManit = formData.college === "MANIT";
  const [ispending, setIsPending] = useState(true);
  const isotherCollege = formData.college === "Other";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagechange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    console.log("Hello from frontend");
    e.preventDefault();
    setIsPending(true);
    const data = new FormData();
    const {college , scNumber , password} = formData ;
    data.append("image", formData.image); //  File object

    // if college manit
    if(college === 'MANIT' && (scNumber && password)){
      console.log("Reached here")
      try {
        const response = await axios.post("/api/login",  
          {
            name: formData.name,
            email: formData.email,
            wpNumber: formData.wpNumber,
            scNumber: formData.scNumber,
            password: formData.password,
            know: formData.know,
            year: formData.year,
            otherCollege: formData.otherCollege,
            college: formData.college,
            // image: response.data.cloudinary_uri
          }, 
          {
            headers: {
              "Content-Type": "multipart/form-data", // Optional — browser sets it automatically
            },
          }
    );
      console.log(response) ;    
  } catch (error) {
              console.log(error) ;
              console.log(error.message)
      }
    }

    // if other college
    else {
      try {
      const response = await axios.post("/api/multer/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Optional — browser sets it automatically
        },
      });

    setFormData({ ...formData, image: response.data.cloudinary_uri });

    try {
      console.log(formData.name,formData.email, formData.wpNumber,formData.scNumber,formData.password, formData.know,formData.year,)
      const res = await axios.post(
        "/api/register",
        {
          name: formData.name,
          email: formData.email,
          wpNumber: formData.wpNumber,
          scNumber: formData.scNumber,
          password: formData.password,
          know: formData.know,
          year: formData.year,
          otherCollege: formData.otherCollege,
          college: formData.college,
          image: response.data.cloudinary_uri,
        },
        {
          headers: {
            Type: "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        alert("User addede succesfully");
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error uploading user:", error);
      alert("Upload failed", error.message);
    }
    } catch (error) {
      console.log("Failed in uploading Image : ", error);
    }
    
    document.getElementById("imageUpload").value = null;
  };
  // Reset form
  // setFormData({
  //   name: "",
  //   email: "",
  //   wpNumber: "",
  //   college: "",
  //   year: "",
  //   know: "",
  //   scNumber: "",
  //   password: "",
  //   image: null,
  //   otherCollege: "",
  // });
}
// try {
  //   let imageUrl = "";

  //   // If Other college, upload image to Cloudinary
  //   if (formData.college === "Other" && formData.image) {
  //     const imgData = new FormData();
  //     imgData.append("file", formData.image);
  //     imgData.append("upload_preset", "your_upload_preset");
  //     imgData.append("cloud_name", "your_cloud_name");

  //     const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
  //       method: "POST",
  //       body: image,
  //     });

  //   const cloudinaryData = await cloudinaryRes.json();
  //   imageUrl = cloudinaryData.secure_url;
  // }

  // // Now send data to backend API
  // const res = await fetch("/api/register", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     ...formData,
  //     image: imageUrl,
  //   }),
  // });

  // const result = await res.json();

  // if (res.ok) {
  //   alert("Form submitted successfully!");
  //   setFormData({
  //     name: "",
  //     email: "",
  //     college: "",
  //     scNumber: "",
  //     manitpassword: "",
  //     image: null,
  //   });
  // } else {
  //   alert("Submission failed: " + result.message);
  // }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Something went wrong!");
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

  return (
    <div className="flex">
      {/* Left half */}
      <div className="bg-[#0D0D1C] w-[50vw] h-screen text-white text-center flex flex-col justify-center gap-8 px-6">
        <div className="flex flex-col gap-5">
          <h1 className="text-8xl">Robotics Club</h1>
          <h3 className="text-3xl">MANIT Bhopal</h3>
        </div>
        <p className="px-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed placeat,
          rerum impedit a amet minima modi aliquam, sequi ratione, excepturi
          libero quisquam laudantium cum dolorem maxime perspiciatis minus
          cumque consectetur!
        </p>
      </div>

      {/* Right half - form */}
      <div className="flex-1 h-screen px-20 py-6 overflow-y-scroll no-scrollbar bg-[#121212] text-[#F1F1F1]">
        <h1 className="text-center mb-8 text-3xl">Resister For the WorkShop</h1>
        <form
          className="flex flex-col gap-4 bg-[#121212] px-12 py-8 rounded border border-[#2D2D44]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="border p-2 border-[#2D2D44] rounded-md"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border p-2 border-[#2D2D44] rounded-md"
          />

          <label htmlFor="wpNumber">WhatsApp Number</label>
          <input
            type="text"
            name="wpNumber"
            required
            value={formData.wpNumber}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="border p-2 border-[#2D2D44] rounded-md"
          />

          <label htmlFor="college">College</label>
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="border p-2 border-[#2D2D44] rounded-md"
            required
          >
            <option value="" className="text-[black]">
              -- Select College --
            </option>
            <option
              value="MANIT"
              className="text-[black]"
              onChange={handleChange}
            >
              MANIT Bhopal
            </option>
            <option
              value="Other"
              className="text-[black]"
              onChange={handleChange}
            >
              Other College
            </option>
          </select>

          {/* Conditional fields if MANIT is selected */}
          {isManit ? (
            <>
              <label htmlFor="scNumber">Scholar Number</label>
              <input
                type="text"
                name="scNumber"
                value={formData.scNumber}
                onChange={handleChange}
                placeholder="Scholar Number"
                className="border p-2 border-[#2D2D44] rounded-md"
              />

              <label htmlFor="password">MANIT Email Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Email Password"
                className="border p-2 border-[#2D2D44] rounded-md"
              />
            </>
          ) : (
            <>
              <label htmlFor="otherCollege">Enter Your College Name</label>
              <input
                type="text"
                name="otherCollege"
                placeholder="College Name"
                className="border p-2 border-[#2D2D44] rounded-md"
                onChange={handleChange}
              />
            </>
          )}

          {isotherCollege && (
            <div className="mt-4">
              <p className="mb-2">Please pay ₹99 and upload the screenshot:</p>
              <img
                src="/ss-pay.jpg"
                alt="Payment QR"
                className="w-60 h-auto mx-auto mb-4"
              />
            </div>
          )}

          <label htmlFor="year">Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="border p-2 border-[#2D2D44] rounded-md"
            required
          >
            <option value="" className="text-[black]">
              --Select Year--
            </option>
            <option value="1st" className="text-[black]">
              1st
            </option>
            <option value="2nd" className="text-[black]">
              2nd
            </option>
            <option value="3rd" className="text-[black]">
              3rd
            </option>
            <option value="4th" className="text-[black]">
              4th
            </option>
          </select>

          <label htmlFor="know">How did you know about this workshop?</label>
          <select
            name="know"
            value={formData.know}
            onChange={handleChange}
            className="border p-2 border-[#2D2D44] rounded-md"
            required
          >
            <option value="" className="text-[black]">
              -- Select an Option --
            </option>
            <option value="Instagram" className="text-[black]">
              Instagram
            </option>
            <option value="Poster" className="text-[black]">
              Poster/Flex
            </option>
            <option value="Friends" className="text-[black]">
              Friend Circle
            </option>
            <option value="Other" className="text-[black]">
              Other
            </option>
          </select>

          <label className="text-white text-sm block mb-1">Item Image</label>
          <input
            type="file"
            name="image"
            id="imageUpload"
            onChange={handleImagechange}
            className="w-full text-white text-sm placeholder:text-black file:bg-indigo-600 
file:border-none file:rounded file:px-4 file:py-2 file:text-white file:cursor-pointer rounded px-2 
py-2 mb-4"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-500 hover:opacity-80"
          >
            {ispending ? <span>Submit</span> : <span>Progressing...</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
