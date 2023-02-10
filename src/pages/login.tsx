import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/system/Stack";

import Layout from "../components/general/Layout";

const value = "";
const err = false;

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: { value, err },
    password: { value, err }
  });
  const [loading, setLoading] = useState(false);

  async function LoginResult() {
    const newInputs = { ...inputs };
    Object.entries(newInputs).map(([label, val]) => {
      if (val.value.length === 0) {
        newInputs[label].err = true;
        setInputs(newInputs);
      }
    });

    if (!newInputs.password.err && !newInputs.username.err) {
      setLoading(true);
      setError("");
      try {
        const data = {
          username: inputs.username.value,
          password: inputs.password.value
        };
        const response = await axios.post("http://localhost:8000/login", data);
        if (response.data) {
          localStorage.setItem("token", response.data);
          //   add if to check if token is set before redirect
          router.push(typeof router.query.redirect === "string" ? router.query.redirect : "/");
        } else {
          setError("Server error, login failed");
        }
      } catch (err) {
        setError(err);
        console.error(err);
      }
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Stack component="form" noValidate={false}>
        <Typography variant="h4">Login Page</Typography>
        <>
          {Object.entries(inputs).map(([label, val]) => {
            // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html
            const autoComplete = label === "password" ? "current-password" : label;
            const readLabel = label[0].toUpperCase() + label.slice(1);
            return (
              <TextField
                key={label}
                error={val.err}
                margin="normal"
                required
                fullWidth
                id={label}
                label={readLabel}
                name={label}
                type={label}
                autoComplete={autoComplete}
                value={val.value}
                onChange={(e) => {
                  const newInputs = { ...inputs };
                  newInputs[label].value = e.target.value;
                  newInputs[label].err = false;
                  setInputs(newInputs);
                  setError("");
                }}
              />
            );
          })}
        </>
        <Button variant="outlined" onClick={LoginResult} sx={{ mt: 2 }}>
          {loading ? "loading..." : "Sign In"}
        </Button>
        {error && <Alert severity="error">{error.message}</Alert>}
      </Stack>
    </Layout>
  );
}
