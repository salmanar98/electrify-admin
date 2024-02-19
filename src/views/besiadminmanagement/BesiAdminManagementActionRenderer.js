import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router';
import ConfirmationDialoge from 'src/shared/ConfirmationDialoge';
import { deleteUser } from 'src/ApiCalls/AdminApiCalls';

const BesiAdminManagementActionRenderer = ({ api,data }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/admin-management/edit-admin/${data?.id}`, { state: data });
  };
  const handleConfirmation = async () => {
    const resp = await deleteUser(data.id);
    if (resp) {
      api.applyTransaction({ remove: [data] });
      setIsOpen(false);
    }
  };

  return (
    <>
      <Tooltip title="Edit">
        <IconButton color="default" onClick={handleEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <IconButton onClick={() => setIsOpen(true)} aria-label="delete" size="small">
      <Tooltip title="Delete">
          <DeleteIcon />
          </Tooltip>
        </IconButton>
        {isOpen ? (
          <ConfirmationDialoge
            dialogText={`Are you sure you want to delete ${data?.first_name} ?`}
            closeDialog={() => setIsOpen(false)}
            handleConfirmation={handleConfirmation}
          />
        ) : null}
    </>
  );
};

export default BesiAdminManagementActionRenderer;
