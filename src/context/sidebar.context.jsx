import { createContext, useState } from 'react'

export const SidebarContext = createContext({
    isMatchesOpen: false,
    setIsMatchesOpen: () => {},
    isMessagesOpen: false,
    setIsMessagesOpen: () => {},
})

export const SidebarProvider = ({ children }) => {
    const [ isMatchesOpen, setIsMatchesOpen ] = useState(false);
    const [ isMessagesOpen, setIsMessagesOpen ] = useState(false);
    const value = { isMatchesOpen, setIsMatchesOpen, isMessagesOpen, setIsMessagesOpen };

    return (
        <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
    )
}