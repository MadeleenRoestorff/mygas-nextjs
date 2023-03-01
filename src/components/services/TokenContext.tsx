import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useEffect,
  useMemo,
  Reducer,
  useContext
} from "react";
import { useRouter, NextRouter } from "next/router";
import tokenReducer from "./tokenReducer";

/* Creating a context object with a token and updateToken property. */
export const tokenStateContext = createContext({
  token: "",
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  updateToken: {} as Dispatch<TokenDispatchInterface>
});

/* This is a function that is used to redirect the user to the login page. */
const loginPathname = "/login";
const goToLogin = async (router: NextRouter): Promise<void> => {
  await router.push({
    pathname: loginPathname,
    query: { redirect: router.pathname }
  });
};

export default function TokenProvider({ children }: { children?: ReactNode }) {
  const [token, updateToken] = useReducer<TokenReducerType>(tokenReducer, "");
  const router = useRouter();

  // This is a useEffect hook that is checking if the token is empty. If it is empty, it checks if
  // the localStorage token is empty and if the router is ready. If all of these are true, it redirects the user
  // to the login page (if not already on the login page). If not, it
  // is setting the context's token to the localStorage token.

  useEffect(() => {
    if (token === "" && typeof localStorage !== "undefined") {
      if (
        !localStorage.getItem("token") &&
        router.isReady &&
        router.pathname !== loginPathname
      ) {
        void goToLogin(router);
      } else {
        updateToken({ setStorageToken: true });
      }
    }
  }, [token, router]);

  const values = useMemo(() => ({ token, updateToken }), [token]);

  return (
    <tokenStateContext.Provider value={values}>
      {children}
    </tokenStateContext.Provider>
  );
}

// Returns the tokenStateContext object
export const useTokenContext = () => {
  const context: TokenContextInterface = useContext(tokenStateContext);
  return context;
};

type TokenReducerType = Reducer<string, TokenDispatchInterface>;

export interface TokenContextInterface {
  token: Partial<string>;
  updateToken: Dispatch<TokenDispatchInterface>;
}
