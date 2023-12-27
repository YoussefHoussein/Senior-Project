import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './utilities.css'
import Login from './Auth/login';
import ClientHome from "./Client/home";
import AdminHome from "./Admin/home";
import Slots from "./Client/slots";
import Statistics from "./Client/statistics";
import Suggestions from "./Client/suggestions"
import Support from "./Client/support"
import Add from "./Admin/add";
import Chats from "./Admin/chats";
import ProtectedClient from "./Client/client";
import ProtectedAdmin from "./Admin/admin";
function App() {
  return (
    <div className="container flex center">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/client' element={<ProtectedClient />}/>
        <Route path='/client/home' element={<ClientHome />}/>
        <Route path='/client/slots' element={<Slots />}/>
        <Route path='/client/statistics' element={<Statistics />}/>
        <Route path='/client/suggestions' element={<Suggestions />}/>
        <Route path='/client/support' element={<Support />}/>
        <Route path='/admin' element={<ProtectedAdmin />}/>
        <Route path='/admin/home' element={<AdminHome />}/>
        <Route path='/admin/add' element={<Add />}/>
        <Route path='/admin/chats' element={<Chats />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
