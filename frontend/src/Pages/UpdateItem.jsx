/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaClock, FaFlag, FaCamera, FaLayerGroup } from "react-icons/fa";
import { FaPlus, FaEye } from "react-icons/fa";

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    discription: "",
    price: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const staffName = localStorage.getItem("staffName");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/item/${id}`
        );
        if (response.data.item) {
          setFormData({
            name: response.data.item.name,
            discription: response.data.item.discription,
            price: response.data.item.price,
            image: response.data.item.image,
          });
          if (response.data.item.image) {
            setImagePreview(
              `http://localhost:3000/uploads/${response.data.item.image}`
            );
          }
        } else {
          setError("Item not found");
        }
      } catch (error) {
        setError("Error fetching item details");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userEmail = localStorage.getItem("userEmail"); // or however you store it
      const data = new FormData();
      data.append("name", formData.name);
      data.append("discription", formData.discription);
      data.append("price", formData.price);
      data.append("userEmail", userEmail);

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      const response = await axios.put(
        `http://localhost:3000/api/item/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        navigate("/ProductManagerHome");
      } else {
        setError("Failed to update item");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(
        error.response?.data?.message ||
          "Error updating item. Please try again."
      );
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

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="m-auto text-center">
          <div className="text-2xl font-bold text-green-700">
            Loading item data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="m-auto text-center">
          <div className="text-2xl font-bold text-red-500">{error}</div>
          <button
            onClick={() => navigate("/ProductManagerHome")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Back to Items
          </button>
        </div>
      </div>
    );
  }

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
            Update Item
          </h1>
          <p className="text-center text-green-700 mb-6">
            Contribute to a greener future with EcoBIN.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2">
                <FaLayerGroup /> Item Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                className="w-full p-3 border rounded-lg focus:ring-green-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2">
                <FaLayerGroup /> Item Price
              </label>
              <input
                type="number"
                name="price"
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
                name="discription"
                className="w-full p-3 border rounded-lg focus:ring-green-500"
                rows="4"
                placeholder="Briefly describe your Item"
                value={formData.discription}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2">
                <FaCamera /> Item Image
              </label>
              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Current item"
                    className="w-40 h-40 object-cover rounded-lg border"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
              Update Item
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UpdateItem;
