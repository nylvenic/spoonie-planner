import Menu from '../../atoms/Menu/Menu';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import { useUIContext } from '../../../contexts/UIContext';
import { useNavigate } from "react-router-dom";

export default function Nav({inner=false, text}) {
    const navigate = useNavigate();
    const {modalIsOpened, closeModals, setMenuPopup} = useUIContext();
    let icon;

    if(modalIsOpened()) {
        icon = <IconButton className="close-btn" onClick={closeModals}>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
               </IconButton>
    } else if(inner) {
        icon = <IconButton onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </IconButton>
    } else {
        icon = <IconButton onClick={() => setMenuPopup(true)}>
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </IconButton>
    }
    return (
        <>
            <Menu Wrapper="nav" className="navigation" hoisted={true}>
                <div className="header">
                    {icon}
                    <p>{text}</p>
                </div>
            </Menu>
            <div className="nav-height-object"></div>
        </>
    );
}