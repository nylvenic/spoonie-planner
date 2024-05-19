import React, { useEffect, useState } from 'react';
import './SpoonSelect.css';
import IconToggler from '../IconToggler/IconToggler';
import Spoon from '../../atoms/Icon/Spoon';

export default function SpoonSelect({ onChange, value=1, ...props }) {
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
            <div className="spoon-select" aria-label="Spoon cost selector" {...props}>
                <label htmlFor="selected-cost">Selected cost:</label>
                <input type="text" defaultValue={selectedSpoons} id="selected-cost"></input>
                {Array.from({ length: 5 }, (_, index) => (
                    <IconToggler
                        data-testid={value == index ? "spoon-select-selected" : ""}
                        key={index}
                        aria-label={`Set spoon cost to ${index+1}`}
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
