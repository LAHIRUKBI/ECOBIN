import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRecycle, FaTag, FaSearch, FaStar, FaClock } from "react-icons/fa";

export default function EcoBin() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to EcoBin</h1>
          <p className="text-lg mb-6">Explore eco-friendly Services.</p>

          <div className="flex justify-center mb-8">
            <div className="relative w-1/2 md:w-1/3">
              <input
                type="text"
                placeholder="Search Eco-Friendly Products..."
                className="w-full p-3 rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute top-3 right-3 text-gray-600" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
            Browse Our Eco-Friendly Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-left w-full">
                      <div className="inline-block bg-green-100 text-green-600 py-2 px-4 rounded-full text-sm font-semibold shadow-md">
                        <FaRecycle className="mr-2 inline-block" />
                        {product.mainCategory}
                      </div>
                    </div>

                    <div className="mb-4 text-left text-center">
                      <h4 className="text-lg text-gray-700 font-semibold">{product.type}</h4>
                    </div>

                    {product.image && (
                      <img
                        src={`http://localhost:3000/${product.image}`}
                        alt={product.type}
                        className="w-full h-auto mb-4 rounded-lg object-contain max-w-xs"
                      />
                    )}

                    <p className="text-sm text-gray-600 mb-4 w-full text-center">
                      <strong>Introduction:</strong> {product.introduction}
                    </p>

                    <div className="flex justify-between mb-4 w-full">
                      <div className="text-center text-gray-800 text-sm font-bold">
                        <FaClock className="inline-block mr-2 text-green-600" />
                        <span>{product.serviceTime}</span>
                      </div>
                      <div className="text-center text-gray-800 text-sm font-bold">
                        <FaStar className="inline-block mr-2 text-green-600" />
                        <span>{product.priority}</span>
                      </div>
                    </div>

                    <div className="text-center text-gray-800 text-xl font-bold mb-4">
                      <FaTag className="inline-block mr-2 text-green-600" />
                      <span className="text-2xl">${product.price}</span>
                    </div>

                    <div className="mt-4 text-center">
                      <Link
                        to={`/book_details/${product._id}`}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300"
                      >
                        Request Service
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No eco-friendly products available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
