import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faCheck, faTrash, faInbox } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '../../../molecules/MenuItem/MenuItem';
import './MenuItemList.css';
export default function MenuItemList() {
    return <div className="menu-item-list">
        <MenuItem icon={faCalendarWeek}>Today</MenuItem>
        <MenuItem icon={faInbox}>Inbox</MenuItem>
        <MenuItem icon={faCheck}>Completed</MenuItem>
        <MenuItem icon={faTrash}>Deleted</MenuItem>
    </div>
}