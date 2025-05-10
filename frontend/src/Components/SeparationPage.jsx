import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHome, FaCheckCircle, FaTrash, FaUser, FaRecycle } from 'react-icons/fa';

const SeparationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [weights, setWeights] = useState({
    metal: 0,
    clothes: 0,
    food: 0,
    organic: 0,
    plastic: 0,
    paper: 0,
    glass: 0,
    electronic: 0,
  });
  const [notes, setNotes] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
    fetchStats();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/confirm/confirmed-orders/${orderId}`);
      setOrder(response.data.data);
    } catch (error) {
      setError('Failed to fetch order details');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/separation/stats');
      setStats(response.data.data);
    } catch (error) {
      setError('Failed to fetch statistics');
    }
  };

  const handleWeightChange = (type) => (event) => {
    const value = parseFloat(event.target.value) || 0;
    setWeights((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('http://localhost:3000/api/separation', {
        orderId,
        weights,
        notes,
      });
      setSuccess(true);
      setWeights({
        metal: 0,
        clothes: 0,
        food: 0,
        organic: 0,
        plastic: 0,
        paper: 0,
        glass: 0,
        electronic: 0,
      });
      setNotes('');
      fetchStats();
    } catch (error) {
      setError('Failed to save separation data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <FaUser className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Collection Manager</h2>
            <p className="text-gray-300 text-sm">Separation Page</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/Collect_manager_home')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Back to Home
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Garbage Separation</h1>
          </div>

          {/* Order Details */}
          {order && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600"><span className="font-semibold">Customer:</span> {order.customerName}</p>
                  <p className="text-gray-600"><span className="font-semibold">Address:</span> {order.customerAddress}</p>
                </div>
                <div>
                  <p className="text-gray-600"><span className="font-semibold">Contact:</span> {order.customerPhone}</p>
                  <p className="text-gray-600"><span className="font-semibold">Service:</span> {order.bookTitle}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Enter Separation Weights</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(weights).map((type) => (
                    <div key={type}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {type.charAt(0).toUpperCase() + type.slice(1)} Weight (kg)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={weights[type]}
                        onChange={handleWeightChange(type)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Separation'}
                </button>
              </form>
              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              {success && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                  Separation data saved successfully!
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Separation Statistics</h2>
              {stats && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-2xl font-semibold">{stats.totalOrders}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Weight</p>
                      <p className="text-2xl font-semibold">{stats.totalWeight.toFixed(2)} kg</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(stats.typeWeights).map(([type, weight]) => (
                      <div key={type} className="flex items-center">
                        <div className="w-24 text-sm text-gray-600">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${(weight / stats.totalWeight) * 100}%` }}
                          />
                        </div>
                        <div className="w-20 text-right text-sm text-gray-600">
                          {weight.toFixed(2)} kg
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeparationPage; 