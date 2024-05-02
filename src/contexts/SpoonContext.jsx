import SpoonMeterController from "../models/User/SpoonMeterController";
import React from "react";
import { useState, createContext, useContext } from "react";

const SpoonContext = createContext();
const spoonManager = new SpoonMeterController();

export const SpoonContextProvider = ({ children }) => {
    const [spoons, setSpoons] = useState(spoonManager.spoons);

    const modifySpoons = (cost, isReplenish) => {
        if(isReplenish) {
            spoonManager.increase(cost);
        } else if(!isReplenish) {
            spoonManager.decrease(cost);
        } else {
            throw new Error('Invalid replenish value provided, must be a boolean.');
        }
        setSpoons(() => spoonManager.spoons);
    };

    const value = {
        modifySpoons,
        spoons,
        maxSpoons: spoonManager.maxSpoons,
    };

    return <SpoonContext.Provider value={value}>
        {children}
    </SpoonContext.Provider>
}

export const useSpoonContext = () => useContext(SpoonContext);