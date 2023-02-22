interface GasDataInterface {
  gasLogID?: number;
  createdAt?: Date;
  topup?: number;
  units?: number;
  updatedAt?: Date;
  uuid?: string;
}

interface GasFilterParametersInterface {
  filterColumnKey: keyof GasDataInterface;
  filterMaxValue: number | Date | "";
  filterMinValue: number | Date | "";
}

interface GasTableStateInteface {
  displayTableGasData?: GasDataInterface[];
  tablefilterParams?: GasFilterParametersInterface[];
  sorted?: boolean;
}
