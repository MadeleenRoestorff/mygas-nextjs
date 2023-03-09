/* eslint-disable react/jsx-max-depth */
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";

export default function TableContainerBox({
  children,
  headCells,
  tableLable = "Data"
}: {
  children: ReactNode;
  headCells: readonly HeadCell[];
  tableLable?: string;
}) {
  return (
    <BoxStyling sx={{ width: "80%", m: "auto" }}>
      <Paper sx={{ my: 2, borderRadius: 1 }}>
        <TableContainer>
          <Table aria-labelledby={tableLable}>
            <TableHead>
              <TableRow>
                {headCells.map(({ id, numeric, label, width }) => (
                  <TableCellStyling
                    key={id}
                    align={numeric ? "right" : "left"}
                    padding="normal"
                    columnwidth={width}
                  >
                    {label}
                  </TableCellStyling>
                ))}
                <ActionTableCellStyling align="right" padding="normal">
                  Actions
                </ActionTableCellStyling>
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </BoxStyling>
  );
}

const BoxStyling = styled(Box)`
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: 100%;
    margin: 0;
  }
`;

interface ExtraTableCellProps {
  columnwidth?: number;
}
const TableCellStyling = styled(TableCell)<ExtraTableCellProps>`
  width: ${({ theme, columnwidth }) => {
    const colomnWidthAdjust = Number(theme.spacing(4).replace("px", "")) + 80;
    return `calc(${columnwidth}% - ${
      (columnwidth * colomnWidthAdjust) / 100
    }px)`;
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    min-width: ${({ columnwidth }) => {
      return `${columnwidth * 4.6}px`;
    }};
  }
`;
const ActionTableCellStyling = styled(TableCell)`
  width: ${({ theme }) => {
    const colomnWidthAdjust = Number(theme.spacing(4).replace("px", "")) + 80;
    return `${colomnWidthAdjust}px`;
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    min-width: ${({ theme }) => {
      const colomnWidthAdjust = Number(theme.spacing(4).replace("px", "")) + 80;
      return `${colomnWidthAdjust}px`;
    }};
  }
`;
