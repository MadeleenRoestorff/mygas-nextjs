export interface TokenDispatchInterface {
  newToken?: string;
  setToken?: boolean;
  destroyToken?: boolean;
}

const tokenReducer = (
  state: string,
  {
    newToken = "",
    setToken = false,
    destroyToken = false
  }: TokenDispatchInterface
) => {
  if (typeof localStorage !== "undefined") {
    if (newToken) {
      localStorage.setItem("token", newToken);
      return newToken;
    }

    if (setToken) {
      return localStorage.getItem("token");
    }

    if (destroyToken) {
      localStorage.setItem("token", "");
      return "";
    }
  }
  return state;
};

export default tokenReducer;
