import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import EditRow from "../general/tables/EditRow";
import TableContainerBox from "../general/tables/TableContainerBox";
import TableRowActions from "../general/tables/TableRowActions";

const headCells: readonly HeadCell[] = [
  {
    id: "gasLogID",
    numeric: false,
    label: "ID",
    width: 12
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
  const errs = false;
  const focus = false;
  const [utilsInputx, setUtilsInputx] = useState<UtilsInputInterface>({
    units: { value: "0", errs, focus },
    topup: { value: "0", errs, focus }
  });

  useEffect(() => {
    if (editID !== 0) {
      let units = 0;
      let topup = 0;
      displayData.forEach((displayDataObject: GasDataInterface) => {
        if (displayDataObject.gasLogID === editID) {
          units = displayDataObject.units;
          topup = displayDataObject.topup;
        }
      });

      const newUtilsInput = { ...utilsInputx };
      newUtilsInput.units.value = units.toString();
      newUtilsInput.topup.value = topup.toString();
      setUtilsInputx(newUtilsInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editID, displayData]);

  return (
    <>
      <InvisibleDiv>{JSON.stringify(utilsInputx)}</InvisibleDiv>
      <TableContainerBox headCells={headCells} tableLable="Gas Data">
        {addNew ? (
          <EditRow
            handleCancel={handleCancel}
            triggerDataRefresh={triggerDataRefresh}
            urlPath="gas"
            utilsInputx={utilsInputx}
            setUtilsInputx={setUtilsInputx}
          />
        ) : null}
        {displayData?.map(({ gasLogID, topup, units, measuredAt, rate }) => {
          if (editID !== 0 && editID === gasLogID) {
            return (
              <EditRow
                key={`tablerow-${gasLogID}-editrow`}
                logID={editID}
                urlPath="gas"
                // units={units}
                // topup={topup}
                utilsInputx={utilsInputx}
                setUtilsInputx={setUtilsInputx}
                measuredAt={measuredAt}
                handleCancel={handleCancel}
                triggerDataRefresh={triggerDataRefresh}
              />
            );
          }
          return (
            <TableRow hover key={`tablerow-${gasLogID}`}>
              <TableCell id={`gas-cell-${gasLogID}`}>{gasLogID}</TableCell>
              <TableCell align="right">{units > 0 ? units : "-"}</TableCell>
              <TableCell align="right">{rate === 0 ? "-" : rate}</TableCell>
              <TableCell align="right">{topup}</TableCell>
              <TableCell align="right">
                {`${measuredAt.toDateString()} ${measuredAt.toLocaleTimeString(
                  "en-UK"
                )}`}
              </TableCell>
              <TableCell align="right">
                <TableRowActions handleClick={() => handleEdit(gasLogID)} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableContainerBox>
    </>
  );
}

// Invisible div to fix mobile issues with inputs that are absolute
const InvisibleDiv = styled("div")`
  visibility: hidden;
  height: 0;
  width: 0;
`;
