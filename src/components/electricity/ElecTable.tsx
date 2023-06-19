import { useState, useEffect } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainerBox from "../general/tables/TableContainerBox";
import EditRow from "../general/tables/EditRow";
import TableRowActions from "../general/tables/TableRowActions";

const headCells: readonly HeadCell[] = [
  {
    id: "ElecLogID",
    numeric: false,
    label: "ID",
    width: 12
  },
  {
    id: "electricity",
    numeric: true,
    label: "Total",
    width: 24
  },
  {
    id: "used",
    numeric: true,
    label: "Usage",
    width: 24
  },
  {
    id: "measuredAt",
    numeric: true,
    label: "Date",
    width: 44
  }
];

const emptyArray: ElecDataInterface[] = [];
export default function ElectricityTable({
  displayData = emptyArray,
  triggerDataRefresh,
  addNew,
  handleEdit,
  handleCancel,
  editID
}: {
  displayData: ElecDataInterface[];
  triggerDataRefresh: () => Promise<void>;
  addNew: boolean;
  handleEdit: (_logID: number) => void;
  handleCancel: () => void;
  editID: number;
}) {
  const errs = false;
  const focus = false;
  const [utilsInputx, setUtilsInputx] = useState<UtilsInputInterface>({
    electricity: { value: "", errs, focus }
  });

  useEffect(() => {
    if (editID !== 0) {
      let electricity = 0;
      displayData.forEach((displayDataObject: ElecDataInterface) => {
        if (displayDataObject.ElecLogID === editID) {
          electricity = displayDataObject.electricity;
        }
      });

      const newUtilsInput = { ...utilsInputx };
      newUtilsInput.electricity.value = electricity.toString();
      setUtilsInputx(newUtilsInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editID, displayData]);

  console.log("DEBUG", JSON.stringify(utilsInputx));

  return (
    <TableContainerBox headCells={headCells} tableLable="Electricity Data">
      {addNew ? (
        <EditRow
          handleCancel={handleCancel}
          triggerDataRefresh={triggerDataRefresh}
          urlPath="electricity"
          utilsInputx={utilsInputx}
          setUtilsInputx={setUtilsInputx}
        />
      ) : null}
      {displayData?.map(({ ElecLogID, electricity, used, measuredAt }) => {
        if (editID !== 0 && editID === ElecLogID) {
          return (
            <EditRow
              key={`tablerow-${ElecLogID}-editrow`}
              logID={ElecLogID}
              urlPath="electricity"
              // electricity={electricity}
              utilsInputx={utilsInputx}
              setUtilsInputx={setUtilsInputx}
              measuredAt={measuredAt}
              handleCancel={handleCancel}
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
