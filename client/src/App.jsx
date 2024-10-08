import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import {AdminLayout} from "./components/layouts/Admin-layout";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminContacts } from "./pages/AdminContacts";
import { AdminUpdate } from "./pages/AdminUpdate";


const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="users" element={<AdminUsers/>}>

          </Route>   
          <Route path="contacts" element={<AdminContacts/>}></Route>
         
        </Route>
        <Route path="/admin/users/:userId/edit"element={<AdminUpdate/>} ></Route>
      
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;