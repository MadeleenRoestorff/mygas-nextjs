import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Link from "../Link";
import Typography from "@mui/material/Typography";
import Crocuta from "../../icons/crocuta";
import Grid from "@mui/material/Unstable_Grid2";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export default function Layout({
  children,
  className = "",
  isHomePage = false
}: {
  children: ReactNode;
  className?: string;
  isHomePage?: boolean;
}) {
  const trigger = useScrollTrigger({
    threshold: 0
  });
  return (
    <LayoutStyling className={className}>
      <AppBarStyling elevation={trigger ? 1 : 0} position="sticky">
        <Grid columns={3} container>
          <InnerGridStyling justifyContent="flex-start" xs={1}>
            <Typography variant="h4">
              <Link href="/">My Gas App</Link>
            </Typography>
          </InnerGridStyling>
          <InnerGridStyling justifyContent="center" xs={1}>
            <Crocuta />
          </InnerGridStyling>
          <InnerGridStyling justifyContent="flex-end" xs={1}>
            <Typography variant="h4">
              <Link href="/gas">Gas</Link>
            </Typography>
            <Typography variant="h4">
              <Link href="/electricity">Electricity</Link>
            </Typography>
          </InnerGridStyling>
        </Grid>
      </AppBarStyling>
      <Container>{children}</Container>
      <StyledFooter>
        <FooterSectionStyling>
          {isHomePage ? (
            <BackToHomeLinkStyling>
              <Link href="/">{"&larr; Back to home"}</Link>
            </BackToHomeLinkStyling>
          ) : null}
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

const AppBarStyling = styled(AppBar)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
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
  margin-top: ${({ theme }) => theme.spacing(3)};
  width: 100%;
  height: ${({ theme }) => theme.spacing(7)};
  border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackToHomeLinkStyling = styled("div")`
  flex-direction: column;
  justify-content: center;
`;

const FooterSectionStyling = styled("div")`
  min-width: 150px;
`;

const CopyrightTextStyling = styled("div")`
  justify-content: center;
`;
