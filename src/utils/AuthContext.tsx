import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import Axios from 'axios';

interface Props {
    children?: ReactNode
}

export interface AuthContextType {
    user: any;
    loginUser: (userInfo: any) => void;
    logoutUser: () => void;
    // registerUser: (userInfo: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider = ({ children }: Props) => {
        const [loading, setLoading] = useState<boolean>(false);
        const [user, setUser] = useState(() => {
        const localValue = localStorage.getItem('user');
            if (localValue == null) {
                return []
            }
            return JSON.parse(localValue);
        });
    
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
    }, [user])

    useEffect(() => {
        var localUser = JSON.parse(localStorage.getItem('user') || '{}');
        if(localUser){
            setUser(localUser);
        }
        checkUserStatus();
    }, []);

    const loginUser = (userInfo:any) => {
        setLoading(true);
        Axios.post('http://localhost:3001/api/login', {
            username: userInfo.username,
            password: userInfo.password
        }).then((response:any) => {
            console.log(response);
            if (response.status === 200){
                if(response.data.status === 'success') {
                    let accountDetails = response.data[0];
                    // let token = response.data.token;
                    setUser(accountDetails);
                }
            }
        }).catch((error:any) => {
            console.error('Error during login:', error);
            setLoading(false);
        });
    }
    
    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        Axios.post('http://localhost:3001/api/logout', {
            user: user
        }).then((response:any) => {
            console.log(response);
            setUser(null);
        });
    }

    // const registerUser = (userInfo:Object) => {}
    const checkUserStatus = () => {
        if(user){
            setLoading(false);
        }
    }

    const contextData = {
        user,
        loginUser,
        logoutUser,
        // registerUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthContext;