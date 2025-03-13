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
    return <div className="text-center text-xl font-semibold text-gray-700 mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 font-semibold mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
      <section className="bg-green-700 text-white py-16 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to EcoBin</h1>
        <p className="text-lg mb-6">Discover eco-friendly services that make a difference.</p>
        <div className="relative w-4/5 md:w-1/3 mx-auto">
          <input
            type="text"
            placeholder="Search Eco-Friendly Products..."
            className="w-full p-4 rounded-full shadow-md text-gray-700 focus:outline-none focus:ring-4 focus:ring-green-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-4 right-4 text-gray-600" />
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">Browse Our Eco-Friendly Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white p-6 rounded-3xl shadow-xl transform hover:scale-105 transition duration-300 hover:shadow-2xl"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <span className="inline-block bg-green-200 text-green-800 py-2 px-4 rounded-full text-sm font-semibold">
                      <FaRecycle className="mr-2 inline-block" />
                      {product.mainCategory}
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-700">{product.type}</h4>

                  {product.image && (
                    <img
                      src={`http://localhost:3000/${product.image}`}
                      alt={product.type}
                      className="w-full h-40 object-cover rounded-lg mt-4"
                    />
                  )}

                  <p className="text-sm text-gray-600 mt-4">{product.introduction}</p>

                  <div className="flex justify-between mt-4 w-full">
                    <div className="text-gray-800 text-sm font-bold">
                      <FaClock className="inline-block mr-2 text-green-600" />
                      {product.serviceTime}
                    </div>
                    <div className="text-gray-800 text-sm font-bold">
                      <FaStar className="inline-block mr-2 text-green-600" />
                      {product.priority}
                    </div>
                  </div>

                  <div className="text-xl font-bold mt-4 text-green-700">
                    <FaTag className="inline-block mr-2" />
                    <span>${product.price}</span>
                  </div>

                  <Link
                    to={`/book_details/${product._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-semibold shadow-md mt-4 transition duration-300"
                  >
                    Request Service
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No eco-friendly products available</p>
          )}
        </div>
      </section>
    </div>
  );
}