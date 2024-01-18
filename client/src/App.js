import './App.css';
import { Router, Routes, Route, Navigate } from 'react-router-dom';
import Create from './components/create/create';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Navbar from './components/Navbar/navbar';
//import Visitedplace from './components/visitedplace/visitedplace';
import Home from './components/home/home';
import Table from './components/table/table.jsx';
import { useSelector } from 'react-redux';
function App() {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/create' element={<Create />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/table' element={<Table />} />
          
        </Routes>
    </div>
  );
}

export default App;
