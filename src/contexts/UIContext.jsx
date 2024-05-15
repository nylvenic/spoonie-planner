import { createContext, useContext } from "react";
import { useState } from "react";
const UIContext = createContext();

export const UIProvider = ({children, 
    initialQuickAddPopup=false, 
    initialMenuPopup=false,
    customCloseModals,
    customSetMenuPopup,
    customSetQuickAddPopup,
    customModalIsOpened,
}) => {
    const [quickAddPopup, setQuickAddPopup] = useState(initialQuickAddPopup);
    const [menuPopup, setMenuPopup] = useState(initialMenuPopup);

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
        closeModals: customCloseModals || closeModals,
        setMenuPopup: customSetMenuPopup || setMenuPopup,
        setQuickAddPopup: customSetQuickAddPopup || setQuickAddPopup,
        modalIsOpened: customModalIsOpened || modalIsOpened
    }

    return <UIContext.Provider value={value}>
        {children}
    </UIContext.Provider>
}

export const useUIContext = () => useContext(UIContext);