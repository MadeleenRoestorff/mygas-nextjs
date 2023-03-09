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

import ElectricityTable from "../electricity/ElecTable";
import GasTable from "../gas/GasTable";

export default function UtilTablePageLayout({
  utilTitle = "Gas",
  urlPathName = "gas",
  children,
  updateTableData,
  tableDisplayData
}: {
  utilTitle: string;
  urlPathName: "gas" | "electricity";
  children: ReactNode;
  updateTableData: Dispatch<TableStateInteface>;
  tableDisplayData: GasDataInterface[] | ElecDataInterface[];
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const tokenContext = useTokenContext();
  const [dataFromServer, setDataFromServer] = useState<
    GasDataInterface[] | ElecDataInterface[]
  >([]);

  useEffect(() => {
    // If context token has not yet been set return from useEffect hook
    if (tokenContext.token === "") return;

    // If dataFromServer has not yet been set make api request to get gas / electricity data and setAllData
    if (dataFromServer.length === 0) {
      setLoading(true);
      // triggerDataRefresh() is a void function that makes an apiRequest() to the backend,
      // the returned Promise<void> is resolved below/here
      void triggerDataRefresh();
    } else {
      updateTableData({ displayTableData: dataFromServer });
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContext, dataFromServer, updateTableData, urlPathName]);

  /**
   * TriggerDataRefresh makes a GET request to the server, and then sets the data returned from the server to the state
   * variable `dataFromServer`
   */
  const triggerDataRefresh = async () => {
    if (tokenContext.token && setDataFromServer && urlPathName) {
      await apiRequest({
        urlPathName,
        method: "get",
        tokenContext,
        setError,
        setData: setDataFromServer
      });
      setAddNew(false);
    }
  };

  // handleReset sets the displayTableData state to the allData state
  const handleReset = () => {
    updateTableData({ displayTableData: dataFromServer });
  };

  const handleAddNew = () => {
    setAddNew(true);
  };

  const TableComponent = urlPathName === "gas" ? GasTable : ElectricityTable;

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      <Typography variant="h3">{utilTitle}</Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent={{ sm: "center", xs: "flex-start" }}
        sx={{
          mt: 2,
          overflowX: "auto",
          width: "-webkit-fill-available",
          px: 1
        }}
      >
        <Button onClick={handleAddNew} variant="outlined">
          Add new reading
        </Button>
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        {children}
      </Stack>
      {loading && typeof tableDisplayData === "undefined" ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <TableComponent
          triggerDataRefresh={triggerDataRefresh}
          displayData={tableDisplayData}
          addNew={addNew}
        />
      )}
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Box>
  );
}
