import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainerBox from "../general/tables/TableContainerBox";
import EditElecRow from "./EditElecRow";
import TableRowActions from "../general/TableRowActions";

const headCells: readonly HeadCell[] = [
  {
    id: "ElecLogID",
    numeric: false,
    label: "ID",
    width: 4
  },
  {
    id: "electricity",
    numeric: true,
    label: "Total",
    width: 32
  },
  {
    id: "used",
    numeric: true,
    label: "Usage",
    width: 32
  },
  {
    id: "measuredAt",
    numeric: true,
    label: "Date",
    width: 32
  }
];

const emptyArray: ElecDataInterface[] = [];
export default function ElectricityTable({
  displayData = emptyArray,
  triggerDataRefresh,
  addNew
}: {
  displayData?: ElecDataInterface[];
  triggerDataRefresh?: () => Promise<void>;
  addNew: boolean;
}) {
  const [editID, setEditID] = useState(0);
  const handleEdit = (ElecLogID: number): void => {
    setEditID(ElecLogID);
  };

  return (
    <TableContainerBox headCells={headCells} tableLable="Electricity Data">
      {addNew ? (
        <EditElecRow edit={setEditID} triggerDataRefresh={triggerDataRefresh} />
      ) : null}
      {displayData?.map(({ ElecLogID, electricity, used, measuredAt }) => {
        if (editID !== 0 && editID === ElecLogID) {
          return (
            <EditElecRow
              key={`tablerow-${ElecLogID}`}
              ElecLogID={ElecLogID}
              electricity={electricity}
              measuredAt={measuredAt}
              edit={setEditID}
              triggerDataRefresh={triggerDataRefresh}
            />
          );
        }
        return (
          <TableRow hover key={`tablerow-${ElecLogID}`}>
            <TableCell id={`elec-cell-${ElecLogID}`}>{ElecLogID}</TableCell>
            <TableCell align="right">{electricity}</TableCell>
            <TableCell align="right">{used}</TableCell>
            <TableCell align="right">
              {measuredAt.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </TableCell>
            <TableCell align="right">
              <TableRowActions handleClick={() => handleEdit(ElecLogID)} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableContainerBox>
  );
}
