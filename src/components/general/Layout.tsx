import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Link from "../../components/Link";
import Typography from "@mui/material/Typography";
import Crocuta from "../../icons/crocuta";
import Grid from "@mui/material/Unstable_Grid2";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export default function Layout({ children = null, className = "", isHomePage = false }) {
  const trigger = useScrollTrigger({
    threshold: 0
  });
  return (
    <LayoutStyling className={className}>
      <AppBar position="sticky" elevation={trigger ? 1 : 0}>
        <Grid container columns={3}>
          <InnerGridStyling xs={1} justifyContent="flex-start">
            <Typography variant="h4">
              <Link href="/">My Gas App</Link>
            </Typography>
          </InnerGridStyling>
          <InnerGridStyling xs={1} justifyContent="center">
            <Crocuta />
          </InnerGridStyling>
          <InnerGridStyling xs={1} justifyContent="flex-end">
            <Typography variant="h4">
              <Link href="/">Quick Link 1</Link>
            </Typography>
            <Typography variant="h4">
              <Link href="/">Quick Link 2</Link>
            </Typography>
          </InnerGridStyling>
        </Grid>
      </AppBar>
      <Container>{children}</Container>
      <StyledFooter>
        <FooterSectionStyling>
          {!isHomePage && (
            <BackToHomeLinkStyling>
              <Link href="/">&larr; Back to home</Link>
            </BackToHomeLinkStyling>
          )}
        </FooterSectionStyling>
        <CopyrightTextStyling>
          {`Copyright © ${new Date().getFullYear()} - Madeleen Roestorff - All Rights Reserved.`}
        </CopyrightTextStyling>
        <FooterSectionStyling />
      </StyledFooter>
    </LayoutStyling>
  );
}

const LayoutStyling = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const StyledFooter = styled("footer")`
  width: 100%;
  height: 51px;
  border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackToHomeLinkStyling = styled("div")`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FooterSectionStyling = styled("div")`
  min-width: 150px;
`;

const CopyrightTextStyling = styled("div")`
  justify-content: center;
`;
