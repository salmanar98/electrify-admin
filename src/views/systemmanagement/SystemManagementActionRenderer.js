import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router';
import ConfirmationDialoge from 'src/shared/ConfirmationDialoge';
import { deleteSystem } from 'src/ApiCalls/SystemMangementApiCalls';

const SystemManagementActionRenderer = ({ api, data }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/system-managment/edit-system/${data?.id}`, { state: data });
  };

  const handleViewStats = async () => {
    navigate(`/system-managment/${data?.id}`);
  };

  const handleConfirmation = async () => {
    const resp = await deleteSystem(data.id);
    if (resp) {
      api.applyTransaction({ remove: [data] });
      setIsOpen(false);
    }
  };

  return (
    <>
      <Tooltip title="View">
        <IconButton onClick={handleViewStats}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit">
        <IconButton onClick={handleEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton onClick={() => setIsOpen(true)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {isOpen ? (
        <ConfirmationDialoge
          dialogText={`Are you sure you want to delete ${data?.serialNumber} ?`}
          closeDialog={() => setIsOpen(false)}
          handleConfirmation={handleConfirmation}
        />
      ) : null}
    </>
  );
};

export default SystemManagementActionRenderer;
