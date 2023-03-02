import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Link from "../../Link";
import Typography from "@mui/material/Typography";
import Crocuta from "../../../icons/crocuta";
import Grid from "@mui/material/Unstable_Grid2";

export default function Header() {
  return (
    <AppBarStyling elevation={1} position="sticky">
      <Grid columns={12} container>
        <InnerGridStyling
          className="title"
          justifyContent="flex-start"
          xs={6}
          md={4}
        >
          <Typography variant="h4">
            <Link href="/">My Utilities App</Link>
          </Typography>
        </InnerGridStyling>
        <InnerGridStyling
          className="logo"
          justifyContent="center"
          xs={6}
          md={4}
        >
          <Crocuta />
        </InnerGridStyling>
        <InnerGridStyling
          className="navlinks"
          justifyContent="flex-end"
          xs={12}
          md={4}
        >
          <Typography variant="h4">
            <Link href="/gas">Gas</Link>
          </Typography>
          <Typography variant="h4">
            <Link href="/electricity">Electricity</Link>
          </Typography>
          <Typography variant="h4">
            <Link href="/electricity">Login</Link>
          </Typography>
        </InnerGridStyling>
      </Grid>
    </AppBarStyling>
  );
}

const AppBarStyling = styled(AppBar)`
  border-radius: 0;
`;

const InnerGridStyling = styled(Grid)`
  display: flex;
  align-items: center;
  h4 {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
  svg {
    max-height: ${({ theme }) => theme.spacing(8)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    &.logo {
      justify-content: flex-end;
      padding-right: ${({ theme }) => theme.spacing(2)};
    }
    &.navlinks {
      justify-content: center;
    }
  }
`;
