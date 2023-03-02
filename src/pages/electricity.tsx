import { useReducer, Reducer } from "react";
import Layout from "../components/general/Layout";
import Button from "@mui/material/Button";

import ElectricityTable from "../components/electricity/ElecTable";
import UtilTablePageLayout from "../components/general/UtilPageLayout";
import tableReducer from "../components/general/tables/tableReducer";

const tempFilter: TableParametersInterface[] = [
  { filterColumnKey: "used", filterMaxValue: 300, filterMinValue: 100 }
];

export default function ElectricityPage() {
  const [elecTableData, updateElecTableData] = useReducer<TableReducerType>(
    tableReducer,
    {}
  );

  const handleFilter = () => {
    updateElecTableData({ tablefilterParams: tempFilter });
  };
  const handleSorter = () => {
    updateElecTableData({ sorted: true });
  };

  return (
    <Layout>
      <UtilTablePageLayout
        utilTitle="Electricity Home Page"
        urlPathName="electricity"
        updateTableData={updateElecTableData}
        tableComponent={
          <ElectricityTable elecData={elecTableData.displayTableData} />
        }
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
