import './CustomText.css';

export default function CustomText({children, className='', size="base", color="dark", ...props}) {
    return <p className={`custom-text ${size} ${color} ${className}`} {...props}>{children}</p>
}