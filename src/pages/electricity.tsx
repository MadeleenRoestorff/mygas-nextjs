import { useReducer, Reducer } from "react";
import Layout from "../components/general/Layout";
import Button from "@mui/material/Button";

import UtilTablePageLayout from "../components/general/UtilPageLayout";
import tableReducer from "../components/general/tables/tableReducer";

const tempFilter: TableParametersInterface[] = [
  { filterColumnKey: "used", filterMaxValue: 300, filterMinValue: 100 }
];

export default function ElectricityPage() {
  const [elecTableState, updateElecTableState] = useReducer<TableReducerType>(
    tableReducer,
    {}
  );

  const handleFilter = () => {
    updateElecTableState({ tablefilterParams: tempFilter });
  };
  const handleSorter = () => {
    updateElecTableState({ sorted: true });
  };

  return (
    <Layout page="elec">
      <UtilTablePageLayout
        utilTitle="Electricity Home Page"
        urlPathName="electricity"
        updateTableState={updateElecTableState}
        tableDisplayData={elecTableState.displayTableData}
      >
        <Button onClick={handleFilter} variant="outlined">
          Random Filter
        </Button>
        <Button onClick={handleSorter} variant="outlined">
          Latest
        </Button>
      </UtilTablePageLayout>
    </Layout>
  );
}

type TableReducerType = Reducer<TableStateInteface, TableStateInteface>;
