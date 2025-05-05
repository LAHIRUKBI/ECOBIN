import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { FaUserPlus, FaUsers, FaClipboardList } from "react-icons/fa"; // Import icons
import jsPDF from "jspdf";

export default function Employee_view() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees");
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);


  const handleGeneratePDF = (employee) => {
    const doc = new jsPDF();
  
    // Add Title
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text("SERVICE LETTER", 105, 20, null, null, "center");
  
    // Add Line under title
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
  
    // Body content
    doc.setFontSize(12);
    doc.setFont("times", "normal");
  
    const lineSpacing = 10;
    let y = 40;
  
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, y - 15);
  
    const content = [
      `To whom it may concern,`,
      ``,
      `This is to certify that Mr/Ms. ${employee.name}, holding the Company ID Number ${employee.companyNumber},`,
      `is a registered employee under the ${employee.section} section of our company.`,
      ``,
      `Their contact information and details are as follows:`,
      ``,
      `- Address: ${employee.address}`,
      `- Gender: ${employee.gender}`,
      `- Phone Number: ${employee.phoneNumber}`,
      `- Date of Birth: ${new Date(employee.dateOfBirth).toLocaleDateString()}`,
      ``,
      `We appreciate the contribution of ${employee.name} to our organization.`,
      ``,
      `Sincerely,`,
      `HR Department`,
      `SmartBIN Pvt Ltd`
    ];
  
    content.forEach((line) => {
      doc.text(line, 20, y);
      y += lineSpacing;
    });
  
    // Save the PDF
    doc.save(`${employee.name}_Service_Letter.pdf`);
  };
  
  

  // Remove employee handler
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      alert("Employee removed successfully.");
    } catch (error) {
      console.error("Error removing employee:", error);
      alert("Failed to remove employee.");
    }
  };


  const handleUpdate = (id) => {
    navigate(`/Employee_update/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
              <div className="p-6 border-b border-indigo-400">
                <div className="flex items-center space-x-4">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                    <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Admin</h2>
                    <p className="text-gray-300 text-sm">Admin Dashboard</p>
                  </div>
                </div>
              </div>
      
              <nav className="mt-6">
                <ul className="space-y-4">
                  <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/adminhome")}> <FaUserPlus className="text-white text-lg mr-3" /> <span className="font-medium">Admin Home</span></li>
                  <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/employeeregister")}> <FaUserPlus className="text-white text-lg mr-3" /> <span className="font-medium">Register Employee</span></li>
                  <li className="flex items-center p-4 bg-green-600 rounded-md transition" onClick={() => navigate("/employeeview")}> <FaUsers className="text-white text-lg mr-3" /> <span className="font-medium">View Employees</span></li>
                  <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/userview")}> <FaUsers className="text-white text-lg mr-3" /> <span className="font-medium">View Users</span></li>
                  <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/order")}> <FaClipboardList className="text-white text-lg mr-3" /> <span className="font-medium">View Orders</span></li>
                </ul>
              </nav>
            </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-green-800 mb-2">Employee Management</h1>
              <p className="text-gray-600">View and manage all registered employees</p>
            </div>

            {/* Employee Cards */}
            {employees.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => (
                  <div
                    key={employee._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Employee Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 p-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white truncate">{employee.name}</h2>
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs text-white">
                          {employee.section}
                        </span>
                      </div>
                    </div>

                    {/* Employee Details */}
                    <div className="p-6">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <span className="font-medium text-gray-700 w-28">Company ID:</span>
                          <span className="text-gray-600">{employee.companyNumber}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium text-gray-700 w-28">Address:</span>
                          <span className="text-gray-600">{employee.address}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium text-gray-700 w-28">Gender:</span>
                          <span className="text-gray-600">{employee.gender}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium text-gray-700 w-28">Phone:</span>
                          <span className="text-gray-600">{employee.phoneNumber}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium text-gray-700 w-28">Date of Birth:</span>
                          <span className="text-gray-600">
                            {new Date(employee.dateOfBirth).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        <button
                          onClick={() => handleUpdate(employee._id)}
                          className="flex-1 min-w-[100px] py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleRemove(employee._id)}
                          className="flex-1 min-w-[100px] py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleGeneratePDF(employee)}
                          className="flex-1 min-w-[100px] py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Service Letter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-600">No employees found</p>
              </div>
            )}
          </div>
        </main>
      </div>
  );
}