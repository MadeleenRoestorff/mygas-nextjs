import React from "react";
import Box from "@mui/material/Box";
import Layout from "../components/general/Layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useGlobalState } from "../components/services/TokenContext";
import ConsumerGas from "../components/ConsumerGas";

const Gas = () => {
  const { setToken, token } = useGlobalState();

  console.log(token);
  console.log(typeof setToken);

  const submitFunction = () => {
    setToken("bem");
    console.log(token);
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <ConsumerGas />
        <Typography variant="h4">Gas Home Page</Typography>
        <Button variant="outlined" onClick={submitFunction} sx={{ mt: 2 }}>
          1
        </Button>
      </Box>
    </Layout>
  );
};

export default Gas;
