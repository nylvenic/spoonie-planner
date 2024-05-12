import './CustomButton.css';
import { Button } from '@mui/material';

export default function CustomButton({children, fullWidth=true, className='', variant='contained', rounded=false, color='base', ...props}) {
    const buttonClasses = [
        'custom-button',
        className,
        fullWidth ? 'full-width' : '',
        rounded ? 'rounded' : '',
        color ? `${color}-color` : '',
    ].join(' ').trim();
    // color options are base or error
    return <Button 
    className={buttonClasses} 
    variant={variant} 
    {...props}>{children}</Button>
}