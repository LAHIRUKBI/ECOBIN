import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/signup";
import Navigation from "./Components/Navigation";
import Shop_workers_Login from "./Pages/Shop_workers_Login";
import Admin_Home from "./Pages/Admin_Home";
import Employee_register from "./Pages/Employee_register";
import Stockmanager_register from "./Pages/Stockmanager_register";
import Employee_view from "./Pages/Employee_view";
import Service_manager_home from "./Pages/Service_manager_home";
import Employee_home from "./Pages/Employee_home";
import Service_add from "./Pages/Service_add";
import Add_stocks from "./Pages/Add_stocks";
import Service_view from "./Pages/Service_view";
import Service_update from "./Pages/Service_update";
import Books from "./Pages/Books";
import Footer from "./Components/Footer";
import EmployeeProfile from "./Pages/Employee_profile";
import BookDetails from "./Pages/Book_details";
import Payment from "./Pages/Payment";
import Order from "./Pages/Order";
import About_Us from "./Pages/About_Us";
import Contact from "./Pages/Contact";
import My_payments from "./Pages/My_payments";
import Service_order_confirm from "./Pages/Service_order_confirm";
import Employee_Update_profile from "./Pages/Employee_Update_profile";
import User_view from "./Pages/User_view";
import Product_home from "./Pages/Product_home";
import Collect_manager_home from "./Pages/Collect_manager_home";
import Employee_update from "./Pages/Employee_update";
import ProductManagerHome from "./Pages/ProductManagerHome";
import ItemAdd from "./Pages/ItemAdd";
import UpdateItem from "./Pages/UpdateItem";
import ItemPayment from "./Pages/itemPayment";
import MyItemOrderDetails from "./Pages/MyItemOrderDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop_workers_Login" element={<Shop_workers_Login />} />
        <Route path="/adminhome" element={<Admin_Home />} />
        <Route path="/employeeregister" element={<Employee_register />} />

        <Route
          path="/stockmanagerregister"
          element={<Stockmanager_register />}
        />
        <Route path="/employeeview" element={<Employee_view />} />
        <Route
          path="/Service_manager_home"
          element={<Service_manager_home />}
        />
        <Route path="/employeehome" element={<Employee_home />} />
        <Route path="/Service_add" element={<Service_add />} />
        <Route path="/addstock" element={<Add_stocks />} />
        <Route path="/Service_view" element={<Service_view />} />
        <Route path="/Service_update/:id" element={<Service_update />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/employee_profile/:username"
          element={<EmployeeProfile />}
        />
        <Route path="/book_details/:id" element={<BookDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/about_Us" element={<About_Us />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mypayments" element={<My_payments />} />
        <Route
          path="/Service_order_confirm"
          element={<Service_order_confirm />}
        />
        <Route
          path="/employeeupdateprofile"
          element={<Employee_Update_profile />}
        />
        <Route path="/userview" element={<User_view />} />
        <Route path="/producthome" element={<Product_home />} />

        <Route
          path="/Collect_manager_home"
          element={<Collect_manager_home />}
        />
        <Route path="/Employee_update/:id" element={<Employee_update />} />

        <Route path="/ProductManagerHome" element={<ProductManagerHome />} />
        <Route path="/addItem" element={<ItemAdd />} />
        <Route path="/updateItem/:id" element={<UpdateItem />} />
        <Route path="/itemPayment" element={<ItemPayment />} />
        <Route path="/myItemOrderDetails" element={<MyItemOrderDetails />} />z
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
