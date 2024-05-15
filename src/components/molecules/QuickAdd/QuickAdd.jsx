import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './QuickAdd.css';
import { useUIContext } from '../../../contexts/UIContext';
import CONSTANTS from '../../../models/utils/CONSTANTS';

export default function QuickAdd({className, ...props}) {
    const {setQuickAddPopup} = useUIContext();
    return <IconButton data-testid={CONSTANTS.ids.QuickAddButton} onClick={() => setQuickAddPopup(true)} className={`quick-add ${className}`} type="icon" size="large" {...props}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </IconButton>
}