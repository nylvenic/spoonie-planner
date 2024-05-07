import SpoonMeterController from "../models/User/SpoonMeterController";
import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CONSTANTS from "../models/utils/CONSTANTS";
import Cookies from "js-cookie";

const SpoonContext = createContext();
const spoonManager = new SpoonMeterController();

export const SpoonContextProvider = ({ children }) => {
    const {userData} = useAuth();
    const [spoons, setSpoons] = useState(0);
    const [maxSpoons, setMaxSpoons] = useState(0);
    
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

    async function getSpoons() {
        if(userData) {
            const data = await fetch(`${CONSTANTS.backend_url}/users/${userData.userId}/spoons`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('jwt')}`
                }
            });
            const json = (await data.json()).result;
            setSpoons(json.spoons);
            setMaxSpoons(json.maxSpoons);
        }
    }

    useEffect(() => {
        getSpoons();
    }, [userData])

    const value = {
        modifySpoons,
        getSpoons,
        spoons,
        maxSpoons: userData ? userData.maxSpoons : 12,
    };

    return <SpoonContext.Provider value={value}>
        {children}
    </SpoonContext.Provider>
}

export const useSpoonContext = () => useContext(SpoonContext);