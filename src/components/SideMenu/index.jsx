import './index.css'
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div className='side-menu-container'>
      <ul className='unordered'>
        <Link to='/'><li className='lists'><LightbulbIcon/><h3>Notes</h3></li></Link>
        <Link to='/archive'><li className='lists'><ArchiveIcon/><h3>Archived</h3></li></Link>
        <Link to= '/trash'><li className='lists'><DeleteOutlineIcon/><h3>Trash</h3></li></Link>
      </ul>
    </div>
  );
};

export default SideMenu;
