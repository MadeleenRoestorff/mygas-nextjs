import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainerBox from "../general/tables/TableContainerBox";

const headCells: readonly HeadCell[] = [
  {
    id: "ElecLogID",
    numeric: false,
    disablePadding: false,
    label: "ID"
  },
  {
    id: "electricity",
    numeric: true,
    disablePadding: false,
    label: "Total"
  },
  {
    id: "used",
    numeric: true,
    disablePadding: false,
    label: "Usage"
  },
  {
    id: "measuredAt",
    numeric: true,
    disablePadding: false,
    label: "Date"
  }
];

const emptyArray: ElecDataInterface[] = [];
export default function ElectricityTable({
  elecData = emptyArray
}: {
  elecData: ElecDataInterface[];
}) {
  return (
    <TableContainerBox headCells={headCells} tableLable="Electricity Data">
      {elecData?.map(({ ElecLogID, electricity, used, measuredAt }, index) => {
        const labelId = `table-${index}`;
        return (
          <TableRow hover key={`tablerow-${ElecLogID}`}>
            <TableCell sx={{ width: "4%" }} id={labelId}>
              {ElecLogID}
            </TableCell>
            <TableCell align="right" sx={{ width: "32%" }}>
              {electricity}
            </TableCell>
            <TableCell align="right" sx={{ width: "32%" }}>
              {used}
            </TableCell>
            <TableCell align="right" sx={{ width: "32%" }}>
              {`${measuredAt.toDateString()} ${measuredAt.toLocaleTimeString(
                "en-UK"
              )}`}
            </TableCell>
          </TableRow>
        );
      })}
    </TableContainerBox>
  );
}
