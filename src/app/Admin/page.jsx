"use client";

import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaUserCircle, FaTimes, FaSpinner } from "react-icons/fa";

export default function UserInfo() {
  const [users, setUsers] = useState([]);
  const [manit, setManit] = useState([]);
  const [other, setOther] = useState([]);
  const [manitCount, setManitCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [loading, setLoading] = useState(true); // ✅ loader state

  const [expandedUser, setExpandedUser] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // start loading
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data.users || []);
        setManit(data.manit || []);
        setOther(data.other || []);
        setManitCount(data.manitCount || 0);
        setOtherCount(data.otherCount || 0);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // stop loading
      }
    }
    fetchData();
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

  // reusable user list renderer
  const renderUserList = (list) => (
    <div className="space-y-4">
      {list.map((u) => (
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

          {/* Expanded details */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              expandedUser === u._id
                ? "grid-rows-[1fr] opacity-100 p-6"
                : "grid-rows-[0fr] opacity-0 p-0"
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
                        e.stopPropagation();
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
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 border-b pb-2">
        Registered Users
      </h1>

      {loading ? (
        // Loader
        <div className="flex flex-col items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4" />
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      ) : (
        <>
          {/* MANIT Students */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-green-700 mb-2">
              MANIT Students ({manitCount})
            </h2>
            {renderUserList(manit)}
          </section>

          {/* Other Colleges */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-orange-700 mb-2">
              Other Colleges ({otherCount})
            </h2>
            {renderUserList(other)}
          </section>
        </>
      )}

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
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
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
