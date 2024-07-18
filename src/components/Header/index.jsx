import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import SearchIcon from '@mui/icons-material/Search';
import './index.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate()
    const handlingLogout = () => {
        Cookies.remove("jwtToken")
        navigate('/login')
    }
    return(
        <nav>
            <MenuOutlinedIcon fontSize='large'/>
            <h1 className='heading-logo'><BatchPredictionIcon color='success' fontSize='large'/> Notes</h1>
            <div className='search-container'>
            <input className='search-input' placeholder='Search' type='search' />
            <SearchIcon fontSize='medium'/>
            </div>
            <button className='logout-button' type='button' onClick={handlingLogout}>Logout</button>
        </nav>
    )
}

export default Header