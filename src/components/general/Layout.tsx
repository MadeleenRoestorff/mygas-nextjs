import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Header from "./header/Header";

export default function Layout({
  children,
  className = "",
  page = ""
}: {
  children: ReactNode;
  page?: string;
  className?: string;
}) {
  return (
    <LayoutStyling className={className}>
      <Header page={page} />
      <ContainerStyling>{children}</ContainerStyling>
      <StyledFooter>
        {`Copyright © ${new Date().getFullYear()} - Madeleen Roestorff - All Rights Reserved.`}
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
  padding: ${({ theme }) => theme.spacing(1)};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding-left: ${({ theme }) => theme.spacing(2)};
    padding-right: ${({ theme }) => theme.spacing(2)};
  }
`;
