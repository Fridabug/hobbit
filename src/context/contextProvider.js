import { createContext } from 'react';

const Context = createContext();
export const contextProvider = ({children}) => {
    return (
        <Context.Provider value={{
            
        }}>
           {children}     
        </Context.Provider>
    )
}

export default Context;