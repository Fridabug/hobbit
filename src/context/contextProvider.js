import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [loggedStatus, setLoggedStatus] = useLocalStorage(
    'userLoggedIn',
    false
  );
  const [profileSwitch, setProfileSwitch] = useState(true);
  const onEditHandler = () => {
    setProfileSwitch((pre) => (pre = !pre));
  };
  return (
    <Context.Provider
      value={{ onEditHandler, profileSwitch, loggedStatus, setLoggedStatus }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
