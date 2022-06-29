import { createContext, useState } from 'react';

const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [profileSwitch, setProfileSwitch] = useState(false);
  const onEditHandler = () => {
    setProfileSwitch((pre) => (pre = !pre));
  };
  return (
    <Context.Provider value={{ onEditHandler, profileSwitch }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
