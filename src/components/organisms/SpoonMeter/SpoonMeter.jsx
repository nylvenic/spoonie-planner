import Container from '../../atoms/Container/Container.jsx';
import './SpoonMeter.css';
import Spoon from '../../atoms/Icon/Spoon.jsx';
import CONSTANTS from '../../../models/utils/CONSTANTS.js';
import { useSpoonContext } from '../../../contexts/SpoonContext.jsx';
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext.jsx';
export default function SpoonMeter() {
    const {userData} = useAuth();
    const {spoons, maxSpoons, modifySpoons} = useSpoonContext();
    const spoonElements = [...Array(Number(maxSpoons)).keys()]; // maxSpoons is 16, if i manually enter the value i get 16, otherwise i get an arary with 1 item why?
    
    useEffect(() => {
        async function isResetNecessary() {
            const lastVisited = localStorage.getItem('lastVisited');
            const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
        
            if ((lastVisited !== today) && userData) {
                console.log('ran');
                await modifySpoons({cost: maxSpoons, replenish: true, maxSpoons: maxSpoons});
                // Update last visited date
                localStorage.setItem('lastVisited', today);
            }
        }
        isResetNecessary();
    }, [userData])
    return <Container>
        <div className="meter">
            <div className="point-wrapper">
                {spoonElements.map((num, index) => 
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