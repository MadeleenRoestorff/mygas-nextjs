/* eslint-disable react/jsx-max-depth */
import { useState, Dispatch, SetStateAction, useRef } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
import Grow from "@mui/material/Grow";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
// import moment, { Moment } from "moment";

import apiRequest from "../../services/apiRequest";
import { useTokenContext } from "../../services/TokenContext";
import TableRowActions from "./TableRowActions";
// import InputAdornment from "@mui/material/InputAdornment";

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
  // const [date, setDate] = useState<Moment>(moment(measuredAt));
  const [error, setError] = useState("");
  // const [currentInput, setCurrentInput] = useState<CurrentInputInterface>({
  //   index: 0,
  //   label: "electricity"
  // });
  const tokenContext = useTokenContext();

  const inputRef = useRef<HTMLDivElement[]>([]);
  console.log("DEBUG utilsInputx", utilsInputx);
  // console.log("DEBUG currentInput", currentInput);
  console.log("DEBUG measuredAt", measuredAt);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent | TouchEvent) => {
  //     if (
  //       inputRef?.current &&
  //       currentInput.index > 0 &&
  //       inputRef?.current[currentInput.index - 1] &&
  //       !inputRef?.current[currentInput.index - 1]?.contains(
  //         // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  //         event.target as Node
  //       )
  //     ) {
  //       console.log("DEBUG currentInput handleClickOutside", currentInput);
  //       const newUtils = { ...utilsInputx };
  //       newUtils[currentInput.label].focus = false;
  //       setUtilsInputx(newUtils);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   document.addEventListener("touchstart", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("touchstart", handleClickOutside);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentInput, inputRef]);

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
      // measuredAt: date.toISOString()
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
          <StackStyling>
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
              (
                [label, state]: [keyof UtilsInputInterface, UtilsInterface],
                index
              ) => {
                return (
                  <>
                    <div>{JSON.stringify(utilsInputx)}</div>
                    <TextField
                      ref={(ref) => (inputRef.current[index] = ref)}
                      key={label}
                      error={state.errs}
                      id={label}
                      name={label}
                      label={label}
                      type="text"
                      value={state?.focus ? "t" : "f"}
                      // value={state.value}
                      // focused={state.focus}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       {JSON.stringify(state)}
                      //     </InputAdornment>
                      //   )
                      // }}
                      onChange={(event) => {
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
                        setUtilsInputx(newUtils);
                      }}
                      // onClick={() => {
                      //   const newUtils = { ...utilsInputx };
                      //   Object.keys(newUtils).forEach(
                      //     (utilLabelKeys: keyof UtilsInputInterface) => {
                      //       newUtils[utilLabelKeys].focus =
                      //         utilLabelKeys === label ? true : false;
                      //     }
                      //   );
                      //   setUtilsInputx(newUtils);
                      //   setCurrentInput({ index: index + 1, label });
                      // }}
                      // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                    <div>{JSON.stringify(utilsInputx)}</div>
                  </>
                );
              }
            )}

            {/* <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDateTimePicker
                className="MobileDateTimePickerDate"
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </LocalizationProvider> */}
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
// Invisible span to fix mobile issues with inputs that are absolute
// const InvisibleSpan = styled("span")`
//   visibility: hidden;
//   display: block;
//   height: 0;
//   width: 0;
// `;
