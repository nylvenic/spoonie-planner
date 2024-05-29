import { useContext, createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const jwt = Cookies.get('jwt');
        if(jwt) {
            const decodedToken = jwtDecode(jwt);
            setUserData(decodedToken)
            setIsLoggedIn(true);
        }
    }, []);

    function login(token) {
        if(token) {
            Cookies.set('jwt', token, { expires: 3, secure: true, sameSite: 'Strict' });
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                setUserData(decodedToken);
                setIsLoggedIn(true);
            } else {
                logout(); // Clears the expired token
            }
        }
    }

    function logout() {
        Cookies.remove('jwt');
        setUserData(null);
        setIsLoggedIn(false);
    }

    return <AuthContext.Provider value={{logout, login, userData, isLoggedIn}}>
        {children}
    </AuthContext.Provider>
}