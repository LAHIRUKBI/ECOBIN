/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRecycle, FaStar, FaClock, FaCheckCircle, FaEye, FaPlus, FaHome, FaTrash, FaSearch, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ServiceView() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const staffName = localStorage.getItem('staffName');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      alert("Failed to delete the product.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProducts(products.filter((product) =>
      product.type.toLowerCase().includes(query)
    ));
  };

  const filterByType = (type) => {
    setFilteredProducts(products.filter((product) => product.type === type));
  };

  const generateReport = (product) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Service Report", 80, 10);

    doc.setFontSize(14);
    doc.text(`Service Type: ${product.type}`, 10, 30);
    doc.text(`Main Category: ${product.mainCategory}`, 10, 40);
    doc.text(`Price: RS ${product.price}`, 10, 50);
    doc.text(`Service Time: ${product.serviceTime}`, 10, 60);
    doc.text(`Priority: ${product.priority}`, 10, 70);
    doc.text(`Introduction:`, 10, 80);
    doc.setFontSize(12);
    doc.text(product.introduction, 10, 90, { maxWidth: 180 });

    doc.save(`${product.type}_report.pdf`);
  };


  const generateAllReports = async () => {
  const doc = new jsPDF();

  // ===== COVER PAGE =====
  doc.setFontSize(24);
  doc.setTextColor(0, 102, 204);
  doc.text("EcoBIN", 80, 30);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, "italic");
  doc.text("Turning Trash into Treasure – Creating a Cleaner Tomorrow, Today.", 20, 45);

  doc.setFont(undefined, "normal");
  let y = 60;

  const institutionDetails = [
    "Address: 123 Eco Lane, Green City, Earth 10101",
    "Phone: +94 77 123 4567",
    "Email: support@smartbin.lk",
    "Website: www.smartbin.lk",
    `Report Generated On: ${new Date().toLocaleDateString()}`
  ];

  institutionDetails.forEach(detail => {
    doc.text(detail, 20, y);
    y += 10;
  });

  doc.setDrawColor(0, 102, 204);
  doc.line(20, 100, 190, 100);

  doc.setFontSize(16);
  doc.setTextColor(0, 102, 204);
  doc.text("All Services Report", 70, 115);

  // ===== SERVICE PAGES =====
  for (const [index, product] of filteredProducts.entries()) {
    doc.addPage();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 204);
    doc.text("Service Details", 75, 20);

    let y = 35;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    const addField = (label, value) => {
      doc.setFont(undefined, "bold");
      doc.text(`${label}:`, 20, y);
      doc.setFont(undefined, "normal");
      doc.text(`${value}`, 70, y);
      y += 10;
    };

    addField("Service Type", product.type);
    addField("Main Category", product.mainCategory);
    addField("Price", `RS ${product.price}`);
    addField("Service Time", product.serviceTime);
    addField("Priority", product.priority);

    // Add Image (if available)
    if (product.image) {
      try {
        // If image is URL, convert it to base64
        const base64Img = await toBase64(product.image);
        doc.addImage(base64Img, 'JPEG', 120, 35, 70, 50); // x, y, width, height
        y = Math.max(y, 90); // ensure y goes past the image
      } catch (err) {
        console.warn("Image couldn't be added:", err);
      }
    }

    // Introduction
    doc.setFont(undefined, "bold");
    doc.text("Introduction:", 20, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont(undefined, "normal");

    const introLines = doc.splitTextToSize(product.introduction, 170);
    doc.text(introLines, 20, y);
  }

  doc.save("all_services_report.pdf");
};

// Utility: Convert image URL to base64
const toBase64 = url =>
  fetch(url)
    .then(res => res.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));

  
  
  

  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">

      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-green-700 to-green-500 text-white p-6 flex flex-col shadow-lg">
        <div className="flex items-center space-x-4 border-b border-green-300 pb-4">
          <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-14 h-14 object-cover" />
          <div>
            <h2 className="text-xl font-semibold">{staffName}</h2>
            <p className="text-gray-300 text-sm">Service Manager</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/Service_manager_home')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Service_add')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaPlus className="mr-3" /> Add Service
          </button>
          <button onClick={() => navigate('/Service_view')} className="flex items-center p-4 bg-green-600 rounded-md transition">
            <FaEye className="mr-3" /> View Services
          </button>
          <button onClick={() => navigate('/Service_order_confirm')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaCheckCircle className="mr-3" /> View Confirm Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-green-700">Company Services</h2>

          {/* Search Bar */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by Service Type..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          <div className="flex justify-end mb-4">
  <button
    onClick={generateAllReports}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
  >
    <FaFilePdf className="inline-block mr-2" /> Get All Details
  </button>
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 py-6">
  {loading ? (
    <p className="text-center text-gray-400 text-lg font-medium">Loading...</p>
  ) : error ? (
    <p className="text-center text-red-500 text-lg font-medium">{error}</p>
  ) : filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div
        key={product._id}
        className="bg-gradient-to-br from-white via-green-50 to-green-100 p-5 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-green-100"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Main Category */}
          <span className="flex items-center bg-green-200 text-green-800 px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
            <FaRecycle className="mr-2" /> {product.mainCategory}
          </span>

          {/* Product Image */}
          {product.image && (
            <img
              src={`http://localhost:3000/${product.image}`}
              alt={product.type}
              className="w-full h-40 object-cover rounded-xl border border-green-300 shadow-sm"
            />
          )}

          {/* Service Type (Clickable) */}
          <h4
            onClick={() => filterByType(product.type)}
            className="text-xl font-bold text-green-800 hover:text-green-600 cursor-pointer transition"
          >
            {product.type}
          </h4>
          <p className="text-sm text-gray-600">{product.introduction}</p>

          {/* Details */}
          <div className="flex justify-between items-center w-full text-sm text-gray-700">
            <span className="font-extrabold text-green-700 text-lg">RS {product.price}</span>
            <span className="flex items-center">
              <FaClock className="text-green-600 mr-1" /> {product.serviceTime}
            </span>
            <span className="flex items-center">
              <FaStar className="text-yellow-500 mr-1" /> {product.priority}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0 md:space-x-2 mt-4">
            <Link
              to={`/Service_update/${product._id}`}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl font-semibold text-sm shadow"
            >
              Update
            </Link>
            <button
              onClick={() => handleDelete(product._id)}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-xl font-semibold text-sm shadow flex items-center justify-center"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
            <button
              onClick={() => generateReport(product)}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-xl font-semibold text-sm shadow flex items-center justify-center"
            >
              <FaFilePdf className="mr-2" /> Report
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 text-lg font-medium">No products found</p>
  )}
</div>

        </div>
      </main>
    </div>
  );
}
  