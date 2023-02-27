import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

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
    <Box sx={{ width: "80%", m: "auto" }}>
      <Paper sx={{ my: 2, borderRadius: 1 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby={tableLable}>
            <TableHead>
              <TableRow>
                {headCells.map(({ id, numeric, disablePadding, label }) => (
                  <TableCell
                    key={id}
                    align={numeric ? "right" : "left"}
                    padding={disablePadding ? "none" : "normal"}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
