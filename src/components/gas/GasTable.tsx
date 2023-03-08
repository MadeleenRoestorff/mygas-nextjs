import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainerBox from "../general/tables/TableContainerBox";

const headCells: readonly HeadCell[] = [
  {
    id: "gasLogID",
    numeric: false,
    disablePadding: false,
    label: "ID",
    width: 10
  },
  {
    id: "units",
    numeric: true,
    disablePadding: false,
    label: "Units",
    width: 20
  },
  {
    id: "rate",
    numeric: true,
    disablePadding: false,
    label: "Units/week",
    width: 20
  },
  {
    id: "topup",
    numeric: true,
    disablePadding: false,
    label: "Topup",
    width: 20
  },

  {
    id: "measuredAt",
    numeric: true,
    disablePadding: false,
    label: "Date",
    width: 20
  }
];

const emptyArray: GasDataInterface[] = [];
export default function GasTable({
  displayData = emptyArray,
  triggerDataRefresh
}: {
  displayData: GasDataInterface[];
  triggerDataRefresh: () => Promise<void>;
}) {
  console.log(triggerDataRefresh);
  return (
    <TableContainerBox headCells={headCells} tableLable="Gas Data">
      {displayData?.map(({ gasLogID, topup, units, measuredAt, rate }) => {
        const labelId = `table-${gasLogID}`;
        return (
          <TableRow hover key={`tablerow-${gasLogID}`}>
            <TableCell id={labelId}>{gasLogID}</TableCell>
            <TableCell align="right">{units > 0 ? units : "-"}</TableCell>
            <TableCell align="right">{rate === 0 ? "-" : rate}</TableCell>
            <TableCell align="right">{topup}</TableCell>
            <TableCell align="right">
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
