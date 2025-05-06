import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRecycle, FaSearch, FaStar } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-b from-white-50 to-green-200 text-gray-800">
      <section className="bg-green-800 text-white py-20 text-center rounded-b-3xl shadow-xl mt-20 relative overflow-hidden">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">EcoBin: Eco-Friendly Solutions</h1>
        <p className="text-xl mb-6">Join the green revolution! Explore sustainable and eco-conscious products.</p>
        <div className="relative w-4/5 md:w-1/3 mx-auto">
          <input
            type="text"
            placeholder="Search for Eco-Friendly Products..."
            className="w-full p-4 rounded-full shadow-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-4 right-4 text-gray-600 transition-transform duration-300 ease-in-out hover:scale-110" />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-green-600 opacity-20"></div>
      </section>

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">Eco-Friendly Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <span className="inline-block bg-green-200 text-green-800 py-2 px-4 rounded-full text-sm font-semibold tracking-wide">
                      <FaRecycle className="mr-2 inline-block" />
                      {product.mainCategory}
                    </span>
                  </div>

                  <h4 className="text-2xl font-semibold text-gray-800">{product.type}</h4>

                  {product.image && (
                    <img
                      src={`http://localhost:3000/${product.image}`}
                      alt={product.type}
                      className="w-full h-48 object-cover rounded-xl mt-4 mb-4 transition-all duration-300 transform hover:scale-105"
                    />
                  )}

                  <p className="text-sm text-gray-600 mt-4">{product.introduction}</p>

                  <div className="flex justify-between mt-4 w-full">
                    <div className="text-gray-800 text-sm font-bold">
                      <span className="inline-block mr-2 text-green-600">
                        Estimated Time to Complete:
                      </span>
                      {product.serviceTime} days
                    </div>
                    <div className="text-gray-800 text-sm font-bold">
                      <FaStar className="inline-block mr-2 text-yellow-500" />
                      {product.priority}
                    </div>
                  </div>

                  <div className="text-xl font-semibold mt-4 text-green-700">
                    <span>${product.price}</span>
                  </div>

                  <Link
                    to={`/book_details/${product._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full font-semibold shadow-lg mt-4 transition duration-300 transform hover:scale-105"
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
