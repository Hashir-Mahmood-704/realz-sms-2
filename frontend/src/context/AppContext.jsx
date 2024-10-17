import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('realz_sol_user_data'))
    );
    return <AppContext.Provider value={{ userData, setUserData }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { useAppContext };
export default AppContextProvider;
