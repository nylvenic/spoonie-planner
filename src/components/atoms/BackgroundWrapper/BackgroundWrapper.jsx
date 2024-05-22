import './BackgroundWrapper.css';
import spoonBg from '../../../assets/images/spoon-bg.png';
export default function BackgroundWrapper({children, navPage=false, centerText=true, background=true}) {
    return <div className={`background-item ${centerText ? 'center-text' : ''} ${navPage ? 'nav-height' : ''}`} style={background ? {backgroundImage: `url(${spoonBg})`, backgroundRepeat: 'repeat'} : null}>{children}</div>
}