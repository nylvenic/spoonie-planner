import './GapWrapper.css';

export default function GapWrapper({children, centered=false, direction="column", sizeClass='xs', className='', ...props}) {
    return <div className={`gap-wrapper ${direction} ${sizeClass} ${className} ${centered ? 'centered' : ''}`} {...props}>{children}</div>
}