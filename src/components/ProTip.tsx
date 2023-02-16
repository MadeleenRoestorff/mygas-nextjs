import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function ProTip() {
  return (
    <Typography color="text.secondary" sx={{ mt: 6, mb: 3 }}>
      {"Pro tip: See more"}{" "}
      <Link href="https://mui.com/getting-started/templates/">templates</Link>{" "}
      on the MUI documentation.
    </Typography>
  );
}
