import Container from '../../atoms/Container/Container.jsx';
import './SpoonMeter.css';
import Spoon from '../../atoms/Icon/Spoon.jsx';
import CONSTANTS from '../../../models/utils/CONSTANTS.js';
import { useSpoonContext } from '../../../contexts/SpoonContext.jsx';
export default function SpoonMeter() {
    const {spoons, maxSpoons} = useSpoonContext();
    return <Container>
        <div className="meter">
            <div className="point-wrapper">
                {[...Array(maxSpoons).keys()].map((num, index) => 
                <span key={num} 
                data-testid={index > spoons-1 ? 
                    CONSTANTS.ids.SpoonMeterUsed 
                    : CONSTANTS.ids.SpoonMeterPoint} 
                className={`point ${index == 0 ? "point-start" : 
                    index == maxSpoons-1 ? 
                    "point-end point" : ''} ${index > spoons-1 ? `used` : ''}`}></span>)}
            </div>
            <Spoon></Spoon>
        </div>
    </Container>
}