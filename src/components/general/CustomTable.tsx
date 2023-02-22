/* eslint-disable react/no-multi-comp */
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface HeadCell {
  disablePadding: boolean;
  id: keyof GasDataInterface;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "gasLogID",
    numeric: false,
    disablePadding: false,
    label: "ID"
  },
  {
    id: "units",
    numeric: true,
    disablePadding: false,
    label: "Units"
  },
  {
    id: "topup",
    numeric: true,
    disablePadding: false,
    label: "Topup"
  },

  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Created On"
  },
  {
    id: "updatedAt",
    numeric: true,
    disablePadding: false,
    label: "Updated On"
  }
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
const emptyArray: GasDataInterface[] = [];
export default function CustomTable({
  gasData = emptyArray
}: {
  gasData: GasDataInterface[];
}) {
  return (
    <Box sx={{ width: "80%", m: "auto" }}>
      <Paper sx={{ my: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="Gas Data"
            size="medium"
          >
            <EnhancedTableHead />
            <TableBody>
              {gasData?.map(
                ({ gasLogID, createdAt, topup, units, updatedAt }, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={`enhanced-table-checkbox-${gasLogID}`}
                    >
                      <TableCell component="th" id={labelId}>
                        {gasLogID}
                      </TableCell>
                      <TableCell align="right">{units}</TableCell>
                      <TableCell align="right">{topup}</TableCell>
                      <TableCell align="right">
                        {`${createdAt.toDateString()} ${createdAt.toLocaleTimeString(
                          "en-UK"
                        )}`}
                      </TableCell>
                      <TableCell align="right">
                        {`${updatedAt.toDateString()} ${updatedAt.toLocaleTimeString(
                          "en-UK"
                        )}`}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
