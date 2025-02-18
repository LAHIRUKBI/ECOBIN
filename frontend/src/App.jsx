import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/signup'
import Navigation from './Components/Navigation'
import Shop_workers_Login from './Pages/Shop_workers_Login'
import Admin_Home from './Pages/Admin_Home'
import Employee_register from './Pages/Employee_register'
import Stockmanager_register from './Pages/Stockmanager_register'
import Employee_view from './Pages/Employee_view'
import Book_manager_home from './Pages/Book_manager_home'
import Employee_home from './Pages/Employee_home'
import Add_Book from './Pages/Add_Book'
import Add_stocks from './Pages/Add_stocks'
import View_product from './Pages/View_product'
import Product_update from './Pages/Product_update'
import Books from './Pages/Books'
import Footer from './Components/Footer'
import EmployeeProfile from './Pages/Employee_profile';
import BookDetails from './Pages/Book_details'
import Importance_of_Learning from './Pages/Importance_of_Learning'
import Learning_Makes_a_Person_Rich from './Pages/Learning_Makes_a_Person_Rich'
import Benefits_of_learning_to_read from './Pages/Benefits_of_learning_to_read'
import Payment from './Pages/Payment'
import Order from './Pages/Order'
import About_Us from './Pages/About_Us'
import Contact from './Pages/Contact'
import My_payments from './Pages/My_payments'
import Order_confirm from './Pages/Order_confirm'
import Employee_Update_profile from './Pages/Employee_Update_profile'
import User_view from './Pages/User_view'

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
      
      <Route path="/stockmanagerregister" element={<Stockmanager_register />} />
      <Route path="/employeeview" element={<Employee_view />} />
      <Route path="/Book_manager_home" element={<Book_manager_home />} />
      <Route path="/employeehome" element={<Employee_home />} />
      <Route path="/addbook" element={<Add_Book />} />
      <Route path="/addstock" element={<Add_stocks />} />
      <Route path="/productview" element={<View_product />} />
      <Route path="/updateproduct/:id" element={<Product_update />} />
      <Route path="/books" element={<Books />} />
      <Route path="/employee_profile/:username" element={<EmployeeProfile />} />
      <Route path="/book_details/:id" element={<BookDetails />} />
      <Route path="/importance_of_Learning" element={<Importance_of_Learning />} />
      <Route path="/learning_Makes_a_Person_Rich" element={<Learning_Makes_a_Person_Rich />} />
      <Route path="/benefits_of_learning_to_read" element={<Benefits_of_learning_to_read />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order" element={<Order />} />
      <Route path="/about_Us" element={<About_Us />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/mypayments" element={<My_payments />} />
      <Route path="/orderconfirm" element={<Order_confirm />} />
      <Route path="/employeeupdateprofile" element={<Employee_Update_profile />} />
      <Route path="/userview" element={<User_view />} />



      
    </Routes>
    <Footer />
    </BrowserRouter>
    
  )
}
