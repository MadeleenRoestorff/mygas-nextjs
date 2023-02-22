interface TokenDispatchInterface {
  saveNewToken?: string;
  setStorageToken?: boolean;
  destroyToken?: boolean;
}

interface InputValues {
  value: string;
  error: boolean;
}
interface Inputs {
  [key: string]: InputValues;
}
