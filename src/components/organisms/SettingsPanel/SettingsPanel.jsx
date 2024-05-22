import { faSpoon,
    faIdBadge,
    faPen,
    faLock,
    faBell,
    faClockRotateLeft,
    faRightFromBracket,
    faCircleInfo,
    faShare } from "@fortawesome/free-solid-svg-icons";
import Page from "../../molecules/Page/Page";
import MenuItem from "../../molecules/MenuItem/MenuItem";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export default function SettingsPanel({type, className='', ...props}) {
    const auth = useAuth();
    const navigate = useNavigate();
    let settings = null;

    function logOutHandler() {
        auth.logout();
        navigate('/');
    }

    if(type == 'account') {
        settings = <Page title="Account">
            <Link to="change-avatar"><MenuItem icon={faIdBadge} decoration={true}>Change Avatar</MenuItem></Link>
            <Link to="change-nickname"><MenuItem icon={faPen} decoration={true}>Change Nickname</MenuItem></Link>
            <Link to="change-password"><MenuItem icon={faLock} decoration={true}>Change Password</MenuItem></Link>
        </Page>;
    } else if (type == 'app') {
        settings = <Page title="App Settings">
            <Link to="change-max-spoons"><MenuItem icon={faSpoon} decoration={true}>Change Max Spoons</MenuItem></Link>
            <MenuItem icon={faBell} decoration={true}>Browser Reminder</MenuItem>
            <MenuItem icon={faClockRotateLeft} decoration={true}>Spoon Carry-Over</MenuItem>
        </Page>
    } else if (type == 'others') {
        settings = <Page title="Others">
            <MenuItem icon={faShare} decoration={true}>Share</MenuItem>
            <MenuItem icon={faCircleInfo} decoration={true}>About</MenuItem>
            <MenuItem icon={faRightFromBracket} onClick={logOutHandler} decoration={true}>Sign Out</MenuItem>
        </Page>
    }
    return settings ? <div className={`settings-panel ${className}`} {...props}>{settings}</div> : null;
}