import { useState, useReducer, Reducer, useEffect } from "react";

import Box from "@mui/material/Box";
import Layout from "../components/general/Layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import GasTable from "../components/gas/GasTable";
import tableReducer from "../components/general/tables/tableReducer";
import apiRequest from "../components/services/ApiRequest";
import { useTokenContext } from "../components/services/TokenContext";

const tempFilter: TableParametersInterface[] = [
  { filterColumnKey: "gasLogID", filterMaxValue: 10, filterMinValue: 2 },
  { filterColumnKey: "units", filterMaxValue: 88, filterMinValue: 20 }
];

export default function GasPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allGasData, setAllGasData] = useState<GasDataInterface[]>([]);
  const tokenContext = useTokenContext();
  const [tableGasData, updateTableGasData] = useReducer<TableReducerType>(
    tableReducer,
    {}
  );

  useEffect(() => {
    // If context token has not yet been set return from useEffect hook
    if (tokenContext.token === "") return;

    // If allGasData has not yet been set make api request to get gas data and setAllGasData
    if (allGasData.length === 0) {
      setLoading(true);
      /**
       * The getResults() function is a void function that makes an apiRequest() to the backend, and then
       * resolves the promise
       */
      const getResults = async () => {
        await apiRequest({
          urlPathName: "gas",
          method: "get",
          tokenContext,
          setError,
          setData: setAllGasData
        });
      };
      void getResults();
    } else {
      updateTableGasData({ displayTableData: allGasData });
      setLoading(false);
    }
  }, [tokenContext, allGasData]);

  const handleReset = () => {
    updateTableGasData({ displayTableData: allGasData });
  };
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
    <Layout>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Typography variant="h4">Gas Home Page</Typography>
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
          <Button onClick={handleFilterTopup} variant="outlined">
            Topup Filter
          </Button>
          <Button onClick={handleSorter} variant="outlined">
            Latest
          </Button>
        </Stack>
        {loading ? (
          <CircularProgress />
        ) : (
          <GasTable gasData={tableGasData.displayTableData} />
        )}
        {error ? <Alert severity="error">{error}</Alert> : null}
      </Box>
    </Layout>
  );
}

type TableReducerType = Reducer<TableStateInteface, TableStateInteface>;
