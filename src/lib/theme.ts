import {
  Pompiere,
  Annie_Use_Your_Telescope,
  Babylonica,
  Poiret_One,
  Rubik_Glitch,
  Sue_Ellen_Francisco
} from "@next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Poiret One
// Pompiere
// Annie Use Your Telescope
// Babylonica
// Rubik Glitch

export const pompiere = Pompiere({
  weight: "400",
  subsets: ["latin"]
});
export const annie_use_your_telescope = Annie_Use_Your_Telescope({
  weight: "400",
  subsets: ["latin"]
});
export const babylonica = Babylonica({
  weight: "400",
  subsets: ["latin"]
});
export const poiret_one = Poiret_One({
  weight: "400",
  subsets: ["latin"]
});
export const rubik_glitch = Rubik_Glitch({
  weight: "400",
  subsets: ["latin"]
});
export const sue_ellen_francisco = Sue_Ellen_Francisco({
  weight: "400",
  subsets: ["latin"]
});

// Create a theme instance.
const unresponseiveTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f13b5"
    },
    secondary: {
      main: "#00ffff"
    },
    error: {
      main: red.A400
    },
    divider: "#777777"
  },
  typography: {
    fontFamily: sue_ellen_francisco.style.fontFamily,
    h1: {
      textAlign: "center"
    },
    h2: {
      fontWeight: 400
    },
    h3: {
      fontWeight: 400
    },
    h4: {
      fontWeight: 400,
      a: {
        textDecoration: "none"
      },
      "a:hover": {
        textDecoration: "underline"
      }
    },
    linkTitle: {
      textDecoration: "none",
      fontWeight: 400,
      fontSize: "2rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em"
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "32px"
        }
      }
    }
  }
});

const theme = responsiveFontSizes(unresponseiveTheme);
export default theme;
