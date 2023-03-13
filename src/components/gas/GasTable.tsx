import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainerBox from "../general/tables/TableContainerBox";

const headCells: readonly HeadCell[] = [
  {
    id: "gasLogID",
    numeric: false,
    label: "ID",
    width: 10
  },
  {
    id: "units",
    numeric: true,
    label: "Units",
    width: 20
  },
  {
    id: "rate",
    numeric: true,
    label: "Units/week",
    width: 20
  },
  {
    id: "topup",
    numeric: true,
    label: "Topup",
    width: 20
  },

  {
    id: "measuredAt",
    numeric: true,
    label: "Date",
    width: 20
  }
];

const emptyArray: GasDataInterface[] = [];
export default function GasTable({
  displayData = emptyArray,
  triggerDataRefresh,
  addNew,
  handleEdit,
  handleCancel,
  editID
}: {
  displayData: GasDataInterface[];
  triggerDataRefresh: () => Promise<void>;
  addNew: boolean;
  handleEdit: (_logID: number) => void;
  handleCancel: () => void;
  editID: number;
}) {
  console.log(triggerDataRefresh, addNew, handleEdit, handleCancel, editID);
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
