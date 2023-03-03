import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Link from "../../Link";
import Typography from "@mui/material/Typography";
import Crocuta from "../../../icons/crocuta";
import Grid from "@mui/material/Unstable_Grid2";
import { rubikGlitch } from "../../../lib/theme";

export default function Header({ page = "" }: { page?: string }) {
  return (
    <AppBarStyling elevation={1} position="sticky">
      <Grid columns={12} container>
        <InnerGridStyling
          className="title"
          justifyContent="flex-start"
          xs={6}
          md={4}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: rubikGlitch.style.fontFamily }}
          >
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
          <Typography variant="h3" className={page === "gas" ? "hl" : ""}>
            <Link href="/gas">Gas</Link>
          </Typography>
          <Typography variant="h3" className={page === "elec" ? "hl" : ""}>
            <Link href="/electricity">Electricity</Link>
          </Typography>
          <Typography variant="h3" className={page === "login" ? "hl" : ""}>
            <Link href="/login">Login</Link>
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
  h3 {
    &.hl {
      text-shadow: 0px 4px 3px rgba(2, 2, 2, 0.6),
        0px 8px 13px rgba(0, 0, 0, 0.9), 0px 18px 23px rgba(0, 0, 0, 0.1);
    }
    padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  }
  svg {
    max-height: ${({ theme }) => theme.spacing(8)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    h3 {
      padding: 0 ${({ theme }) => theme.spacing(2)};
    }
    &.logo {
      justify-content: flex-end;
      padding-right: ${({ theme }) => theme.spacing(2)};
    }
    &.navlinks {
      justify-content: center;
      padding-bottom: ${({ theme }) => theme.spacing(1)};
    }
    &.title {
      padding-top: ${({ theme }) => theme.spacing(1)};
      padding-bottom: ${({ theme }) => theme.spacing(1)};
    }
  }
`;
