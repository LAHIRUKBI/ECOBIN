/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaClock, FaFlag, FaCamera, FaLayerGroup } from "react-icons/fa";
import { FaPlus, FaEye } from "react-icons/fa";

function ItemAdd() {
  const [formData, setFormData] = useState({
    name: "",
    discription: "",
    price: "",
    image: null,
  });

  const navigate = useNavigate();
  const staffName = localStorage.getItem("staffName");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:3000/api/item", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Item added successfully!");
      setFormData({
        name: "",
        discription: "",
        price: "",
        image: null,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.discription.trim() !== "" &&
      formData.price !== "" &&
      formData.price >= 0
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <img
              src="src/images/profilelogo.png"
              alt="Profile Icon"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{staffName}</h2>
            <p className="text-gray-300 text-sm">Service Manager</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button
            onClick={() => navigate("/addItem")}
            className="flex items-center p-4 bg-green-600 rounded-md transition"
          >
            <FaPlus className="mr-3" /> Add Item
          </button>
          <button
            onClick={() => navigate("/ProductManagerHome")}
            className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
          >
            <FaEye className="mr-3" /> View Items
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 border border-green-400">
          <h1 className="text-4xl font-bold text-center text-green-900 mb-6">
            Add New Item
          </h1>
          <p className="text-center text-green-700 mb-6">
            Contribute to a greener future with EcoBIN.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2">
                <FaLayerGroup /> Item Name
              </label>
              <input
                type="text"
                placeholder="Item Name"
                className="w-full p-3 border rounded-lg focus:ring-green-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2">
                <FaLayerGroup /> Item Price
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg focus:ring-green-500"
                placeholder="Item Price"
                value={formData.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0 || value === "") {
                    setFormData({ ...formData, price: value });
                  }
                }}
                min="0"
                required
              />
            </div>

            <div>
              <label className="text-green-900 font-semibold">
                Description
              </label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-green-500"
                rows="4"
                placeholder="Briefly describe your Item"
                value={formData.discription}
                onChange={(e) =>
                  setFormData({ ...formData, discription: e.target.value })
                }
                required
              ></textarea>
            </div>

            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2">
                <FaCamera /> Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="w-full p-3 border rounded-lg focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-all 
                ${
                  !isFormValid()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-700 text-white hover:bg-green-800 hover:shadow-xl"
                }`}
              disabled={!isFormValid()}
            >
              Add Item
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ItemAdd;