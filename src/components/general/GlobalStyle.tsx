import { css, Global } from "@emotion/react";
import * as React from "react";

const cssGlobal = css`
  :root {
    color-scheme: dark;
  }

  .MuiTextField-root,
  .MuiInputLabel-root,
  .MuiFormControl-root,
  .MuiInputAdornment-root {
    & label.Mui-focused {
      color: white;
    }

    & .MuiInput-underline:after {
      border-color: white;
    }

    & .MuiInputBase-colorPrimary {
      color: white;
    }

    & label,
    & p {
      color: white;
    }

    & .MuiOutlinedInput-root {
      & fieldset {
        border-color: white;
      }

      &:hover fieldset {
        border-color: white;
      }

      &.Mui-focused fieldset {
        border-color: white;
      }
    }
  }
`;

export default function GlobalStyle() {
  return <Global styles={cssGlobal} />;
}
