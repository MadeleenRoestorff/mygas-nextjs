import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainerBox from "../general/tables/TableContainerBox";

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
    id: "measuredAt",
    numeric: true,
    disablePadding: false,
    label: "Date"
  }
];

const emptyArray: GasDataInterface[] = [];
export default function GasTable({
  gasData = emptyArray
}: {
  gasData: GasDataInterface[];
}) {
  return (
    <TableContainerBox headCells={headCells} tableLable="Gas Data">
      {gasData?.map(({ gasLogID, topup, units, measuredAt }, index) => {
        const labelId = `table-${index}`;
        return (
          <TableRow hover key={`tablerow-${gasLogID}`}>
            <TableCell sx={{ width: "10%" }} id={labelId}>
              {gasLogID}
            </TableCell>
            <TableCell align="right" sx={{ width: "30%" }}>
              {units}
            </TableCell>
            <TableCell align="right" sx={{ width: "30%" }}>
              {topup}
            </TableCell>
            <TableCell align="right" sx={{ width: "30%" }}>
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
