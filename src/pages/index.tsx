import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

import Link from "../components/Link";
import Layout from "../components/general/Layout";

import Heat from "../icons/heat";
import ElectricBolt from "../icons/electricBolt";
import Balance from "../icons/balance";

const content = [
  { title: "Gas", Icon: Heat, link: "/gas" },
  { title: "Electricity", Icon: ElectricBolt, link: "/" },
  { title: "Budget", Icon: Balance, link: "/" }
];

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {content.map(({ title, Icon, link }, index) => {
            return (
              <Grid key={`cotent${index}`} xs={12} md={6}>
                <Paper
                  onClick={() => router.push(link)}
                  sx={{ cursor: "pointer", p: 4, textAlign: "center" }}
                >
                  <Icon />
                  <Typography variant="h4">{title}</Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Layout>
  );
}
