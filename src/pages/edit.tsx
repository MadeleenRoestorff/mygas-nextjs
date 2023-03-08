import { useState, useEffect } from "react";
import Layout from "../components/general/Layout";

import Alert from "@mui/material/Alert";

import apiRequest from "../components/services/apiRequest";
import { useTokenContext } from "../components/services/TokenContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function EditPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const tokenContext = useTokenContext();
  const [utilData, setUtilData] = useState<ElecDataInterface>();

  useEffect(() => {
    // If context token has not yet been set return from useEffect hook
    if (tokenContext.token === "") return;

    // If allData has not yet been set make api request to get gas / electricity data and setAllData
    if (utilData) {
      setLoading(false);
    } else {
      setLoading(true);
      /**
       * The getResults() function is a void function that makes an apiRequest() to the backend, and then
       * resolves the promise
       */
      const getResults = async () => {
        await apiRequest({
          urlPathName: "electricity/1",
          method: "get",
          tokenContext,
          setError,
          setData: setUtilData
        });
      };
      void getResults();
    }
  }, [tokenContext, utilData, setUtilData]);
  const { ElecLogID, electricity, measuredAt } = utilData;

  return (
    <Layout page="elec">
      <div>{ElecLogID}</div>
      <div>{electricity}</div>
      <div>{measuredAt.toDateString()}</div>
      {loading ? <CircularProgress sx={{ mt: 4 }} /> : null}
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Layout>
  );
}
