import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {  
  BrowserRouter,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';  
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {currentUser}=useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="App"> 

      <Routes>
        <Route path='/'>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
          </Route>  
      </Routes>
  

    </div>
  );
}

export default App;
