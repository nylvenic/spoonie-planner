import React, { useCallback } from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CONSTANTS from "../models/utils/CONSTANTS";
import Cookies from "js-cookie";
import User from "../models/User/UserManager";
import dayjs from "dayjs";
const SpoonContext = createContext();

export const SpoonContextProvider = ({ children, customSpoons=0, customMaxSpoons=0 }) => {
    const {userData, login} = useAuth();
    const [spoons, setSpoons] = useState(customSpoons || (userData ? userData.maxSpoons : 0));
    const [maxSpoons, setMaxSpoons] = useState(customMaxSpoons || (userData ? userData.maxSpoons : 0));

    const modifySpoons = useCallback(async ({cost, replenish, maxSpoons}) => {
        if(userData) {
            const {newSpoons} = await User.changeSpoons({id: userData.userId, cost, replenish, maxSpoons})
            setSpoons(newSpoons);
        }
    }, [userData, maxSpoons]);

    const getSpoons = useCallback(async () => {
        if(userData && !userData.test) {
            const data = await fetch(`${CONSTANTS.backend_url}/users/${userData.userId}/spoons`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('jwt')}`
                }
            });
            const json = (await data.json()).result;
            setSpoons(json.current_spoons);
            setMaxSpoons(json.max_spoons);
        }
    }, [userData, setSpoons, setMaxSpoons]);

    const isResetNecessary = useCallback(async () => {
        if(userData) {
            const today = new Date(); // Get current date in YYYY-MM-DD format
            const dayString = today.toISOString().slice(0, 10);
            const lastVisitedData = await User.getLastVisited({id: userData.userId}); // this date from my db needs to match the date to my local pc
            const lastVisitedString = new Date(lastVisitedData.result.last_visited * 1000).toISOString().slice(0, 10);
            if ((dayString !== lastVisitedString) && userData) {
                await modifySpoons({cost: maxSpoons, replenish: true, maxSpoons: maxSpoons});
                // Update last visited date
                const {token} = await User.changeLastVisited({id: userData.userId, newDate: dayjs(today).unix()});
                login(token);
            }
        }
    }, [maxSpoons]);

    useEffect(() => {
        isResetNecessary();
    }, [maxSpoons]);

    useEffect(() => {
        getSpoons();
    }, [userData, maxSpoons]);

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