import React, { useEffect, useState } from 'react';
import './SpoonSelect.css';
import IconToggler from '../IconToggler/IconToggler';
import Spoon from '../../atoms/Icon/Spoon';

export default function SpoonSelect({ onChange, value=1 }) {
    // State to keep track of the selected number of spoons
    const [selectedSpoons, setSelectedSpoons] = useState(value);

    // Function to handle click on each spoon
    const handleSpoonClick = (index) => {
        const newSelectedSpoons = index + 1;
        setSelectedSpoons(newSelectedSpoons); // Update the selected spoons based on the clicked spoon index
        if (onChange) onChange(newSelectedSpoons); // Call onChange with the new value
    };

    // Synchronize internal state with incoming prop
    useEffect(() => {
        setSelectedSpoons(value);
    }, [value]);

    return (
        <>
            <div className="spoon-select">
                {Array.from({ length: 5 }, (_, index) => (
                    <IconToggler
                        key={index}
                        on={index < selectedSpoons}
                        onClick={() => handleSpoonClick(index)}
                    >
                        <Spoon />
                    </IconToggler>
                ))}
            </div>
        </>
    );
}
