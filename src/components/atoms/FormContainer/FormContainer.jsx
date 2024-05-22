import './FormContainer.css';
export default function FormContainer({children, className='', ...props}) {
    return <div className={`form-container ${className}`} {...props}>
        {children}
    </div>
}