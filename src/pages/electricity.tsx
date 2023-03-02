import { useState, useReducer, Reducer, useEffect } from "react";
import Box from "@mui/material/Box";
import Layout from "../components/general/Layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import ElectricityTable from "../components/electricity/elecTable";
import tableReducer from "../components/general/tables/tableReducer";
import apiRequest from "../components/services/ApiRequest";
import { useTokenContext } from "../components/services/TokenContext";

const tempFilter: TableParametersInterface[] = [
  { filterColumnKey: "used", filterMaxValue: 300, filterMinValue: 100 }
];

export default function ElectricityPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allElecData, setAllElecData] = useState<ElecDataInterface[]>([]);
  const tokenContext = useTokenContext();
  const [elecTableData, updateElecTableData] = useReducer<TableReducerType>(
    tableReducer,
    {}
  );

  useEffect(() => {
    // If context token has not yet been set return from useEffect hook
    if (tokenContext.token === "") return;

    // If allElecData has not yet been set make api request to get electricity data and setAllElecData
    if (allElecData.length === 0) {
      setLoading(true);
      /**
       * The getResults() function is a void function that makes an apiRequest() to the backend, and then
       * resolves the promise
       */
      const getResults = async () => {
        await apiRequest({
          urlPathName: "electricity",
          method: "get",
          tokenContext,
          setError,
          setData: setAllElecData
        });
      };
      void getResults();
    } else {
      updateElecTableData({ displayTableData: allElecData });
      setLoading(false);
    }
  }, [tokenContext, allElecData]);

  const handleReset = () => {
    updateElecTableData({ displayTableData: allElecData });
  };
  const handleFilter = () => {
    updateElecTableData({ tablefilterParams: tempFilter });
  };
  const handleSorter = () => {
    updateElecTableData({ sorted: true });
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Typography variant="h4">Electricity Home Page</Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
          <Button onClick={handleFilter} variant="outlined">
            Random Filter
          </Button>
          <Button onClick={handleSorter} variant="outlined">
            Latest
          </Button>
        </Stack>
        {loading ? (
          <CircularProgress />
        ) : (
          <ElectricityTable elecData={elecTableData.displayTableData} />
        )}
        {error ? <Alert severity="error">{error}</Alert> : null}
      </Box>
    </Layout>
  );
}

type TableReducerType = Reducer<TableStateInteface, TableStateInteface>;
