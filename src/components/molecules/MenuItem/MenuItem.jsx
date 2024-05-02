import './MenuItem.css';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
export default function MenuItem({children, icon, customIcon=false, decoration=false, size="1x", className, ...props}) {
    return <Button variant='text' className={`menu-item ${className}`} {...props}>
        <div className="left">
            {customIcon ? icon : <FontAwesomeIcon size="lg" icon={icon}></FontAwesomeIcon>}
            <p>{children}</p>
        </div>
        {decoration ? <div className="right">
            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
        </div> : null}
    </Button>
}