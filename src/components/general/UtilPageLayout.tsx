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
  updateTableState,
  tableDisplayData
}: {
  utilTitle: string;
  urlPathName: "gas" | "electricity";
  children: ReactNode;
  updateTableState: Dispatch<TableStateInteface>;
  tableDisplayData: GasDataInterface[] | ElecDataInterface[];
}) {
  // Editing and adding Actions States
  const [addNew, setAddNew] = useState(false);
  const [editID, setEditID] = useState(0);

  // Api request states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const tokenContext = useTokenContext();
  const [dataFromServer, setDataFromServer] = useState<
    GasDataInterface[] | ElecDataInterface[]
  >([]);

  // This useEffect is responsible for:
  // Checking authentication by checking the token
  // Check if data from the server has been set
  // and if not triggering a data refresh.
  // Setting the Loading state depending on the serverdata
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
      updateTableState({ displayTableData: dataFromServer });
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContext, dataFromServer, updateTableState, urlPathName]);

  /**
   * TriggerDataRefresh makes a GET request to the server, and then sets the data returned from the server to the state
   * variable `dataFromServer`
   */
  const triggerDataRefresh = async () => {
    if (tokenContext.token && setDataFromServer && urlPathName) {
      // make api request
      await apiRequest({
        urlPathName,
        method: "get",
        tokenContext,
        setError,
        setData: setDataFromServer
      });
      // also cancel edit and addnew actions
      setAddNew(false);
      setEditID(0);
    }
  };

  // HandleReset sets the displayTableData state to the allData state
  const handleReset = () => {
    updateTableState({ displayTableData: dataFromServer });
  };

  // Handling all Actions
  const handleAddNew = () => {
    setAddNew(true);
    setEditID(0);
  };
  const handleEdit = (logID: number) => setEditID(logID);
  const handleCancel = () => {
    setAddNew(false);
    setEditID(0);
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
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        {children}
        <Button onClick={handleAddNew} variant="outlined">
          Add new reading
        </Button>
      </Stack>
      {loading && typeof tableDisplayData === "undefined" ? (
        <CircularProgress sx={{ mt: 4, mb: 4 }} />
      ) : (
        <TableComponent
          triggerDataRefresh={triggerDataRefresh}
          displayData={tableDisplayData}
          addNew={addNew}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          editID={editID}
        />
      )}
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Box>
  );
}
