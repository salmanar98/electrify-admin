import { useRef } from 'react';
import { uploadListForServicePartner } from '../../ApiCalls/importApiCall';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { AgGridReact } from 'ag-grid-react';
import StatusRenderer from '../../shared/StatusRenderer';
import { ActionButtons } from 'src/shared/ImportActions';
import SendIcon from '@mui/icons-material/Send';
import { errorToast, successToast } from 'src/shared/Toast';

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  filter: true,
  resizable: true,
  cellStyle: {
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
const frameworkComponents = {
  ActionButtons,

  StatusRenderer,
};

const ImportPartnerTable = ({ rows, setRowData, columnDefs }) => {
  const agGridRef = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const rowData = [];
    const gridApi = agGridRef.current.api;

    gridApi.forEachNode((node) => {
      const nodeData = { ...node.data };
      if (columnDefs.find((def) => def.field === 'status')) {
        nodeData.is_active = nodeData.status?.toLowerCase() === true;
        delete nodeData['status'];
      }

      rowData.push(nodeData);
    });
    if (rowData.length) {
      const response = await uploadListForServicePartner(rowData);
      if (response.status) {
        setRowData(null);
        successToast(response.message);
      } else {
        errorToast(response.message);
      }
    }
  };
  const handelReset = (e) => {
    e.preventDefault();
    setRowData(null);
  };
  return (
    <div style={{ margin: '10px 0' }}>
      <StyledGrid>
        <div className="ag-theme-alpine">
          <AgGridReact
            ref={agGridRef}
            rowData={rows}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            components={frameworkComponents}
            suppressScrollOnNewData={true}
          />
        </div>
      </StyledGrid>
      <Box
        component="form"
        onSubmit={handelSubmit}
        onReset={handelReset}
        sx={{ mt: 2 }}
        display="flex"
        justifyContent="end"
      >
        <Button variant="outlined" color="primary" type="reset" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          // loading={loading}
          loadingPosition="start"
          type="submit"
          //disabled={loading}
        >
          Upload
        </LoadingButton>
      </Box>
    </div>
  );
};

export default ImportPartnerTable;

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .ag-root-wrapper': {
    height: '50vh',
    [theme.breakpoints.up('xl')]: {
      height: '40vh',
    },
    [theme.breakpoints.down('md')]: {
      height: '30vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '40vh',
    },
  },
}));
