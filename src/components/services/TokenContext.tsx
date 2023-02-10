import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode
} from "react";

const GlobalStateContext = createContext({
  token: "" as Partial<string>,
  setToken: {} as Dispatch<SetStateAction<Partial<string>>>
});

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  return (
    <GlobalStateContext.Provider value={{ token, setToken }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  return context;
};

export { GlobalStateProvider, useGlobalState };
