import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaBox, FaPlus, FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Collect_view_lists() {
  const navigate = useNavigate();
  const [reusables, setReusables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReusables = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reuse/list');
        setReusables(response.data);
      } catch (error) {
        console.error('Error fetching reusable data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReusables();
  }, []);

  // Handle deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/reuse/delete/${id}`);
      setReusables(reusables.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };



  

  if (loading) {
    return <div>Loading...</div>;
  }




  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Welcome, Collect Manager</h2>
            <p className="text-gray-300 text-sm">Dashboard</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/collectmanagerhome')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Collect_manager_orders')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaBox className="mr-3" /> Orders
          </button>
          <button onClick={() => navigate('/Collect_add_reusable')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaPlus className="mr-3" /> Add Reusables
          </button>
          <button onClick={() => navigate('/Collect_view_lists')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaEye className="mr-3" /> View Reusables
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-8">Reusable Materials Collection</h1>
        {reusables.length === 0 ? (
          <p>No reusable materials found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reusables.map((item, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col">
                <h2 className="text-xl font-semibold text-green-600">Collection Date: {new Date(item.date).toLocaleDateString()}</h2>
                <div className="mt-4">
                  {Object.keys(item).map((category) => {
                    if (category !== 'date' && category !== '_id' && category !== '__v') {
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="font-medium capitalize">{category}:</span>
                          <span>
                            {item[category].amount} {item[category].unit}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-600 transition"
                  >
                    <FaTrash /> <span>Delete</span>
                  </button>
                  <button
  onClick={() => navigate(`/Collect_list_update/${item._id}`)}
  className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition"
>
  <FaEdit /> <span>Update</span>
</button>

                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
