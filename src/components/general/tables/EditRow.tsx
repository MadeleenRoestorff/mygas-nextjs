import { useState, SetStateAction, Dispatch } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import moment, { Moment } from "moment";

import apiRequest from "../../services/apiRequest";
import { useTokenContext } from "../../services/TokenContext";
import TableRowActions from "./TableRowActions";

const initialDate = new Date();

export default function EditRow({
  urlPath,
  logID = 0,
  // electricity = 0,
  utilsInputx,
  setUtilsInputx,
  // units = 0,
  // topup = 0,
  measuredAt = initialDate,
  triggerDataRefresh,
  handleCancel
}: {
  urlPath: string;
  logID?: number;
  // electricity?: number;
  utilsInputx?: UtilsInputInterface;
  setUtilsInputx?: Dispatch<SetStateAction<UtilsInputInterface>>;
  // units?: number;
  // topup?: number;
  measuredAt?: Date;
  triggerDataRefresh?: () => Promise<void>;
  handleCancel: () => void;
}) {
  const [date, setDate] = useState<Moment>(moment(measuredAt));
  const [error, setError] = useState("");
  const tokenContext = useTokenContext();
  console.log("DEBUG measuredAt ", measuredAt);

  const handleSave = () => {
    let utilValid = 0;
    const payload = {
      measuredAt: date.toISOString()
    };
    Object.entries(utilsInputx).forEach(
      ([utilLabel, utilInput]: [keyof UtilsInputInterface, UtilsInterface]) => {
        // if (utilTypeArray.includes(utilLabel)) {
        const utilValue = Number(utilInput.value);
        if (utilValue >= 0) {
          payload[utilLabel] = utilValue;
          utilValid += utilValue;
        }

        if (isNaN(utilValue) || utilValue === 0) {
          utilValid = isNaN(utilValue) ? 0 : utilValid;
          const newutilsInput = { ...utilsInputx };
          newutilsInput[utilLabel].errs = true;
          setUtilsInputx(newutilsInput);
        }
        // }
      }
    );

    if (utilValid > 0) {
      setError("");
      const method = logID ? "patch" : "post";
      const urlPathName = `${urlPath}${logID ? `/${logID}` : ""}`;
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
      <TableRowStyling
        heightadjust={9 * Object.entries(utilsInputx).length}
        key={`tablerow-${logID}`}
      >
        <TableCell id={`edit-cell-${logID}`}>
          {logID}
          <InvisibleDiv>{JSON.stringify(utilsInputx)}</InvisibleDiv>
          <Snackbar
            open={error.length > 0 ? true : false}
            // autoHideDuration={6000}
            onClose={() => setError("")}
          >
            <Alert
              elevation={6}
              variant="filled"
              severity={error.includes("Success") ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </TableCell>
        <TableCellStyling>
          <StackStyling>
            {Object.entries(utilsInputx).map(
              ([label, state]: [keyof UtilsInputInterface, UtilsInterface]) => {
                return (
                  <TextField
                    key={label}
                    error={state.errs}
                    id={label}
                    name={label}
                    label={label}
                    type="text"
                    value={state.value}
                    onChange={(event) => {
                      console.log("onChange");
                      const newUtils = { ...utilsInputx };
                      newUtils[label].value = event.target.value;
                      newUtils[label].errs = false;
                      setUtilsInputx(newUtils);
                    }}
                    onFocus={() => {
                      const newUtils = { ...utilsInputx };
                      newUtils[label].focus = true;
                      setUtilsInputx(newUtils);
                    }}
                    onBlur={() => {
                      const newUtils = { ...utilsInputx };
                      newUtils[label].focus = false;
                      newUtils[label].value ||= "0";
                      setUtilsInputx(newUtils);
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                );
              }
            )}
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDateTimePicker
                className="MobileDateTimePickerDate"
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </LocalizationProvider>
          </StackStyling>

          <TableRowActions
            handleClick={handleSave}
            handleCancel={handleCancel}
          />
        </TableCellStyling>
      </TableRowStyling>
    </Grow>
  );
}
interface TableCellStylingProps {
  heightadjust?: number;
}
const TableRowStyling = styled(TableRow)<TableCellStylingProps>`
  height: calc(${({ theme }) => theme.spacing(11)} + 1px);
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    position: initial;
    height: calc(
      ${({ theme, heightadjust }) => theme.spacing(11 + heightadjust)} + 1px
    );
  }
`;
const TableCellStyling = styled(TableCell)`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 82px);
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: calc(100% - 57px);
  }
`;

const StackStyling = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  & > :not(:first-of-type) {
    margin: 0;
    margin-left: 10px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: 68%;
    flex-direction: column;
    & > :not(:first-of-type) {
      margin: 0;
      margin-top: 16px;
    }
  }
`;

// Invisible div to fix mobile issues with inputs that are absolute
const InvisibleDiv = styled("div")`
  visibility: hidden;
  height: 0px;
  width: 0px;
`;
