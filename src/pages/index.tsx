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
  { title: "Budget", Icon: Balance, link: "/login" }
];

export default function Home() {
  const router = useRouter();

  const routePush = (link: string): void => {
    new Promise((resolve) => {
      void (async () => {
        await router.push(link);
        resolve("ready");
      })();
      //   () at the end Immediately invokes the void async funtion
    }).catch((promiseError: Error) => console.error(promiseError));
  };

  return (
    <Layout>
      <Link color="secondary" href="/about">
        Go to the about page
      </Link>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container justifyContent="center" spacing={2}>
          {content.map(({ title, Icon, link }) => {
            return (
              <Grid key={title} md={6} xs={12}>
                <Paper
                  onClick={() => routePush(link)}
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
