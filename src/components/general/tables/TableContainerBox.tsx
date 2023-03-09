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
                {headCells.map(
                  ({ id, numeric, disablePadding, label, width }) => (
                    <TableCell
                      key={id}
                      align={numeric ? "right" : "left"}
                      padding={disablePadding ? "none" : "normal"}
                      sx={{ width: `${width}%` }}
                    >
                      {label}
                    </TableCell>
                  )
                )}
                <TableCell>Actions</TableCell>
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
