import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    // const [loginState, setLoginState] = useState(null);

    const userIsLoggedIn = !!token;
    console.log(userIsLoggedIn);

    const loginHandler = (token) => {
        console.log(token)
        setToken(token);
        // setLoginState(true);
    };

    const logoutHandler = () => {
        setToken(null);
        // setLoginState(false);
    };
    
    // const userIsLoggedIn = loginState;
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    console.log(contextValue);

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
