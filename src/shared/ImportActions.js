import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

export const ActionButtons = (params) => {
  return (
    <Box sx={{ display: "inline" }}>
      <Tooltip title="delete">
        <IconButton
          onClick={() => params.api.applyTransaction({ remove: [params.data] })}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
