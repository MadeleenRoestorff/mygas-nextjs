import {
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  ComponentType
} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import apiRequest from "../services/apiRequest";
import { useTokenContext } from "../services/TokenContext";

interface UtilTableInterface {
  displayData?: GasDataInterface[] | ElecDataInterface[];
  setAllData?: Dispatch<
    SetStateAction<GasDataInterface[] | ElecDataInterface[]>
  >;
}

export default function UtilTablePageLayout({
  utilTitle = "Gas",
  urlPathName = "gas",
  TableComponent,
  children,
  updateTableData,
  tableDisplayData
}: {
  utilTitle: string;
  urlPathName: string;
  TableComponent: ComponentType<UtilTableInterface>;
  children: ReactNode;
  updateTableData: Dispatch<TableStateInteface>;
  tableDisplayData: GasDataInterface[] | ElecDataInterface[];
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
      </Stack>
      {loading && !tableDisplayData ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <TableComponent
          setAllData={setAllData}
          displayData={tableDisplayData}
        />
      )}
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Box>
  );
}
