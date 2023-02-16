import { useState } from "react";

import Box from "@mui/material/Box";
import Layout from "../components/general/Layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import apiRequest from "../components/services/ApiRequest";
import { useTokenContext } from "../components/services/TokenContext";

export default function GasPage() {
  const [error, setError] = useState("");
  const context = useTokenContext();

  const getResults = (): void => {
    new Promise((resolve) => {
      void (async () => {
        await apiRequest({
          urlPathName: "gas",
          method: "get",
          context,
          setError
        });
        resolve("ready");
      })();
      //   () at the end Immediately invokes the void async funtion
    }).catch((promiseError: Error) => console.error(promiseError));
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Typography variant="h4">Gas Home Page</Typography>
        <Button onClick={getResults} sx={{ mt: 2 }} variant="outlined">
          hello there
        </Button>
        {error ? <Alert severity="error">{error}</Alert> : null}
      </Box>
    </Layout>
  );
}
