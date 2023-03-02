import { useReducer, Reducer } from "react";
import Button from "@mui/material/Button";

import Layout from "../components/general/Layout";
import GasTable from "../components/gas/GasTable";
import UtilTablePageLayout from "../components/general/UtilPageLayout";
import tableReducer from "../components/general/tables/tableReducer";

const tempFilter: TableParametersInterface[] = [
  { filterColumnKey: "gasLogID", filterMaxValue: 10, filterMinValue: 2 },
  { filterColumnKey: "units", filterMaxValue: 88, filterMinValue: 20 }
];

export default function GasPage() {
  const [tableGasData, updateTableGasData] = useReducer<TableReducerType>(
    tableReducer,
    {}
  );

  const handleFilter = () => {
    updateTableGasData({ tablefilterParams: tempFilter });
  };
  const handleFilterTopup = () => {
    updateTableGasData({
      tablefilterParams: [
        { filterColumnKey: "topup", filterMaxValue: "", filterMinValue: 1 }
      ]
    });
  };
  const handleSorter = () => {
    updateTableGasData({ sorted: true });
  };

  return (
    <Layout page="gas">
      <UtilTablePageLayout
        utilTitle="Gas Home Page"
        urlPathName="gas"
        updateTableData={updateTableGasData}
        tableComponent={<GasTable gasData={tableGasData.displayTableData} />}
      >
        <Button onClick={handleFilter} variant="outlined">
          Random Filter
        </Button>
        <Button onClick={handleFilterTopup} variant="outlined">
          Topup Filter
        </Button>
        <Button onClick={handleSorter} variant="outlined">
          Latest
        </Button>
      </UtilTablePageLayout>
    </Layout>
  );
}

type TableReducerType = Reducer<TableStateInteface, TableStateInteface>;
