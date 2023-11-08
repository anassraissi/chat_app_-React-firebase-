import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {  
  BrowserRouter,  
  Routes,  
  Route,  
  Link,  
  Navigate
}   
from 'react-router-dom';  
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {currentUser}=useContext(AuthContext);
  const ProtectedRoute=({children})=>{
      if(!currentUser)
      {
      return <Navigate to="/Login" />
      }
      return children
  }

  return (
    <div className="App"> 

      <Routes>
        <Route path='/'>
        <Route index element={
        <ProtectedRoute>
             <Home/>
          </ProtectedRoute>
          }
          />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
          </Route>  
      </Routes>
  

    </div>
  );
}

export default App;
