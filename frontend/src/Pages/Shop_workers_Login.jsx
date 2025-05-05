import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserShield, FaBuilding, FaIdCard, FaKey } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Admin_Login() {
  const [adminCredentials, setAdminCredentials] = useState({
    name: "",
    institutionID: "",
    nic: "",
  });
  const [error, setError] = useState("");
  const [companyCredentials, setCompanyCredentials] = useState({
    companyNumber: "",
    name: "",
    section: "",
  });
  const [companyError, setCompanyError] = useState("");
  const [loginType, setLoginType] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const { name, institutionID, nic } = adminCredentials;
    if (
      name === "Admin" &&
      institutionID === "Admin123" &&
      nic === "200008104348"
    ) {
      navigate("/adminhome");
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
  };

  const handleCompanyLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/employees/login",
        companyCredentials
      );
  
      if (response.data.success) {
        const { section, name } = companyCredentials;
        localStorage.setItem("staffName", name);
  
        switch (section) {
          case "Staff Manager":
            navigate("/stockmanagerhome");
            break;
          case "Service Manager":
            navigate("/Service_manager_home");
            break;
          case "Collect Manager":
            navigate("/Collect_manager_home");
            break;
          case "Product Manager":
            navigate("/ProductManagerHome");
            break;
          default:
            setCompanyError("Invalid section selected.");
        }
      } else {
        setCompanyError(
          response.data.message || "Invalid credentials. Please try again."
        );
      }
    } catch (err) {
      console.error("Error during company login:", err);
      setCompanyError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            EcoBin Management Portal
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Select your role to access the appropriate management dashboard
          </p>
        </div>

        {/* Role Selection */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-md">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <label htmlFor="loginType" className="block text-sm font-medium text-gray-700 mb-2">
                Select Login Type
              </label>
              <select
                id="loginType"
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="">-- Select Role --</option>
                <option value="Admin">Administrator</option>
                <option value="Staff">Staff Member</option>
              </select>
            </div>
          </div>
        </div>

        {/* Forms Container */}
        <div className="flex justify-center">
          {/* Admin Login Form */}
          {loginType === "Admin" && (
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:shadow-2xl">
              <div className="bg-green-700 px-6 py-4">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <FaUserShield className="mr-3" />
                  Admin Login
                </h2>
              </div>
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                    <p>{error}</p>
                  </div>
                )}
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div>
                    <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaIdCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="adminName"
                        value={adminCredentials.name}
                        onChange={(e) => setAdminCredentials({...adminCredentials, name: e.target.value})}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter admin name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="institutionID" className="block text-sm font-medium text-gray-700 mb-1">
                      Admin ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBuilding className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="institutionID"
                        value={adminCredentials.institutionID}
                        onChange={(e) => setAdminCredentials({...adminCredentials, institutionID: e.target.value})}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter admin ID"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-1">
                      NIC Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="nic"
                        value={adminCredentials.nic}
                        onChange={(e) => setAdminCredentials({...adminCredentials, nic: e.target.value})}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter NIC number"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <MdLogin className="mr-2" />
                    Login as Admin
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Staff Login Form */}
          {loginType === "Staff" && (
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:shadow-2xl">
              <div className="bg-green-700 px-6 py-4">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <FaBuilding className="mr-3" />
                  Staff Login
                </h2>
              </div>
              <div className="p-6">
                {companyError && (
                  <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                    <p>{companyError}</p>
                  </div>
                )}
                <form onSubmit={handleCompanyLogin} className="space-y-6">
                  <div>
                    <label htmlFor="companyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaIdCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="companyNumber"
                        value={companyCredentials.companyNumber}
                        onChange={(e) => setCompanyCredentials({...companyCredentials, companyNumber: e.target.value})}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter company number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBuilding className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="companyName"
                        value={companyCredentials.name}
                        onChange={(e) => setCompanyCredentials({...companyCredentials, name: e.target.value})}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBuilding className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="section"
                        value={companyCredentials.section || ""}
                        onChange={(e) => setCompanyCredentials({...companyCredentials, section: e.target.value})}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white"
                      >
                        <option value="">Select your department</option>
                        <option value="Service Manager">Service Manager</option>
                        <option value="Collect Manager">Collect Manager</option>
                        <option value="Product Manager">Product Manager</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <MdLogin className="mr-2" />
                    Login as Staff
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Customer Login Link */}
        <div className="text-center mt-12">
          <Link
            to="/customer-login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-200"
          >
            Are you a customer? Click here to login
          </Link>
        </div>
      </div>
    </div>
  );
}