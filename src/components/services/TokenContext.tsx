import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useReducer,
  useEffect,
  useMemo
} from "react";
import { useRouter, NextRouter } from "next/router";
import tokenReducer, { TokenDispatchInterface } from "./tokenReducer";

export interface TokenContextInterface {
  token: Partial<string>;
  updateToken: Dispatch<TokenDispatchInterface>;
}
const TokenStateContext = createContext({
  token: "" as Partial<string>,
  updateToken: {} as Dispatch<TokenDispatchInterface>
});

const loginPathname = "/login";
const goToLogin = async (router: NextRouter): Promise<void> => {
  await router.push({
    pathname: loginPathname,
    query: { redirect: router.pathname }
  });
};

export default function TokenProvider({ children }: { children: ReactNode }) {
  const [token, updateToken] = useReducer(tokenReducer, "");
  const router = useRouter();
  useEffect(() => {
    if (token.length === 0) {
      if (
        localStorage.getItem("token").length === 0 &&
        router.isReady &&
        router.pathname !== loginPathname
      ) {
        console.log("gotologin");
        void goToLogin(router);
      } else {
        updateToken({ setToken: true });
      }
    }
  }, [token.length, router]);

  const values = useMemo(() => ({ token, updateToken }), [token]);

  return (
    <TokenStateContext.Provider value={values}>
      {children}
    </TokenStateContext.Provider>
  );
}

export const useTokenContext = () => {
  const context = useContext(TokenStateContext);
  return context;
};
