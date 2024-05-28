import React, { createContext, useState, useContext, useCallback } from 'react';
import viteLogo from '../../public/vite.svg';

// Create the context
const NotificationContext = createContext(null);

// Provider component that encapsulates your application
export const NotificationProvider = ({ children }) => {
    const [isEnabled, setIsEnabled] = useState(false);  // Track if notifications are enabled

    const requestNotificationPermission = useCallback(() => {
        Notification.requestPermission().then(permission => {
            setIsEnabled(permission === 'granted');
        });
    }, []);

    const showNotification = useCallback((title, message) => {
        if (isEnabled) {
            new Notification(title, { body: message, icon: viteLogo });
        }
    }, [isEnabled]);

    // Context value that will be supplied to any consumer components
    const value = {
        requestNotificationPermission,
        showNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

// Hook to use the notification context
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
