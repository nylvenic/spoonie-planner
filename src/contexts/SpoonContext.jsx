import SpoonMeterController from "../models/User/SpoonMeterController";
import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CONSTANTS from "../models/utils/CONSTANTS";
import Cookies from "js-cookie";

const SpoonContext = createContext();
const spoonManager = new SpoonMeterController();

export const SpoonContextProvider = ({ children, customSpoons=0, customMaxSpoons=0 }) => {
    const {userData} = useAuth();
    const [spoons, setSpoons] = useState(customSpoons);
    const [maxSpoons, setMaxSpoons] = useState(customMaxSpoons);
    
    const modifySpoons = async ({cost, replenish, maxSpoons}) => {
        if(userData) {
            const res = await fetch(`${CONSTANTS.backend_url}/users/${userData.userId}/spoons`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('jwt')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cost, 
                        replenish, 
                        maxSpoons
                    })
                }
            );
            const data = await res.json();
            setSpoons(data.newSpoons);
        }
    };

    async function getSpoons() {
        if(userData) {
            const data = await fetch(`${CONSTANTS.backend_url}/users/${userData.userId}/spoons`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('jwt')}`
                }
            });
            const json = (await data.json()).result;
            console.log('SPOONS DATA', json);
            setSpoons(json.current_spoons);
            setMaxSpoons(json.maxSpoons);
        }
    }

    useEffect(() => {
        getSpoons();
    }, [userData])

    const value = {
        modifySpoons,
        getSpoons,
        spoons: customSpoons || spoons,
        maxSpoons: userData ? userData.maxSpoons : customMaxSpoons,
    };

    return <SpoonContext.Provider value={value}>
        {children}
    </SpoonContext.Provider>
}

export const useSpoonContext = () => useContext(SpoonContext);