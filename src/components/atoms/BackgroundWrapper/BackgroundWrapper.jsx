import './BackgroundWrapper.css';
import spoonBg from '../../../assets/images/spoon-bg.png';
export default function BackgroundWrapper({children}) {
    return <div className="background-item" style={{backgroundImage: `url(${spoonBg})`, backgroundRepeat: 'repeat'}}>{children}</div>
}