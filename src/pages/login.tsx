import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTokenContext } from "../components/services/TokenContext";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/system/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import Layout from "../components/general/Layout";

export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<null | Error>(null);
  const [inputs, setInputs] = useState<Inputs>({
    username: { value: "", error: false },
    password: { value: "", error: false }
  });
  const [loading, setLoading] = useState(false);
  const { updateToken } = useTokenContext();

  /**
   * If the username and password inputs are not empty, then send a POST request to the server with the
   * username and password, and if the server responds with a token, then save the token in the browser and as a context
   * and redirect to the redirect query supplied in the router or the home page.
   */
  const handleLogin = () => {
    const newInputs = { ...inputs };

    // Checking if the inputs (username & password) are empty and if they are,
    // it sets the corresponding input error to true.
    Object.entries(newInputs).forEach(([label, val]) => {
      if (val.value.length === 0) {
        newInputs[label].error = true;
        setInputs(newInputs);
      }
    });

    // Check if input errors is false and then send a post axios request
    // to the server with the username and password.
    if (!newInputs.password.error && !newInputs.username.error) {
      setLoading(true);
      setLoginError(null);
      const userData = {
        username: inputs.username.value,
        password: inputs.password.value
      };
      const loginUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/login`;

      console.log(loginUrl);
      axios
        .post(loginUrl, userData)
        .then((response) => {
          if (typeof response.data === "string") {
            updateToken({ saveNewToken: response.data });
            void router.push(
              typeof router.query.redirect === "string"
                ? router.query.redirect
                : "/"
            );
          } else {
            throw Error("Server error, login failed");
          }
        })
        .catch((errorAxios: Error) => {
          setLoginError(errorAxios);
          console.error("errorAxios", errorAxios);
          updateToken({ destroyToken: true });
        });

      setLoading(false);
    }
  };

  return (
    <Layout>
      <Stack component="form" noValidate={false}>
        <Typography variant="h4">Login Page</Typography>
        <>
          {Object.entries(inputs).map(([label, val]) => {
            // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html
            const autoComplete =
              label === "password" ? "current-password" : label;
            const readLabel = label[0].toUpperCase() + label.slice(1);
            return (
              <TextField
                autoComplete={autoComplete}
                error={val.error}
                fullWidth
                id={label}
                key={label}
                label={readLabel}
                margin="normal"
                name={label}
                onChange={(event) => {
                  const newInputs = { ...inputs };
                  newInputs[label].value = event.target.value;
                  newInputs[label].error = false;
                  setInputs(newInputs);
                  setLoginError(null);
                }}
                required
                type={label}
                value={val.value}
              />
            );
          })}
        </>
        <Button onClick={handleLogin} sx={{ mt: 2 }} variant="outlined">
          {loading ? "loading..." : "Sign In"}
        </Button>

        {loading ? <CircularProgress /> : null}
        {loginError ? (
          <Alert severity="error">{loginError.message}</Alert>
        ) : null}
      </Stack>
    </Layout>
  );
}
