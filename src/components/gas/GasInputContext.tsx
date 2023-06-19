/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
  useContext,
  useMemo
} from "react";

const errs = false;
const focus = false;
const initalGasInput = {
  units: { value: "0", errs, focus },
  topup: { value: "0", errs, focus }
};

export const gasInputStateContext = createContext<GasInputInterface>({
  utilsInputx: initalGasInput,
  setUtilsInputx: {} as Dispatch<SetStateAction<UtilsInputInterface>>
});

export default function GasInputProvider({
  children
}: {
  children?: ReactNode;
}) {
  const [utilsInputx, setUtilsInputx] =
    useState<UtilsInputInterface>(initalGasInput);

  const values = useMemo(
    () => ({ utilsInputx, setUtilsInputx }),
    [utilsInputx]
  );

  return (
    <gasInputStateContext.Provider value={values}>
      {children}
    </gasInputStateContext.Provider>
  );
}

export const useGasInputContext = () => {
  const gasInput: GasInputInterface = useContext(gasInputStateContext);
  return gasInput;
};

export interface GasInputInterface {
  utilsInputx: UtilsInputInterface;
  setUtilsInputx: Dispatch<SetStateAction<UtilsInputInterface>>;
}
