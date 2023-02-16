import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../components/Link";
import ProTip from "../components/ProTip";
import Copyright from "../components/Copyright";

export default function About() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography component="h1" gutterBottom variant="h4">
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Box maxWidth="sm">
          <Button component={Link} href="/" noLinkStyle variant="contained">
            Go to the home page
          </Button>
          <Link color="secondary" href="/about">
            Go to the about page
          </Link>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
