import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "../../../icons/EditIcon";
import CancelIcon from "../../../icons/CancelIcon";
import SaveIcon from "../../../icons/SaveIcon";

export default function TableRowActions({
  handleClick,
  handleCancel
}: {
  handleClick: () => void;
  handleCancel?: () => void;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      //   sx={{ marginLeft: "auto" }}
    >
      <IconButton
        aria-label={typeof handleCancel === "undefined" ? "edit" : "save"}
        onClick={handleClick}
      >
        {typeof handleCancel === "undefined" ? <EditIcon /> : <SaveIcon />}
      </IconButton>
      {typeof handleCancel === "undefined" ? null : (
        <IconButton aria-label="cancel" onClick={handleCancel}>
          <CancelIcon />
        </IconButton>
      )}
    </Stack>
  );
}
