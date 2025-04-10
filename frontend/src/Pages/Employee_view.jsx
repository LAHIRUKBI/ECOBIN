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
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          EMPLOYEE LIST
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 flex flex-col items-center justify-between"
            >
              {/* Employee Info Section */}
              <div className="flex flex-col items-start w-full mb-6">
                {/* Name and Section in the Same Box */}
                <div className="bg-white bg-opacity-60 shadow-lg text-gray-800 px-6 py-4 rounded-lg w-full mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-blue-800">
                    {employee.name}
                  </h2>
                  <p className="text-gray-700 font-medium">{employee.section}</p>
                </div>
                {/* Additional Employee Info */}
                <div className="space-y-2 text-gray-600 w-full">
                  <p>
                    <strong>Company ID Number:</strong> {employee.companyNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {employee.address}
                  </p>
                  <p>
                    <strong>Gender:</strong> {employee.gender}
                  </p>
                  <p>
                    <strong>Phone:</strong> {employee.phoneNumber}
                  </p>
                  <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(employee.dateOfBirth).toLocaleDateString()}
                </p>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleRemove(employee._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
                >
                  Remove
                </button>
                <button
                      onClick={() => handleUpdate(employee._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Update
                    </button>
                    <button
    onClick={() => handleGeneratePDF(employee)}
    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
  >
    Service Letter
  </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
