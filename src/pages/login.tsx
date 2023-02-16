import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTokenContext } from "../components/services/TokenContext";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/system/Stack";

import Layout from "../components/general/Layout";

interface InputValues {
  value: string;
  error: boolean;
}
interface Inputs {
  [key: string]: InputValues;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<null | Error>(null);
  const [inputs, setInputs] = useState<Inputs>({
    username: { value: "", error: false },
    password: { value: "", error: false }
  });
  const [loading, setLoading] = useState(false);
  const { updateToken } = useTokenContext();

  const handleLogin = () => {
    const newInputs = { ...inputs };

    Object.entries(newInputs).forEach(([label, val]) => {
      if (val.value.length === 0) {
        newInputs[label].error = true;
        setInputs(newInputs);
      }
    });

    if (!newInputs.password.error && !newInputs.username.error) {
      setLoading(true);
      setError(null);
      const userData = {
        username: inputs.username.value,
        password: inputs.password.value
      };
      const loginUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/login`;

      axios
        .post(loginUrl, userData)
        .then((response) => {
          if (typeof response.data === "string") {
            updateToken({ newToken: response.data });
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
          setError(errorAxios);
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
                  setError(null);
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
        {/* {error ? <Alert severity="error">{error.message}</Alert> : null} */}
        {error ? <Alert severity="error">{error.message}</Alert> : null}
      </Stack>
    </Layout>
  );
}
