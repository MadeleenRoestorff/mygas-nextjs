import { styled } from "@mui/system";

export default function Heat() {
  return (
    <SVGStyling height="48" width="48" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.95 28q0 3.2 1.475 6.025T16.5 38.7q-.2-.65-.3-1.3-.1-.65-.1-1.3 0-1.55.575-2.975T18.4 30.6l5.6-5.55 5.6 5.55q1.15 1.1 1.75 2.525.6 1.425.6 2.975 0 .65-.1 1.3t-.3 1.3q2.6-1.85 4.075-4.675Q37.1 31.2 37.1 28q0-2.7-1.175-5.3-1.175-2.6-3.325-4.8-1.1.75-2.25 1.175-1.15.425-2.3.425-3 0-5-2.075t-2-5.275v-1q-2.3 1.7-4.175 3.725-1.875 2.025-3.2 4.2-1.325 2.175-2.025 4.45-.7 2.275-.7 4.475ZM24 29.1l-3.6 3.55q-.7.7-1.075 1.575T18.95 36.1q0 2.05 1.475 3.5Q21.9 41.05 24 41.05q2.15 0 3.625-1.45t1.475-3.5q0-1-.375-1.875T27.6 32.65Zm-.05-23v6.5q0 1.7 1.2 2.875t2.9 1.175q.9 0 1.7-.375.8-.375 1.4-1.175l.9-1.05q3.65 2.15 5.775 5.875Q39.95 23.65 39.95 28q0 6.65-4.65 11.275T24 43.9q-6.65 0-11.275-4.625T8.1 28q0-6.35 4.25-12.275Q16.6 9.8 23.95 6.1Z" />
    </SVGStyling>
  );
}

const SVGStyling = styled("svg")`
  fill: ${({ theme }) => theme.palette.primary.main};
`;
