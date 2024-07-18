import './App.css';
import Archive from './components/Archive';
import Home from './components/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Trash from './components/Trash';
import LoginPage from './components/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/' Component={Home}/>
        <Route path='/archive' Component={Archive}/>
        <Route path='/trash' Component={Trash}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
