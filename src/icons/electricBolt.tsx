import { styled } from "@mui/material/styles";

export default function ElectricBolt() {
  return (
    <SVGStyling height="48" width="48" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.55 43.3q-.4-.4-.425-.975-.025-.575.275-1.075l9.6-13.3-16-1.55q-1.3-.1-1.7-1.325-.4-1.225.55-2.075l20.5-18.35q.45-.45 1.05-.425.6.025 1.05.475.4.4.45.975.05.575-.3 1.025l-9.55 13.35 16 1.5q1.25.15 1.675 1.375.425 1.225-.575 2.025L18.7 43.35q-.45.45-1.075.425Q17 43.75 16.55 43.3Z" />
    </SVGStyling>
  );
}

const SVGStyling = styled("svg")`
  fill: ${({ theme }) => theme.palette.primary.main};
`;
