import { useState, ChangeEvent, KeyboardEvent } from "react";
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

import { styled } from "@mui/material/styles";

// const initialDate = new Date("1992-04-17");
const initialDate = new Date();

export default function EditElecRow({
  ElecLogID,
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
  const [elec, setElec] = useState(electricity);
  const [date, setDate] = useState<Moment>(moment(measuredAt));
  const [error, setError] = useState("");
  const tokenContext = useTokenContext();

  const [test, setTest] = useState("");

  const keydown = (event: KeyboardEvent<HTMLDivElement>) => {
    setTest(event?.key);
    // ["e", "E", "+", "-"].includes(event?.key) && event.preventDefault();
    const regex = /[A-Z]|[a-z]/g;
    const found = event?.key.match(regex);
    if (found && found.length === 1) {
      console.log(found);
      event.preventDefault();
    }
  };

  const handleSave = () => {
    if (elec > 0) {
      setError("");
      const payload = { electricity: elec, measuredAt: date.toISOString() };
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

  //   console.log("elec", elec);
  return (
    <Grow in>
      <TableRowStyling key={`tablerow-${ElecLogID}`}>
        <TableCell id={`edit-cell-${ElecLogID}`}>
          {ElecLogID}
          <span>{test}</span>
        </TableCell>
        <TableCellStyling>
          <TextField
            error={error.length > 0 ? true : false}
            id="outlined-basic"
            label="Total"
            variant="outlined"
            type="text"
            onKeyDown={(event) => keydown(event)}
            inputProps={{ inputMode: "numeric", pattern: "//d*" }}
            // inputProps={{ inputMode: "numeric" }}
            value={elec}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setElec(Number(event.target.value));
            }}
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
      </TableRowStyling>
    </Grow>
  );
}

const TableRowStyling = styled(TableRow)`
  height: calc(${({ theme }) => theme.spacing(11)} + 1px);
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    height: calc(${({ theme }) => theme.spacing(11)} + 1px);
    position: initial;
  }
`;
const TableCellStyling = styled(TableCell)`
  display: flex;
  position: absolute;
  padding-left: 0;
  padding-right: 16px;
  right: 0;
  width: ${({ theme }) => {
    const colomnWidthAdjust = Number(theme.spacing(4).replace("px", "")) + 77;
    return `calc(100% - ${colomnWidthAdjust}px)`;
  }};
  & div:nth-of-type(2) {
    margin-left: auto;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: unset;
    right: unset;
    & div:nth-of-type(2) {
      margin-left: ${({ theme }) => theme.spacing(0.5)};
      margin-right: ${({ theme }) => theme.spacing(0.5)};
    }
  }
`;
