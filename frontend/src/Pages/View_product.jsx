import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBook, FaTag } from 'react-icons/fa';

export default function View_product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data.products);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError('Error deleting product');
    }
  };

  if (loading) {
    return <div className="text-white text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-16">{error}</div>;
  }

  return (
    <section className="py-16 bg-gray-100 text-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Book Manager Home Button */}
        <div className="text-center mb-8">
          <Link
            to="/Book_manager_home"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300"
          >
            Go to Book Manager Home
          </Link>
        </div>

        <h2 className="text-4xl font-bold text-center mb-12 text-teal-600 drop-shadow-lg">
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-2xl"
              >
                <div className="flex justify-between">
                  {/* Left Side: Main Category, Type, and Image */}
                  <div className="flex flex-col w-1/2">
                    {/* Main Category Box */}
                    <div className="mb-4 text-left">
                      <div className="inline-block bg-teal-100 text-teal-600 py-2 px-4 rounded-full text-lg font-semibold shadow-md">
                        <FaBook className="mr-2 inline-block" />
                        {product.mainCategory}
                      </div>
                    </div>

                    {/* Product Type */}
                    <div className="mb-4 text-left">
                      <h4 className="text-xl text-gray-700 font-semibold">{product.type}</h4>
                    </div>

                    {/* Product Image */}
                    {product.image && (
                      <img
                        src={`http://localhost:3000/${product.image}`} // Use the correct path
                        alt={product.type}
                        className="w-full h-auto mb-4 rounded-lg object-contain"
                      />
                    )}
                  </div>

                  {/* Right Side: Introduction, Price, and Buttons */}
                  <div className="w-1/2 pl-8">
                    {/* Introduction */}
                    <p className="text-sm text-gray-600 mb-4 w-full">
                      <strong>Introduction:</strong> {product.introduction}
                    </p>

                    {/* Price */}
                    <div className="text-center text-gray-800 text-lg font-bold mb-4">
                      <FaTag className="inline-block mr-2 text-teal-600" />
                      <span className="text-2xl">${product.price}</span>
                    </div>

                    {/* Buttons: Update & Delete */}
                    <div className="flex justify-between space-x-4 mt-4">
                      {/* Update Button */}
                      <Link
                        to={`/updateproduct/${product._id}`}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300"
                      >
                        Update
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products found</p>
          )}
        </div>
      </div>
    </section>
  );
}
