import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import apiRequest from "../services/apiRequest";
import { useTokenContext } from "../services/TokenContext";
import TableRowActions from "../general/TableRowActions";
import Grow from "@mui/material/Grow";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { Moment } from "moment";
// import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

// const initialDate = new Date("1992-04-17");
const initialDate = new Date();

export default function EditElecRow({
  ElecLogID = 0,
  electricity = 0,
  measuredAt = initialDate,
  triggerDataRefresh,
  handleCancel
}: {
  ElecLogID?: number;
  electricity?: number;
  measuredAt?: Date;
  triggerDataRefresh?: () => Promise<void>;
  handleCancel: () => void;
}) {
  const [elec, setElec] = useState(electricity.toString());
  const [date, setDate] = useState<Moment>(moment(measuredAt));
  const [error, setError] = useState("");
  const tokenContext = useTokenContext();

  const handleSave = () => {
    if (Number(elec) > 0) {
      setError("");
      const payload = {
        electricity: Number(elec),
        measuredAt: date.toISOString()
      };
      const method = ElecLogID ? "patch" : "post";
      const urlPathName = `electricity${ElecLogID ? `/${ElecLogID}` : ""}`;
      const getResults = async () => {
        await apiRequest({
          urlPathName,
          method,
          tokenContext,
          setError,
          payload
        });
      };
      void getResults().finally(() => {
        void triggerDataRefresh();
      });
    } else {
      setError("Cannot save");
    }
  };

  return (
    <Grow in>
      <TableRowStyling key={`tablerow-${ElecLogID}`}>
        <TableCell id={`edit-cell-${ElecLogID}`}>{ElecLogID}</TableCell>
        {/* <Box component="form" noValidate={false}> */}
        <TableCellStyling>
          <TextField
            key={`electricity-input-${ElecLogID}`}
            error={error.length > 0 ? true : false}
            name={`electricity-input-${ElecLogID}`}
            id={`electricity-input-${ElecLogID}`}
            label="Total"
            variant="outlined"
            value={elec}
            onChange={(event) => setElec(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </LocalizationProvider>
          <TableRowActions
            handleClick={handleSave}
            handleCancel={handleCancel}
          />
        </TableCellStyling>
        {/* </Box> */}
      </TableRowStyling>
    </Grow>
  );
}

const TableRowStyling = styled(TableRow)`
  height: calc(${({ theme }) => theme.spacing(11)} + 1px);
  /* position: relative; */
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    height: calc(${({ theme }) => theme.spacing(11)} + 1px);
    /* position: initial; */
  }
`;
const TableCellStyling = styled(TableCell)`
  display: flex;
  /* position: absolute; */
  padding-left: 0;
  padding-right: 16px;
  /* right: 0; */
  width: ${({ theme }) => {
    const colomnWidthAdjust = Number(theme.spacing(4).replace("px", "")) + 77;
    return `calc(100% - ${colomnWidthAdjust}px)`;
  }};
  & div:nth-of-type(2) {
    margin-left: auto;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    /* width: unset; */
    /* right: unset; */
    width: max-content;
    & div:nth-of-type(2) {
      margin-left: ${({ theme }) => theme.spacing(0.5)};
      margin-right: ${({ theme }) => theme.spacing(0.5)};
    }
  }
`;
