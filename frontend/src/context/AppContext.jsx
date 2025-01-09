import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log('Backend URL:', backendUrl);    
    const [isLoggedin, setIsLoggedin] = useState(false);
    console.log('Is Logged In:', isLoggedin);
    const [userData, setUserData] = useState(null);
    const [dataforuse, setDataforuse] = useState(null);
    


     const getAuthState = async () => {
        try {
            console.log('Checking auth state...');
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Auth response:', data);
            const setDataforuse = data;
            console.log('Data for use:', setDataforuse);


            if (data.success) {
                try {
                    const userResponse = await axios.get(`${backendUrl}/api/user/data`, {
                        withCredentials: true,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log('User data response:', userResponse.data); // Debug log

                    if (userResponse.data.success) {
                        const mergedData = {
                            ...data.user,
                            ...userResponse.data.userData,
                            isAccountVerified: userResponse.data.userData.isAccountVerified
                        };
                        console.log('Merged user data:', mergedData); // Debug log
                        setIsLoggedin(true);
                        setUserData(mergedData);
                    }
                } catch (userError) {
                    console.error('User Data Error:', userError);
                }
            }
        } catch (error) {
            console.error('Auth State Error:', error);
            setIsLoggedin(false);
            setUserData(null);
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

  


    const value = { 
        backendUrl, 
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getAuthState,
        dataforuse,
        setDataforuse
    }

   

        return (
                <AppContext.Provider value={value}>
                    {children}
                </AppContext.Provider>
            );

        }
        export default AppContextProvider;

