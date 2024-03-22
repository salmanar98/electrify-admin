import { memo, useState } from 'react';
import { Tooltip, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import ConfirmationDialoge from 'src/shared/ConfirmationDialoge';
import { useNavigate } from 'react-router';
import { deletePartner } from 'src/ApiCalls/AuthorizedServicePartnerApiCalls';

const AuthorizedServicePartnerActionRenderer = ({ api, data }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/service-partner/edit-partner/${data?.id}`, { state: data });
  };

  const handleDelete = () => {
    setIsOpen(true);
  };

  const handleConfirmation = async () => {
    const resp = await deletePartner(data.id);
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

      <Tooltip title="Delete">
        <IconButton color="default" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {isOpen && (
        <ConfirmationDialoge
          dialogText={`Are you sure you want to delete ${data?.company_name} ?`}
          closeDialog={() => setIsOpen(false)}
          handleConfirmation={handleConfirmation}
        />
      )}
    </>
  );
};

export default memo(AuthorizedServicePartnerActionRenderer);
