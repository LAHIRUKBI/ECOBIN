import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBook, FaTag, FaMoneyBill, FaCreditCard, FaPaypal } from "react-icons/fa";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        if (response.data.product) {
          setBook(response.data.product);
        }
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleBuyClick = () => {
    navigate("/payment", {
      state: {
        bookId: id,
        bookTitle: book.type,
        totalPrice: book.price,
      },
    });
  };

  if (!book) {
    return <div className="text-center text-lg text-gray-600">Loading book details...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-lime-50 py-12 px-6">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row transition-transform transform">
        {/* Left Side - Book Details */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">{book.type}</h2>
          <div className="bg-green-600 text-white px-3 py-1 rounded-full inline-flex items-center text-sm font-semibold mb-4">
            <FaBook className="mr-2 text-sm" /> {book.mainCategory}
          </div>
          <p className="text-gray-700 leading-relaxed mb-5">{book.introduction}</p>
          {book.image && (
            <img
              src={`http://localhost:3000/${book.image}`}
              alt={book.type}
              className="w-full h-48 object-cover rounded-lg shadow-md border border-green-300"
            />
          )}
        </div>

        {/* Right Side - Purchase Details */}
        <div className="flex-1 bg-green-700 text-white p-8 flex flex-col justify-center rounded-r-xl">
          <div className="text-2xl font-semibold mb-4 flex items-center">
            <FaTag className="inline-block mr-2 text-lg text-yellow-300" /> 
            <span className="text-yellow-300">RS {book.price}</span>
          </div>
          <div className="flex justify-center space-x-5 mb-5">
            <FaMoneyBill className="text-3xl text-white hover:text-yellow-400 transition duration-300" />
            <FaCreditCard className="text-3xl text-white hover:text-yellow-400 transition duration-300" />
            <FaPaypal className="text-3xl text-white hover:text-yellow-400 transition duration-300" />
          </div>
          <button
            onClick={handleBuyClick}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-110 w-full text-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
