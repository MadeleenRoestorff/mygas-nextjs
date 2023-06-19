import { useReducer, Reducer } from "react";
import Button from "@mui/material/Button";

import Layout from "../components/general/Layout";
import UtilTablePageLayout from "../components/general/UtilPageLayout";
import tableReducer from "../components/general/tables/tableReducer";

export default function GasPage() {
  const [gasTableState, updateGasTableState] = useReducer<TableReducerType>(
    tableReducer,
    {}
  );

  const handleFilterTopup = () => {
    updateGasTableState({
      tablefilterParams: [
        { filterColumnKey: "topup", filterMaxValue: "", filterMinValue: 1 }
      ]
    });
  };
  const handleSorter = () => {
    updateGasTableState({ sorted: true });
  };

  return (
    <Layout page="gas">
      <UtilTablePageLayout
        utilTitle="Gas Home Page"
        urlPathName="gas"
        updateTableState={updateGasTableState}
        tableDisplayData={gasTableState.displayTableData}
      >
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
