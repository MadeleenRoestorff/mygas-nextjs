import { useState, Dispatch, SetStateAction } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
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

  // const errs = false;
  // const [utilsInput, setUtilsInput] = useState<UtilsInputInterface>({
  //   electricity: { value: electricity.toString(), errs },
  //   units: { value: units.toString(), errs },
  //   topup: { value: topup.toString(), errs }
  // });

  // const utilTypeArray = urlPath.includes("gas")
  //   ? ["units", "topup"]
  //   : ["electricity"];

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
          {/* <InvisibleSpan>
            {utilsInput.electricity.value}
            {utilsInput.units.value}
            {utilsInput.topup.value}
          </InvisibleSpan> */}
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
          <StackStyling spacing={2} direction={{ xs: "column", md: "row" }}>
            {/* {utilTypeArray.map((util: keyof UtilsInputInterface) => {
              return (
                <TextField
                  key={`${util}-input-${logID}`}
                  className={`TextFieldlogID-${util}`}
                  error={utilsInput[util].errs}
                  id={`${util}-input-${logID}`}
                  label={`${util}`}
                  variant="outlined"
                  value={utilsInput[util].value}
                  onChange={(event) => {
                    const newUtils = { ...utilsInput };
                    newUtils[util].value = event.target.value;
                    newUtils[util].errs = false;
                    setUtilsInput(newUtils);
                  }}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              );
            })} */}

            {Object.entries(utilsInputx).map(
              ([utilLabelx, utilInputx]: [
                keyof UtilsInputInterface,
                UtilsInterface
                // eslint-disable-next-line array-bracket-newline
              ]) => {
                console.log(`DEBUG ${utilInputx.value}`);
                return (
                  <TextField
                    key={`${utilLabelx}-input-${logID}`}
                    className={`TextFieldlogID-${utilLabelx}`}
                    error={utilInputx.errs}
                    id={`${utilLabelx}-input-${logID}`}
                    label={`${utilLabelx}`}
                    variant="outlined"
                    value={utilInputx.value}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(event) => {
                      const newUtils = { ...utilsInputx };
                      newUtils[utilLabelx].value = event.target.value;
                      newUtils[utilLabelx].errs = false;
                      setUtilsInputx(newUtils);
                    }}
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

const StackStyling = styled(Stack)`
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: 68%;
  }
`;
// Invisible span to fix mobile issues with inputs that are absolute
// const InvisibleSpan = styled("span")`
//   visibility: hidden;
//   display: block;
//   height: 0;
//   width: 0;
// `;
