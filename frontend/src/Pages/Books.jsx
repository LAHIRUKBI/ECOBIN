import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBook, FaTag, FaSearch } from "react-icons/fa";

export default function Books() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products when the Books page is loaded
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Set the initial products
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search query
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
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-teal-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Bookstore</h1>
          <p className="text-lg mb-6">Explore a variety of books that cater to your interests and needs.</p>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="relative w-1/2 md:w-1/3">
              <input
                type="text"
                placeholder="Search by Book Type..."
                className="w-full p-3 rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute top-3 right-3 text-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Product List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">
            Browse Our Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
                          src={`http://localhost:3000/${product.image}`}
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

                      {/* Buy Button */}
                      <div className="mt-4 text-center">
                        <Link
                          to={`/book_details/${product._id}`} // Ensure this matches the route in your `App.js`
                          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300"
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No books available</p>
            )}
          </div>
        </div>
      </section>

      {/* Decorative Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Discover More Books & Resources
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            From fiction to non-fiction, explore our extensive library to find your next great read.
          </p>
          <Link
            to="https://www.goodreads.com/"
            className="bg-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-600 transition duration-300"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
