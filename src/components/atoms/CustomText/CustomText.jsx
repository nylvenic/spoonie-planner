import './CustomText.css';

export default function CustomText({children, ElementType="p", className='', size="base", color="dark", ...props}) {
    return <ElementType className={`custom-text ${size} ${color} ${className}`} {...props}>{children}</ElementType>
}