"use client";

import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaUserCircle, FaTimes } from "react-icons/fa";

export default function UserInfo() {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [modalImage, setModalImage] = useState(null); // State to hold the URL of the image to display in the modal

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedUser(expandedUser === id ? null : id);
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 border-b pb-2">
        Registered Users
      </h1>
      <div className="space-y-4">
        {users.map((u) => (
          <div key={u._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => toggleExpand(u._id)}
            >
              <div className="flex items-center space-x-4">
                <FaUserCircle className="text-4xl text-blue-500" />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{u.name}</h2>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
              </div>
              <div>
                {expandedUser === u._id ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </div>
            </div>

            {/* Expanded details with transition */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                expandedUser === u._id ? "grid-rows-[1fr] opacity-100 p-6" : "grid-rows-[0fr] opacity-0 p-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <p>
                    <strong>WhatsApp Number:</strong> {u.wpNumber}
                  </p>
                  <p>
                    <strong>College:</strong> {u.college}
                  </p>
                  <p>
                    <strong>Year:</strong> {u.year}
                  </p>
                  <p>
                    <strong>Know:</strong> {u.know}
                  </p>
                  <p>
                    <strong>SC Number:</strong> {u.scNumber}
                  </p>
                  <p>
                    <strong>Other College:</strong> {u.otherCollege || "N/A"}
                  </p>
                  <p className="col-span-1 md:col-span-2">
                    <strong>Password:</strong> {u.password}
                  </p>
                  <div className="col-span-1 md:col-span-2">
                    <strong>Image:</strong>
                    {u.image ? (
                      <div
                        className="mt-2 w-32 h-32 cursor-pointer relative"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the accordion from toggling
                          openModal(u.image);
                        }}
                      >
                        <img
                          src={u.image}
                          alt={`Profile of ${u.name}`}
                          className="w-full h-full object-cover rounded-md border border-gray-200 shadow-sm transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                    ) : (
                      <span className="ml-2 text-gray-400">No image available</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing the enlarged image */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal} // Click outside the image to close
        >
          <div className="relative max-w-full max-h-full">
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            <img
              src={modalImage}
              alt="Enlarged user profile"
              className="max-w-full max-h-screen object-contain"
              onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking on the image itself
            />
          </div>
        </div>
      )}
    </div>
  );
}