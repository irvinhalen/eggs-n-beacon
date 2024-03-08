import { useState, useEffect, useContext, createContext, ReactNode } from 'react';

interface Props {
    children?: ReactNode
}

export interface AuthContextType {
    user: boolean; //boolean is temporary
    loginUser: (userInfo: any) => void;
    logoutUser: () => void;
    registerUser: (userInfo: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<boolean>(false);

    useEffect(() => {
        setLoading(false);
    }, [])
    
    const loginUser = (userInfo:any) => {}
    const logoutUser = () => {}
    const registerUser = (userInfo:any) => {}
    const checkUserStatus = () => {}

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;