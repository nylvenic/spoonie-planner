import { faCalendarWeek, faCheck, faTrash, faInbox } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useUIContext } from '../../../../contexts/UIContext';
import MenuItem from '../../../molecules/MenuItem/MenuItem';
import './MenuItemList.css';
export default function MenuItemList() {
    const {closeModals} = useUIContext();
    return <div className="menu-item-list">
        <NavLink onClick={closeModals} to="/" className={({isActive}) => isActive ? 'active' : null}>
            <MenuItem icon={faCalendarWeek}>Today</MenuItem>
        </NavLink>
        <NavLink onClick={closeModals} to="/inbox" className={({isActive}) => isActive ? 'active' : null}>
            <MenuItem icon={faInbox}>Inbox</MenuItem>
        </NavLink>
        <NavLink onClick={closeModals} to="/completed" className={({isActive}) => isActive ? 'active' : null}>
            <MenuItem icon={faCheck}>Completed</MenuItem>
        </NavLink>
        <NavLink onClick={closeModals} to="/deleted" className={({isActive}) => isActive ? 'active' : null}>
            <MenuItem icon={faTrash}>Deleted</MenuItem>
        </NavLink>
    </div>
}