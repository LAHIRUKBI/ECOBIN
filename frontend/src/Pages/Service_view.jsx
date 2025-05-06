import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaRecycle, FaStar, FaClock, FaCheckCircle, FaEye, FaPlus, FaHome, FaTrash, FaSearch, FaFilePdf, FaLeaf } from 'react-icons/fa';
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
    for (const [index, product] of filteredProducts.entries()) {
      doc.addPage();
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
      if (product.image) {
        try {
          const base64Img = await toBase64(product.image);
          doc.addImage(base64Img, 'JPEG', 120, 35, 70, 50);
          y = Math.max(y, 90);
        } catch (err) {
          console.warn("Image couldn't be added:", err);
        }
      }
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
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
              <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                  <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
                </div>
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
                <button onClick={() => navigate('/Service_view')} className="flex items-center p-4  bg-green-600 rounded-md transition">
                  <FaEye className="mr-3" /> View Services
                </button>
                <button onClick={() => navigate('/Service_order_confirm')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
                  <FaCheckCircle className="mr-3" /> View Confirm Orders
                </button>
              </nav>
            </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-3 rounded-xl shadow-lg mb-4">
              <FaRecycle className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold text-green-800 mb-2">Service Management</h1>
            <p className="text-lg text-gray-600">View and manage all available services</p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-400 to-teal-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            <button
              onClick={generateAllReports}
              className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              <FaFilePdf className="mr-2" /> Generate Full Report
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-10">
                <p className="text-red-500 text-lg font-medium">{error}</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100 group"
                >
                  {/* Service Image */}
                  {product.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`http://localhost:3000/${product.image}`}
                        alt={product.type}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Service Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        <FaRecycle className="mr-1" /> {product.mainCategory}
                      </span>
                      <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                        <FaStar className="mr-1" /> {product.priority}
                      </span>
                    </div>

                    <h3 
                      onClick={() => filterByType(product.type)}
                      className="text-xl font-bold text-green-800 mb-2 cursor-pointer hover:text-green-600 transition"
                    >
                      {product.type}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.introduction}</p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-green-700">RS {product.price}</span>
                      <span className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-1 text-green-500" /> {product.serviceTime}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        to={`/Service_update/${product._id}`}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-2 rounded-lg font-medium text-xs text-center shadow-sm transition-colors"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-2 rounded-lg font-medium text-xs shadow-sm transition-colors flex items-center justify-center"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                      <button
                        onClick={() => generateReport(product)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-lg font-medium text-xs shadow-sm transition-colors flex items-center justify-center"
                      >
                        <FaFilePdf className="mr-1" /> PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg font-medium">No services found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float 8s ease-in-out infinite 2s; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}