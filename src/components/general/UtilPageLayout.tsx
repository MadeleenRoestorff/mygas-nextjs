import { useState, useEffect, ReactNode, Dispatch } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import apiRequest from "../services/apiRequest";
import { useTokenContext } from "../services/TokenContext";

export default function UtilTablePageLayout({
  utilTitle = "Gas",
  urlPathName = "gas",
  tableComponent,
  children,
  updateTableData
}: {
  utilTitle: string;
  urlPathName: string;
  tableComponent: ReactNode;
  children: ReactNode;
  updateTableData: Dispatch<TableStateInteface>;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const tokenContext = useTokenContext();
  const [allData, setAllData] = useState<
    GasDataInterface[] | ElecDataInterface[]
  >([]);

  useEffect(() => {
    // If context token has not yet been set return from useEffect hook
    if (tokenContext.token === "") return;

    // If allData has not yet been set make api request to get gas / electricity data and setAllData
    if (allData.length === 0) {
      setLoading(true);
      /**
       * The getResults() function is a void function that makes an apiRequest() to the backend, and then
       * resolves the promise
       */
      const getResults = async () => {
        await apiRequest({
          urlPathName,
          method: "get",
          tokenContext,
          setError,
          setData: setAllData
        });
      };
      void getResults();
    } else {
      updateTableData({ displayTableData: allData });
      setLoading(false);
    }
  }, [tokenContext, allData, setAllData, updateTableData, urlPathName]);

  // handleReset sets the displayTableData state to the allData state
  const handleReset = () => {
    updateTableData({ displayTableData: allData });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        my: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography variant="h4">{utilTitle}</Typography>
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
        {children}
      </Stack>
      {loading ? <CircularProgress sx={{ mt: 4 }} /> : tableComponent}
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Box>
  );
}
