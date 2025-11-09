import { createContext } from "react";

export const ShowModalContext = createContext({});

export const ShowModalProvider = ({value, children}) => {

    return (
        <ShowModalContext.Provider value={value}>
            {children}
        </ShowModalContext.Provider>
    );
}