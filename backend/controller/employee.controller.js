import Employee from '../model/employee.model.js';
import User from '../model/signup.model.js';

// Register a new employee
export const registerEmployee = async (req, res) => {
  try {
    const { companyNumber, name, address, gender, phoneNumber, dateOfBirth, section } = req.body;
    if (!companyNumber || !name || !address || !gender || !phoneNumber || !dateOfBirth || !section) {
      return res.status(400).json({ success: false, message: 'All fields are required, including section' });
    }
    const employee = new Employee({ companyNumber, name, address, gender, phoneNumber, dateOfBirth, section });
    await employee.save();

    res.status(201).json({ success: true, message: 'Employee registered successfully', data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// Delete an employee by ID
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    await Employee.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Employee removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};



// Company Login Controller
export const companyLogin = async (req, res) => {
  const { companyNumber, name, section } = req.body;

  try {
    if (!companyNumber || !name || !section) {
      return res.status(400).json({
        success: false,
        message: 'Company number, name, and section are required',
      });
    }

    console.log('Login attempt with:', companyNumber, name, section);
    const employee = await Employee.findOne({ companyNumber, name, section });
    console.log('Found employee:', employee);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Invalid credentials or incorrect section',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Login successful',
      employee,
    });
  } catch (error) {
    console.error('Error in companyLogin:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// Controller to get the count of employees
export const getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee count" });
  }
};