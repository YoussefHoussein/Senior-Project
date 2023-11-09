import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './utilities.css'
import Login from './Auth/login';
import ClientHome from "./Client/home";
import AdminHome from "./Admin/home";
function App() {
  return (
    <div className="container flex center">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/client' element={<ClientHome />}/>
        <Route path='/admin' element={<AdminHome />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
