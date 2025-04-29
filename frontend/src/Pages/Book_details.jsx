import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBook,
  FaTag,
  FaMoneyBill,
  FaCreditCard,
  FaPaypal,
} from "react-icons/fa";

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
    return <div className="text-center text-lg text-gray-600 mt-16 animate-pulse">Loading book details...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-2xl shadow-2xl bg-white overflow-hidden flex flex-col md:flex-row animate__animated animate__fadeInUp">
        
        {/* Left Side - Book Info */}
        <div className="md:w-1/2 p-8 space-y-5">
          <h2 className="text-4xl font-extrabold text-green-800 tracking-wide">{book.type}</h2>
          <div className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full shadow">
            <FaBook className="mr-2" /> {book.mainCategory}
          </div>
          <p className="text-gray-700 text-md leading-relaxed">{book.introduction}</p>

          {book.image && (
            <div className="relative group w-full mt-4">
              <img
                src={`http://localhost:3000/${book.image}`}
                alt={book.type}
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-white bg-opacity-70 px-3 py-1 rounded-full text-green-800 text-xs font-semibold shadow-md">
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Purchase Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-700 to-green-800 text-white p-10 flex flex-col justify-center rounded-r-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="text-3xl font-bold flex items-center justify-start">
            <FaTag className="mr-3 text-yellow-300" /> 
            <span className="text-yellow-300">RS {book.price}</span>
          </div>

          <div className="flex justify-start gap-6">
            <FaMoneyBill className="text-3xl hover:text-yellow-400 transition-transform duration-300 hover:scale-110" />
            <FaCreditCard className="text-3xl hover:text-yellow-400 transition-transform duration-300 hover:scale-110" />
            <FaPaypal className="text-3xl hover:text-yellow-400 transition-transform duration-300 hover:scale-110" />
          </div>

          <button
            onClick={handleBuyClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg py-3 px-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Buy Now
          </button>

          {/* Decorative tag */}
          <div className="absolute bottom-4 right-4 text-xs text-white opacity-40">
            Limited Edition
          </div>
        </div>
      </div>
    </div>
  );
}
