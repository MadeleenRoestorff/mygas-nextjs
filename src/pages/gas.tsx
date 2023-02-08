import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Link from "../components/Link";
import Layout from "../components/general/Layout";

export default function Gas() {
  return (
    <Layout>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Typography variant="h4">Gas Home Page</Typography>
      </Box>
    </Layout>
  );
}
