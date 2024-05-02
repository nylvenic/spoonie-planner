import Menu from "../../atoms/Menu/Menu";
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faGear } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from "@mui/material";

export default function Footer() {
    return <Menu Wrapper="footer" className="menu-footer">
        <IconButton size="small">
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
        </IconButton>
        <IconButton size="small">
            <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
        </IconButton>
    </Menu>
}