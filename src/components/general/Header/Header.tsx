import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Link from "../../Link";
import Typography from "@mui/material/Typography";
import Crocuta from "../../../icons/crocuta";
import Grid from "@mui/material/Unstable_Grid2";

interface AppPropsInterface {
  transitionstyle?: number;
}

let transitionAmount = 0;
const navHeight = 64;

export default function Header() {
  const [scrollDown, setScrollDown] = useState(true);
  const [maxScrollDown, setMaxScrollDown] = useState(0);
  const [maxScrollUp, setMaxScrollUp] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const theme = useTheme();
  const height = Number(theme.spacing(8).replace("px", "")) || navHeight;

  useEffect(() => {
    if (typeof window === "undefined")
      return () => {
        // VOID
      };
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setScrollDown(true);
        setMaxScrollDown(window.scrollY);
      } else if (window.scrollY === 0) {
        setScrollDown(true);
      } else {
        // scrolling down
        setScrollDown(false);
        setMaxScrollUp(window.scrollY);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  if (scrollDown) {
    if (lastScrollY - maxScrollUp < height) {
      transitionAmount = lastScrollY - maxScrollUp;
    } else {
      transitionAmount = height;
    }
  } else if (maxScrollDown - lastScrollY < height) {
    transitionAmount = height - maxScrollDown + lastScrollY;
  } else {
    transitionAmount = 0;
  }

  return (
    <AppBarStyling
      elevation={0}
      position="sticky"
      transitionstyle={transitionAmount}
    >
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

const AppBarStyling = styled(AppBar)<AppPropsInterface>`
  border-radius: 0;
  transform: ${({ transitionstyle }) => `translateY(-${transitionstyle}px)`};
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
