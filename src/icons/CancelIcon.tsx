import { styled } from "@mui/material/styles";

export default function CancelIcon() {
  return (
    <SVGStyling xmlns="http://www.w3.org/2000/svg" height="24" width="24">
      <path d="M8.45 16.85 12 13.3l3.55 3.55 1.3-1.3L13.3 12l3.55-3.55-1.3-1.3L12 10.7 8.45 7.15l-1.3 1.3L10.7 12l-3.55 3.55Zm3.55 4.9q-2.025 0-3.8-.775t-3.087-2.088Q3.8 17.575 3.025 15.8 2.25 14.025 2.25 12t.775-3.8Q3.8 6.425 5.113 5.1 6.425 3.775 8.2 3.012 9.975 2.25 12 2.25t3.8.775q1.775.775 3.1 2.087 1.325 1.313 2.088 3.088.762 1.775.762 3.8t-.775 3.8q-.775 1.775-2.087 3.087-1.313 1.313-3.088 2.088-1.775.775-3.8.775Zm0-1.875q3.3 0 5.587-2.3 2.288-2.3 2.288-5.575 0-3.3-2.288-5.588Q15.3 4.125 12 4.125q-3.275 0-5.575 2.287Q4.125 8.7 4.125 12q0 3.275 2.3 5.575 2.3 2.3 5.575 2.3ZM12 12Z" />
    </SVGStyling>
  );
}

const SVGStyling = styled("svg")`
  fill: ${({ theme }) => theme.palette.primary.main};
`;