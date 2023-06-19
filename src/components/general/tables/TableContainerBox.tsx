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

// TableContainerBox's main functions are
// Styling the table
// Layout of the table
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
                    className={`${id}`}
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
    position: relative;
  }
`;

interface ExtraTableCellProps {
  columnwidth?: number;
}
const TableCellStyling = styled(TableCell)<ExtraTableCellProps>`
  &.measuredAt {
    width: 34%;
  }
  &.gasLogID,
  &.ElecLogID {
    width: 82px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    &.gasLogID,
    &.ElecLogID {
      width: 57px;
    }
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
`;
