import './CustomButton.css';
import { Button } from '@mui/material';

export default function CustomButton({children, fullWidth=true, className='', variant='contained', ...props}) {
    return <Button 
    className={`custom-button ${className} ${fullWidth && 'full-width'}`} 
    variant={variant} 
    {...props}>{children}</Button>
}