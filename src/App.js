import './App.css';
import Archive from './components/Archive';
import Home from './components/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Trash from './components/Trash';
import LoginPage from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/' element={<ProtectedRoute Component={Home}/>}/>
        <Route path='/archive' element={<ProtectedRoute Component={Archive}/>}/>
        <Route path='/trash' element={<ProtectedRoute Component={Trash}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
