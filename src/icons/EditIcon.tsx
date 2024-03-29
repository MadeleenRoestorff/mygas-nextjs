import { styled } from "@mui/material/styles";

export default function EditIcon() {
  return (
    <SVGStyling xmlns="http://www.w3.org/2000/svg" height="24" width="24">
      <path d="M5.15 18.825h1.3l8.675-8.675-1.3-1.3-8.675 8.675Zm13.975-10-3.975-3.95 1.325-1.325q.55-.55 1.337-.55.788 0 1.313.55l1.325 1.325q.525.525.538 1.3.012.775-.513 1.3Zm-1.325 1.35L7.25 20.7H3.275v-3.975L13.825 6.2ZM14.475 9.5l-.65-.65 1.3 1.3Z" />
    </SVGStyling>
  );
}

const SVGStyling = styled("svg")`
  fill: ${({ theme }) => theme.palette.primary.main};
`;
