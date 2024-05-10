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
    console.log(userData);
    
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
        spoons,
        maxSpoons: userData ? userData.maxSpoons : 12,
    };

    return <SpoonContext.Provider value={value}>
        {children}
    </SpoonContext.Provider>
}

export const useSpoonContext = () => useContext(SpoonContext);