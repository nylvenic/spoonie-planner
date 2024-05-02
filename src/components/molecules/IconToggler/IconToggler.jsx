import { IconButton } from "@mui/material"
import './IconToggler.css';
export default function IconToggler({on=false, className='', small=false, square=false, children, ...props}) {
    return <IconButton {...props} className={
        `icon-button ${on ? "icon-button-on" : "icon-button-off"} `
        + (small ? 'icon-button-xs ' : '')
        + (square ? 'icon-button-square ' : '')
        + className
    }>{children}</IconButton>
}