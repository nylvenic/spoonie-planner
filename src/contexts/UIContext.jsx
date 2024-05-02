import { createContext, useContext } from "react";
import { useState } from "react";
const UIContext = createContext();

export const UIProvider = ({children}) => {
    const [quickAddPopup, setQuickAddPopup] = useState(false);
    const [menuPopup, setMenuPopup] = useState(false);

    function closeModals() {
        setQuickAddPopup(false);
        setMenuPopup(false);
    }

    function modalIsOpened() {
        return quickAddPopup == true || menuPopup == true;
    }

    const value = {
        menuPopup,
        quickAddPopup,
        closeModals,
        setMenuPopup,
        setQuickAddPopup,
        modalIsOpened
    }

    return <UIContext.Provider value={value}>
        {children}
    </UIContext.Provider>
}

export const useUIContext = () => useContext(UIContext);