import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './utilities.css'
import Login from './Auth/login';
function App() {
  return (
    <div className="container flex center">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
