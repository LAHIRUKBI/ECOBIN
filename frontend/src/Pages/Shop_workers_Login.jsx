import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserShield, FaBuilding, FaIdCard, FaKey } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link for customer login redirect

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
  const [loginType, setLoginType] = useState(""); // Track selected login type
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
        const { section, name } = companyCredentials; // Capture the name here
  
        // Store the name in localStorage
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
            navigate("/producthome");
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
    <div className="bg-green-50 min-h-screen py-12 px-6">
      {/* Page Introduction */}
      <div className="w-full max-w-7xl mx-auto text-center mb-12">
        {/* Title with refined styling */}
        <h1 className="text-4xl font-semibold text-green-800 mb-6 text-center leading-tight tracking-tight">
          Welcome to the Login Portal
        </h1>

        {/* Instructional Text with improved spacing and contrast */}
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Please select your role from the options below, then log in to access
          the system. Ensure you're using the correct role to avoid any issues.
        </p>

        {/* Login Type Selector with refined design */}
        <div className="mb-6 flex justify-center items-center gap-6">
          <div className="w-full max-w-xs">
            <select
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              className="w-full p-4 bg-white border border-green-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:bg-green-50"
            >
              <option value="">Select Login Type</option>
              <option value="Admin" className="flex items-center">
                Admin Login
              </option>
              <option value="Staff" className="flex items-center">
                Staff Login
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Login Container (displayed based on selection) */}
      <div className="flex justify-center w-full max-w-7xl mx-auto">
        {/* Show Admin Login Form */}
        {loginType === "Admin" && (
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-3xl text-center font-semibold mb-6 text-green-800 flex items-center justify-center">
              <FaUserShield className="mr-2" /> Administrator Login
            </h2>

            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}
            <form onSubmit={handleAdminLogin}>
              <div className="mb-6">
                <label
                  htmlFor="adminName"
                  className="block text-sm font-medium mb-2 text-green-800"
                >
                  Admin Name:
                </label>
                <div className="flex items-center bg-white p-3 rounded-md border border-green-300">
                  <FaIdCard className="text-green-400 mr-3" />
                  <input
                    type="text"
                    id="adminName"
                    value={adminCredentials.name}
                    onChange={(e) =>
                      setAdminCredentials({
                        ...adminCredentials,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-none focus:outline-none text-green-800"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="institutionID"
                  className="block text-sm font-medium mb-2 text-green-800"
                >
                  Admin ID:
                </label>
                <div className="flex items-center bg-white p-3 rounded-md border border-green-300">
                  <FaBuilding className="text-green-400 mr-3" />
                  <input
                    type="text"
                    id="institutionID"
                    value={adminCredentials.institutionID}
                    onChange={(e) =>
                      setAdminCredentials({
                        ...adminCredentials,
                        institutionID: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-none focus:outline-none text-green-800"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="nic"
                  className="block text-sm font-medium mb-2 text-green-800"
                >
                  Admin NIC Number:
                </label>
                <div className="flex items-center bg-white p-3 rounded-md border border-green-300">
                  <FaKey className="text-green-400 mr-3" />
                  <input
                    type="text"
                    id="nic"
                    value={adminCredentials.nic}
                    onChange={(e) =>
                      setAdminCredentials({
                        ...adminCredentials,
                        nic: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-none focus:outline-none text-green-800"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none flex items-center justify-center"
              >
                <MdLogin className="mr-2" /> Admin Login
              </button>
            </form>
          </div>
        )}

        {/* Show Staff Login Form */}
        {loginType === "Staff" && (
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-3xl text-center font-semibold mb-6 text-green-800 flex items-center justify-center">
              <FaBuilding className="mr-2" /> Staff Login
            </h2>
            {companyError && (
              <div className="text-red-500 mb-4 text-center">
                {companyError}
              </div>
            )}
            <form onSubmit={handleCompanyLogin}>
              <div className="mb-6">
                <label
                  htmlFor="companyNumber"
                  className="block text-sm font-medium mb-2 text-green-800"
                >
                  Company Number:
                </label>
                <div className="flex items-center bg-white p-3 rounded-md border border-green-300">
                  <FaIdCard className="text-green-400 mr-3" />
                  <input
                    type="text"
                    id="companyNumber"
                    value={companyCredentials.companyNumber}
                    onChange={(e) =>
                      setCompanyCredentials({
                        ...companyCredentials,
                        companyNumber: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-none focus:outline-none text-green-800"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium mb-2 text-green-800"
                >
                  Name:
                </label>
                <div className="flex items-center bg-white p-3 rounded-md border border-green-300">
                  <FaBuilding className="text-green-400 mr-3" />
                  <input
                    type="text"
                    id="companyName"
                    value={companyCredentials.name}
                    onChange={(e) =>
                      setCompanyCredentials({
                        ...companyCredentials,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-none focus:outline-none text-green-800"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="section"
                  className="block text-sm font-medium mb-2 text-green-800"
                >
                  Section:
                </label>
                <div className="flex items-center bg-white p-3 rounded-md border border-green-300">
                  <FaBuilding className="text-green-400 mr-3" />
                  <select
                    id="section"
                    value={companyCredentials.section || ""}
                    onChange={(e) =>
                      setCompanyCredentials({
                        ...companyCredentials,
                        section: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-none focus:outline-none text-green-800"
                  >
                    <option value="">Select Section</option>
                    <option value="Service Manager">Service Manager</option>
                    <option value="Collect Manager">Collect Manager</option>
                    <option value="Product Manager">Product Manager</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none flex items-center justify-center"
              >
                <MdLogin className="mr-2" /> Company Login
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Customer login link */}
      <div className="text-center mt-6">
        <Link to="/customer-login" className="text-green-700">
          Customer Login
        </Link>
      </div>
    </div>
  );
}
