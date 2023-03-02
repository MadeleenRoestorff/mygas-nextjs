import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Link from "../Link";
import Header from "./header/Header";

export default function Layout({
  children,
  className = "",
  isHomePage = false
}: {
  children: ReactNode;
  className?: string;
  isHomePage?: boolean;
}) {
  return (
    <LayoutStyling className={className}>
      <Header />
      <ContainerStyling>{children}</ContainerStyling>
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

const ContainerStyling = styled(Container)`
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding-left: 0;
    padding-right: 0;
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
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    flex-direction: column;
    margin-top: ${({ theme }) => theme.spacing(1)};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    padding-left: ${({ theme }) => theme.spacing(2)};
    padding-right: ${({ theme }) => theme.spacing(2)};
  }
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
