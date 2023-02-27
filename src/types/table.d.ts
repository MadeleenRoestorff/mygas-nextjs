interface TableParametersInterface {
  filterColumnKey: keyof GasDataInterface | keyof ElecDataInterface;
  filterMaxValue: number | Date | "";
  filterMinValue: number | Date | "";
}

interface TableStateInteface {
  displayTableData?: GasDataInterface[] | ElecDataInterface[];
  tablefilterParams?: TableParametersInterface[];
  sorted?: boolean;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof GasDataInterface | keyof ElecDataInterface;
  label: string;
  numeric: boolean;
}
