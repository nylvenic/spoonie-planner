import './MessageBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import GapWrapper from '../../atoms/GapWrapper/GapWrapper';
import CustomText from '../../atoms/CustomText/CustomText';
import { useEffect, useState } from 'react';
import CONSTANTS from '../../../models/utils/CONSTANTS';

export default function MessageBox({text, error=false, className='', cb, persistent=false, ...props}) {
    console.log(text);
    const [active, setActive] = useState(true);
    useEffect(function () {
        if(!persistent) {
            const timer = setTimeout(() => {
                setActive(false);
                cb();
            }, CONSTANTS.msgBoxTimer);
    
            return () => {
                clearTimeout(timer);
            }
        }
    },[cb, CONSTANTS.msgBoxTimer]);
    return active && <GapWrapper direction='row' className={`message-box ${className} ${error ? 'error' : ''}`} {...props}>
        <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
        <CustomText color='light'>{text}</CustomText>
    </GapWrapper>
}