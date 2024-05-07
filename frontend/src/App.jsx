import './App.css'
import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
import AnimalList from './components/AnimalList';
import Login from './components/Login';
import Register from './components/Register';
import AboutUs from './components/AboutUs';
import Donations from './components/Donations';
import NotificationList from './components/NotificationList';
import Add from './components/Add';

function RequireLogIn({ children }) {
  const loggedOn = localStorage.getItem("token");
  return loggedOn != null ? children : <Navigate to="/login" replace />;
}

function App() {
  console.log(localStorage.getItem("token"))
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RequireLogIn><AnimalList /></RequireLogIn>}/>
      <Route path="/aboutus" element={<AboutUs />}/>
      <Route path="/add" element={<Add />}/>
      <Route path="/donations" element={<Donations />}/>
      <Route path="/notifications" element={<NotificationList/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}
export default App