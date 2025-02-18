import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { FaBook, FaTag, FaMoneyBill, FaCreditCard, FaPaypal } from "react-icons/fa";

export default function BookDetails() {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch book details by ID when the page loads
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        if (response.data.product) {
          setBook(response.data.product); // Update the book state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Recalculate the total price when the quantity changes
  useEffect(() => {
    if (book) {
      setTotalPrice(book.price * quantity); // Calculate total price based on quantity
    }
  }, [book, quantity]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleBuyClick = () => {
    // Navigate to the checkout page with the necessary details
    navigate("/payment", {
      state: {
        bookId: id,
        bookTitle: book.type,
        quantity: quantity,
        totalPrice: totalPrice,
      },
    });
  };

  if (!book) {
    return <div className="text-center text-2xl text-gray-600">Loading book details...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white p-7 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row">
          {/* Left side: Book Details */}
          <div className="flex-1 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-4xl font-extrabold text-teal-600 mb-4">{book.type}</h2>

            <div className="inline-block bg-teal-200 text-teal-700 py-2 px-6 rounded-full text-lg font-semibold shadow-lg mb-6">
              <FaBook className="mr-3 inline-block text-2xl" />
              {book.mainCategory}
            </div>

            <p className="text-xl font-semibold mb-4">Introduction:</p>
            <p className="text-gray-700 leading-relaxed">{book.introduction}</p>

            {/* Display the Book Image */}
            {book.image && (
              <div className="mt-6">
                <img
                  src={`http://localhost:3000/${book.image}`} // Use the correct image path
                  alt={book.type}
                  className="w-full h-auto mb-4 rounded-lg object-contain"
                />
              </div>
            )}
          </div>

          {/* Right side: Price, Quantity, Total Price, and Add to Cart Button */}
          <div className="flex-1 flex flex-col justify-start h-full bg-teal-50 p-6 rounded-lg shadow-lg">
            {/* Price Section */}
            <div className="text-left text-gray-800 text-xl font-bold mb-6">
              <FaTag className="inline-block mr-2 text-teal-600" />
              <span className="text-2xl">RS {book.price}</span>
            </div>

            {/* Quantity Section */}
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="text-lg font-medium text-gray-800 mr-4">
                Quantity:
              </label>
              <div className="flex items-center border border-teal-300 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 text-teal-600 font-semibold text-lg focus:outline-none hover:bg-teal-100"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  className="w-20 text-center py-3 px-6 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                />
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 text-teal-600 font-semibold text-lg focus:outline-none hover:bg-teal-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price Section */}
            <div className="text-left text-lg font-semibold mb-6">
              <p>
                Total Price: <span className="text-teal-500">{`RS ${totalPrice.toFixed(2)}`}</span>
              </p>
            </div>

            {/* Payment Method Icons */}
            <div className="flex justify-between mb-6">
              <FaMoneyBill className="text-teal-600 text-3xl hover:text-teal-700 transition duration-200" />
              <FaCreditCard className="text-teal-600 text-3xl hover:text-teal-700 transition duration-200" />
              <FaPaypal className="text-teal-600 text-3xl hover:text-teal-700 transition duration-200" />
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                onClick={handleBuyClick} // Handle the button click for navigation
                className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-12 w-full rounded-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300"
              >
                Buy
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
