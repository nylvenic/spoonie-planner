import './SidePopup.css';
import profilePicture from '../../../assets/images/default.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import MenuItemList from './Components/MenuItemList';
import { useUIContext } from '../../../contexts/UIContext';
import Overlay from '../../atoms/Overlay/Overlay.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import CONSTANTS from '../../../models/utils/CONSTANTS.js';

export default function SidePopup() {
    const auth = useAuth();
    const {menuPopup, setMenuPopup, closeModals} = useUIContext();
    return menuPopup ? 
    <>
        <Overlay onClick={() => setMenuPopup(false)}></Overlay>
        <FontAwesomeIcon size='lg' onClick={() => setMenuPopup(false)} icon={faXmark} className="faux-close"></FontAwesomeIcon>
        <div className="side-popup">
            <div className="header">
                <img className="profile-pic" src={CONSTANTS.backend_url + auth.userData.avatar}></img>
                <p>{auth.userData.username}</p>
                <div className="controls">
                    <Link onClick={closeModals} to="/settings"><IconButton><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></IconButton></Link>
                </div>
            </div>
            <MenuItemList></MenuItemList>
        </div>
    </> : null;
}