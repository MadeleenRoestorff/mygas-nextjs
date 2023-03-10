import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import apiRequest from "../../services/apiRequest";
import { useTokenContext } from "../../services/TokenContext";

const initialDate = new Date("1992-04-17");

export default function EditElecRow({
  ElecLogID,
  electricity = 0,
  measuredAt = initialDate,
  edit,
  triggerDataRefresh
}: {
  ElecLogID?: number;
  electricity?: number;
  measuredAt?: Date;
  edit?: Dispatch<SetStateAction<Partial<number>>>;
  triggerDataRefresh?: () => Promise<void>;
}) {
  const [elec, setElec] = useState(electricity);
  const [error, setError] = useState("");
  const tokenContext = useTokenContext();

  const handleSave = () => {
    if (elec > 0) {
      setError("");
      const payload = { electricity: elec };
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
        edit(0);
      });
    } else {
      setError("Cannot save");
    }
  };

  return (
    <TableRow hover key={`tablerow-${ElecLogID}`}>
      <TableCell id={`edit-cell-${ElecLogID}`}>{ElecLogID}</TableCell>
      <TableCell align="right">
        <TextField
          error={error.length > 0 ? true : false}
          id="outlined-basic"
          label="Total"
          variant="outlined"
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={elec}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setElec(Number(event.target.value));
          }}
        />
      </TableCell>
      <TableCell align="right" />
      <TableCell align="right">{measuredAt.toDateString()}</TableCell>
      <TableCell align="right" onClick={handleSave}>
        save
      </TableCell>
    </TableRow>
  );
}
