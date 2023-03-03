import { useRouter, NextRouter } from "next/router";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

import Layout from "../components/general/Layout";

import Heat from "../icons/heat";
import ElectricBolt from "../icons/electricBolt";
import Balance from "../icons/balance";

const content = [
  { title: "Gas", Icon: Heat, link: "/gas" },
  { title: "Electricity", Icon: ElectricBolt, link: "/electricity" },
  { title: "Budget", Icon: Balance, link: "/login" }
];

/**
 * The function takes a link as a string and a Next.js router,
 * and then it uses the Next Router to push the user to that link
 * @param {NextRouter} router - NextRouter - This is the router object that Next.js provides.
 * @param {string} link - string - The link to direct to.
 */
const directToLink = (router: NextRouter, link: string): void => {
  /* A promise that resolves when the router has pushed the link. */
  /* () at the end Immediately invokes the void async funtion */
  /* to make sure routePush returns void and not a Promise<void>*/
  new Promise((resolve) => {
    void (async () => {
      await router.push(link);
      resolve("");
    })();
  }).catch((promiseError: Error) => console.error(promiseError));
};

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, my: 2, px: 2, overflow: "hidden" }}>
        <Grid container justifyContent="center" spacing={2}>
          {content.map(({ title, Icon, link }) => {
            return (
              <Grid key={title} md={6} xs={12}>
                <Paper
                  onClick={() => directToLink(router, link)}
                  sx={{ cursor: "pointer", p: 4, textAlign: "center" }}
                >
                  <Icon />
                  <Typography variant="h3">{title}</Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Layout>
  );
}
