import './Overlay.css';
import { useUIContext } from '../../../contexts/UIContext';

export default function Overlay({children, className='', ...props}) {
    const {modalIsOpened} = useUIContext();
    return modalIsOpened() ? <div className={`overlay ${className}`} {...props}>{children}</div> : null;
}