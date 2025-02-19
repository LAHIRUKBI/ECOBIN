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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-50 py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side - Book Details */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{book.type}</h2>
          <div className="bg-teal-500 text-white px-3 py-1 rounded-full inline-flex items-center text-sm font-semibold mb-3">
            <FaBook className="mr-2 text-sm" /> {book.mainCategory}
          </div>
          <p className="text-sm text-gray-700 mb-3">{book.introduction}</p>
          {book.image && (
            <img
              src={`http://localhost:3000/${book.image}`}
              alt={book.type}
              className="w-full h-40 object-cover rounded-md shadow-sm"
            />
          )}
        </div>
        
        {/* Right Side - Purchase Details */}
        <div className="flex-1 bg-teal-600 text-white p-6 flex flex-col justify-center rounded-r-lg">
          <div className="text-xl font-bold mb-3 flex items-center">
            <FaTag className="inline-block mr-2 text-lg" /> RS {book.price}
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <FaMoneyBill className="text-2xl hover:text-yellow-400 transition" />
            <FaCreditCard className="text-2xl hover:text-yellow-400 transition" />
            <FaPaypal className="text-2xl hover:text-yellow-400 transition" />
          </div>
          <button
            onClick={handleBuyClick}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-teal-800 font-semibold py-3 px-6 rounded-md shadow-md transition-transform transform hover:scale-105 w-full text-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
