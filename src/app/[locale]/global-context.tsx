"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type LogInState = "login" | "2fa" | "loggedIn";

type GlobalContextType = {
  currentBreakpoint: Breakpoint;
  logInState: LogInState;
  setLogInState: (state: LogInState) => void;
};

const defaultValue: GlobalContextType = {
  currentBreakpoint: "2xl",
  logInState: "login",
  setLogInState: () => {},
};

const GlobalContext = createContext<GlobalContextType>(defaultValue);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("2xl");
  const [logInState, setLogInState] = useState<LogInState>("login");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCurrentBreakpoint("xs");
      else if (window.innerWidth < 768) setCurrentBreakpoint("sm");
      else if (window.innerWidth < 1024) setCurrentBreakpoint("md");
      else if (window.innerWidth < 1280) setCurrentBreakpoint("lg");
      else if (window.innerWidth < 1536) setCurrentBreakpoint("xl");
      else setCurrentBreakpoint("2xl");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        currentBreakpoint: currentBreakpoint,
        logInState: logInState,
        setLogInState: setLogInState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
