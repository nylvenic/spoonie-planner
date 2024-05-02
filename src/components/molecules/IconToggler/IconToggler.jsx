import { IconButton } from "@mui/material"
import './IconToggler.css';
export default function IconToggler({on=false, children, ...props}) {
    return <IconButton {...props} className={`icon-button ${on ? "icon-button-on" : "icon-button-off"}`}>{children}</IconButton>
}