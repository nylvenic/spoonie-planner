import './Overlay.css';
import { useUIContext } from '../../../contexts/UIContext';
import CONSTANTS from '../../../models/utils/CONSTANTS';

export default function Overlay({children, className='', ...props}) {
    const {modalIsOpened} = useUIContext();
    return modalIsOpened() ? <div data-testid={CONSTANTS.ids.Overlay} className={`overlay ${className}`} {...props}>{children}</div> : null;
}