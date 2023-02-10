import React from "react";
import { useGlobalState } from "../components/services/TokenContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const ConsumerGas = () => {
  const { setToken, token } = useGlobalState();
  console.log(token);
  console.log(typeof setToken);

  const submitFunction = () => {
    setToken("bem");
    console.log(token);
  };

  return (
    <Box sx={{ flexGrow: 1, my: 2 }}>
      <Typography variant="h4">Gas Home Page</Typography>
      <Button variant="outlined" onClick={submitFunction} sx={{ mt: 2 }}>
        1
      </Button>
    </Box>
  );
};

export default ConsumerGas;
