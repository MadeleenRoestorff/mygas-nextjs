import {
  Pompiere,
  Annie_Use_Your_Telescope,
  Babylonica,
  Poiret_One,
  Rubik_Glitch,
  Sue_Ellen_Francisco,
  Open_Sans
} from "@next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Poiret One
// Pompiere
// Annie Use Your Telescope
// Babylonica
// Rubik Glitch
// Roboto_Mono

export const pompiere = Pompiere({
  weight: "400",
  subsets: ["latin"]
});
export const annieUseYourTelescope = Annie_Use_Your_Telescope({
  weight: "400",
  subsets: ["latin"]
});
export const babylonica = Babylonica({
  weight: "400",
  subsets: ["latin"]
});
export const poiretOne = Poiret_One({
  weight: "400",
  subsets: ["latin"]
});
export const rubikGlitch = Rubik_Glitch({
  weight: "400",
  subsets: ["latin"]
});
export const sueEllenFrancisco = Sue_Ellen_Francisco({
  weight: "400",
  subsets: ["latin"]
});
export const openSans = Open_Sans({
  weight: "400",
  subsets: ["latin"]
});

// Create a theme instance.
const unresponseiveTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#865DFF"
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
    fontFamily: openSans.style.fontFamily,
    h1: {
      textAlign: "center",
      fontFamily: pompiere.style.fontFamily
    },
    h2: {
      fontWeight: 400,
      fontFamily: pompiere.style.fontFamily
    },
    h3: {
      fontWeight: 400,
      fontFamily: pompiere.style.fontFamily,
      a: {
        textDecoration: "none"
      }
    },
    h4: {
      fontWeight: 400,
      fontFamily: pompiere.style.fontFamily,
      a: {
        textDecoration: "none"
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
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "capitalize",
          "&.Mui-focused": {
            color: theme.palette.primary.light
          }
        })
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`
          }
        })
      }
    },

    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          position: "relative",
          textDecoration: "none",
          "&::before": {
            content: "''",
            position: "absolute",
            width: 0,
            height: "2px",
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.primary.main,
            visibility: "hidden",
            transition: "all 0.3s ease-in-out"
          },
          "&:hover::before": {
            visibility: "visible",
            width: "100%"
          }
        })
      },
      defaultProps: { underline: "none" }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: pompiere.style.fontFamily,
          letterSpacing: "1px"
        }
      }
    }
  }
});

// -webkit-tap-highlight-color
const theme = responsiveFontSizes(unresponseiveTheme, { factor: 3 });
export default theme;
