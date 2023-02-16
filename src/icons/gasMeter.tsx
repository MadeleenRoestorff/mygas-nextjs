import { styled } from "@mui/system";

export default function GasMeter() {
  return (
    <SVGStyling height="48" width="48" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.2 43.75q-3.35 0-5.65-2.325-2.3-2.325-2.3-5.625V16.1q0-3.35 2.3-5.675Q12.85 8.1 16.2 8.1h2.4V4.25h2.85V8.1h5.15V4.25h2.85V8.1h2.4q3.3 0 5.625 2.325T39.8 16.1v19.7q0 3.3-2.325 5.625T31.85 43.75Zm0-2.9h15.65q2.1 0 3.575-1.45t1.475-3.6V16.05q0-2.1-1.475-3.575T31.85 11H16.2q-2.15 0-3.625 1.475T11.1 16.05V35.8q0 2.15 1.475 3.6 1.475 1.45 3.625 1.45ZM16.25 19H31.8v-2.9H16.25ZM24 34.65q1.65 0 2.8-1.125t1.15-2.725q0-1.3-.75-2.225T24 24.8q-2.45 2.9-3.175 3.8-.725.9-.725 2.15 0 1.65 1.15 2.775T24 34.65ZM11.1 11v29.85V11Z" />
    </SVGStyling>
  );
}

const SVGStyling = styled("svg")`
  fill: ${({ theme }) => theme.palette.primary.main};
`;
