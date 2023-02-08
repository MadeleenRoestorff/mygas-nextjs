import Typography from "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    linkTitle: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions extends Typography {
    linkTitle?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    linkTitle: true;
  }
}
